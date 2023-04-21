import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { apiGetItems, apiAddItem, apiDeleteItem } from "../../utils/api";
import weatherApi from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  const [weatherData, setWeatherData] = useState({ temp: {} });

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");

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

  function handleEscClose(e) {
    if (e.key === "Escape") {
      return closeModals();
    }
  }

  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      return closeModals();
    }
  }

  function handleAddItemSubmit(item) {
    apiAddItem(item)
      .then(setClothingItems([item, ...clothingItems]))
      .catch((err) => console.error(`API Error: ${err}`));
  }

  function openConfirmationModal(card) {
    setActiveModal("delete-cloth");
    setSelectedCard(card);
  }

  function handleCardDelete() {
    apiDeleteItem(selectedCard.id)
      .then(
        setClothingItems(
          [...clothingItems].filter((item) => item.id !== selectedCard.id)
        )
      )
      .catch((err) => console.error(`API Error: ${err}`));

    closeModals();
  }

  useEffect(() => {
    weatherApi()
      .then(setWeatherData)
      .catch((err) => console.error(`Weather API Error: ${err}`));

    apiGetItems()
      .then(setClothingItems)
      .catch((err) => console.error(`API Error: ${err}`));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          city={weatherData.city}
          setActiveModal={setActiveModal}
          isMobileMenuOpened={isMobileMenuOpened}
          toggleMobileMenu={toggleMobileMenu}
        />
        <Switch>
          <Route exact path="/profile">
            <Profile
              clothingItems={clothingItems}
              weather={weatherData.weather}
              handleCardClick={handleCardClick}
              setActiveModal={setActiveModal}
            />
          </Route>
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
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
