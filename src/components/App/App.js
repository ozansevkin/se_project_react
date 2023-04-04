import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/constants";
import weatherApi from "../../utils/weatherApi";
import { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({});

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

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

  useEffect(() => {
    weatherApi()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(`Weather API Error: ${err}`));
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <div className="app">
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
          onClose={closeModals}
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
        <ItemModal cardData={selectedCard} onClose={closeModals} />
      )}
    </div>
  );
}

export default App;
