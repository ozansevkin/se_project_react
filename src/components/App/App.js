import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import weatherApi from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({ temp: {} });

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");

  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleCardClick(card) {
    setActiveModal("show-cloth");
    setSelectedCard(card);
  }

  function closeModals() {
    setActiveModal("");
    setSelectedCard({});
  }

  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      closeModals();
    }
  }

  function handleAddItemSubmit(item) {
    setIsLoading(true);
    api
      .addItem(item, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems([item, ...clothingItems]);
        closeModals();
      })
      .catch((err) => console.error(`API Error: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function openConfirmationModal(card) {
    setActiveModal("delete-cloth");
    setSelectedCard(card);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteItem(selectedCard.id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems(
          [...clothingItems].filter((item) => item.id !== selectedCard.id)
        );
        closeModals();
      })
      .catch((err) => console.error(`API Error: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleRegisterUserSubmit(user) {
    setIsLoading(true);
    auth
      .register(user)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        closeModals();
      })
      .catch((err) => console.error(`Auth Error: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleLoginUserSubmit(user) {
    setIsLoading(true);
    auth
      .login(user)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        closeModals();
      })
      .catch((err) => console.error(`Auth Error: ${err}`))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    weatherApi()
      .then(setWeatherData)
      .catch((err) => console.error(`Weather API Error: ${err}`));

    api
      .getItems()
      .then(setClothingItems)
      .catch((err) => console.error(`API Error: ${err}`));
  }, []);

  useEffect(() => {
    auth
      .checkToken(localStorage.getItem("jwt"))
      .then((data) => {
        // sign user in
      })
      .catch((err) => console.error(`Auth Error: ${err}`));
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeModals();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <Header
            city={weatherData.city}
            setActiveModal={setActiveModal}
            isMobileMenuOpened={isMobileMenuOpened}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Switch>
            <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn}>
              <Profile
                clothingItems={clothingItems}
                weather={weatherData.weather}
                handleCardClick={handleCardClick}
                setActiveModal={setActiveModal}
              />
            </ProtectedRoute>
            <Route path="/">
              <Main
                clothingItems={clothingItems}
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                isMobileMenuOpened={isMobileMenuOpened}
              />
            </Route>
          </Switch>
          <Footer />
          {activeModal === "add-cloth" && (
            <AddItemModal
              handleButtonClose={closeModals}
              handleOverlayClose={handleOverlayClose}
              onAddItem={handleAddItemSubmit}
              isLoading={isLoading}
            />
          )}
          {activeModal === "show-cloth" && (
            <ItemModal
              cardData={selectedCard}
              handleButtonClose={closeModals}
              handleOverlayClose={handleOverlayClose}
              openConfirmationModal={openConfirmationModal}
            />
          )}
          {activeModal === "delete-cloth" && (
            <DeleteConfirmationModal
              handleButtonClose={closeModals}
              handleOverlayClose={handleOverlayClose}
              handleCardDelete={handleCardDelete}
              isLoading={isLoading}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleButtonClose={closeModals}
              handleOverlayClose={handleOverlayClose}
              onRegisterUser={handleRegisterUserSubmit}
              isLoading={isLoading}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleButtonClose={closeModals}
              handleOverlayClose={handleOverlayClose}
              onLoginUser={handleLoginUserSubmit}
              isLoading={isLoading}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
