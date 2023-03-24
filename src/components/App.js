import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { defaultClothingItems } from "../utils/constants";
import weatherApi from "../utils/weatherApi";
import { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({});

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [activeModal, setActiveModal] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(card) {
    setActiveModal(true);
    setSelectedCard(card);
  }

  function closeModals() {
    setActiveModal(false);
  }

  useEffect(() => {
    weatherApi()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(`Weather API Error: ${err}`));
  }, []);

  return (
    <div className="app">
      <Header city={weatherData.city} />
      <Main
        clothingItems={clothingItems}
        weatherData={weatherData}
        handleCardClick={handleCardClick}
      />
      {/* <Footer />
      <ModalWithForm /> */}
      {activeModal && (
        <ItemModal cardData={selectedCard} closeModals={closeModals} />
      )}
    </div>
  );
}

export default App;
