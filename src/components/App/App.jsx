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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import weatherApi from "../../utils/weatherApi";
import geolocationApi from "../../utils/geolocationApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ApiErrorContext from "../../contexts/ApiErrorContext";
import { weatherApiDefaultCoords } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({ temp: {} });

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const [selectedItem, setSelectedItem] = useState({});

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");

  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    avatar: "",
    email: "",
  });

  const [apiError, setApiError] = useState("");

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleCardClick(item) {
    setActiveModal("show-cloth");
    setSelectedItem(item);
  }

  function closeModals() {
    setActiveModal("");
    setSelectedItem({});
    setApiError("");
  }

  function handleCardLike(id, isLiked) {
    const token = localStorage.getItem("jwt");

    isLiked
      ? api
          .addItemLike(id, token)
          .then(({ item: updatedItem }) => {
            setClothingItems(
              clothingItems.map((item) =>
                item._id === id ? updatedItem : item
              )
            );
          })
          .catch(console.error)
      : api
          .removeItemLike(id, token)
          .then(({ item: updatedItem }) => {
            setClothingItems(
              clothingItems.map((item) =>
                item._id === id ? updatedItem : item
              )
            );
          })
          .catch(console.error);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeModals)
      .catch((err) => {
        if (err.message) setApiError(err.message);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddItemSubmit(item) {
    handleSubmit(() => {
      return api.addItem(item, localStorage.getItem("jwt")).then(({ item }) => {
        setClothingItems([item, ...clothingItems]);
      });
    });
  }

  function openConfirmationModal(card) {
    setActiveModal("delete-cloth");
    setSelectedItem(card);
  }

  function handleItemDelete() {
    handleSubmit(() => {
      return api
        .deleteItem(selectedItem._id, localStorage.getItem("jwt"))
        .then(() => {
          setClothingItems(
            [...clothingItems].filter((item) => item._id !== selectedItem._id)
          );
        });
    });
  }

  function handleRegisterUserSubmit(user) {
    handleSubmit(() => {
      return auth.register(user).then(({ user }) => {
        handleLogin(user);
      });
    });
  }

  function handleLoginUserSubmit(user) {
    handleSubmit(() => {
      return auth.login(user).then(({ token }) => {
        if (!token) {
          return Promise.reject("JWT is not found.");
        }
        return auth.checkToken(token).then(({ user }) => {
          localStorage.setItem("jwt", token);
          handleLogin(user);
        });
      });
    });
  }

  function handleEditProfileSubmit(user) {
    handleSubmit(() => {
      return auth
        .updateProfile(user, localStorage.getItem("jwt"))
        .then(({ user }) => {
          setCurrentUser(user);
        });
    });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
  }

  function handleLogin(user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  useEffect(() => {
    function callWeatherApiWithCurrentCoords(position) {
      return weatherApi(position.coords)
        .then(setWeatherData)
        .catch(console.error);
    }

    function callWeatherApiWithDefaultCoords(err) {
      console.error(err);
      return weatherApi(weatherApiDefaultCoords)
        .then(setWeatherData)
        .catch(console.error);
    }

    geolocationApi(
      // if success
      callWeatherApiWithCurrentCoords,
      // if error
      callWeatherApiWithDefaultCoords
    );
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then(({ items }) => setClothingItems(items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .checkToken(token)
      .then(({ user }) => {
        handleLogin(user);
      })
      .catch(console.error);
  }, []);

  const modalComponents = {
    "show-cloth": (
      <ItemModal
        itemData={selectedItem}
        onClose={closeModals}
        openConfirmationModal={openConfirmationModal}
        activeModal={activeModal}
      />
    ),
    "delete-cloth": (
      <DeleteConfirmationModal
        handleItemDelete={handleItemDelete}
        onClose={closeModals}
        isLoading={isLoading}
        activeModal={activeModal}
      />
    ),
    "add-cloth": (
      <AddItemModal
        onAddItem={handleAddItemSubmit}
        onClose={closeModals}
        isLoading={isLoading}
        activeModal={activeModal}
      />
    ),
    register: (
      <RegisterModal
        onRegisterUser={handleRegisterUserSubmit}
        onClose={closeModals}
        isLoading={isLoading}
        activeModal={activeModal}
      />
    ),
    login: (
      <LoginModal
        onLoginUser={handleLoginUserSubmit}
        onClose={closeModals}
        isLoading={isLoading}
        activeModal={activeModal}
      />
    ),
    "edit-profile": (
      <EditProfileModal
        onEditProfile={handleEditProfileSubmit}
        onClose={closeModals}
        isLoading={isLoading}
        activeModal={activeModal}
      />
    ),
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <ApiErrorContext.Provider value={apiError}>
          <div className="page">
            <Header
              city={weatherData.city}
              setActiveModal={setActiveModal}
              isMobileMenuOpened={isMobileMenuOpened}
              toggleMobileMenu={toggleMobileMenu}
              isLoggedIn={isLoggedIn}
            />
            <Switch>
              <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn}>
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  setActiveModal={setActiveModal}
                  onLogout={handleLogout}
                  onCardLike={handleCardLike}
                />
              </ProtectedRoute>
              <Route path="/">
                <Main
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  isMobileMenuOpened={isMobileMenuOpened}
                  isLoggedIn={isLoggedIn}
                />
              </Route>
            </Switch>
            <Footer />
            {modalComponents[activeModal]}
          </div>
        </ApiErrorContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
