import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/constants";
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
    setClothingItems([item, ...clothingItems]);
  }

  useEffect(() => {
    weatherApi()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(`Weather API Error: ${err}`));
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
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
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
