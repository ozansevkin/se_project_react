import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/constants";
import weatherApi from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({});

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
        <Main
          clothingItems={clothingItems}
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          isMobileMenuOpened={isMobileMenuOpened}
        />
        <Footer />
        {activeModal === "add-clothes" && (
          <ModalWithForm
            title="New garment"
            named="add-clothes"
            buttonText="Add garment"
            handleButtonClose={closeModals}
            handleOverlayClose={handleOverlayClose}
          >
            <label className="form__text-input-label">
              Name
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form__text-input"
                required
              />
            </label>
            <label className="form__text-input-label">
              Image
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                className="form__text-input"
                required
              />
            </label>

            <fieldset className="form__radio-fieldset">
              <legend className="form__radio-legend">
                Select the weather type:
              </legend>
              <label className="form__radio-input-label">
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  className="form__radio-input"
                  required
                />
                <span className="form__radio-input-design"></span>
                <span className="form__radio-input-design-text">Hot</span>
              </label>

              <label className="form__radio-input-label">
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  className="form__radio-input"
                />
                <span className="form__radio-input-design"></span>
                <span className="form__radio-input-design-text">Warm</span>
              </label>

              <label className="form__radio-input-label">
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  className="form__radio-input"
                />
                <span className="form__radio-input-design"></span>
                <span className="form__radio-input-design-text">Cold</span>
              </label>
            </fieldset>
          </ModalWithForm>
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
