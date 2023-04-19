import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function AddItemModal({ onAddItem, handleButtonClose, handleOverlayClose }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [weather, setWeather] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleWeatherChange(e) {
    setWeather(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddItem({
      _id: Math.floor(Math.random() * (100 - 6) + 6),
      name,
      weather,
      link: image,
    });

    handleButtonClose();
  }

  return (
    <ModalWithForm
      title="New garment"
      named="add-cloth"
      buttonText="Add garment"
      handleButtonClose={handleButtonClose}
      handleOverlayClose={handleOverlayClose}
      handleSubmit={handleSubmit}
    >
      <label className="form__text-input-label">
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form__text-input"
          required
          value={name}
          onChange={handleNameChange}
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
          value={image}
          onChange={handleImageChange}
        />
      </label>

      <fieldset className="form__radio-fieldset">
        <legend className="form__radio-legend">Select the weather type:</legend>
        <label className="form__radio-input-label">
          <input
            type="radio"
            name="weather"
            value="hot"
            className="form__radio-input"
            required
            checked={weather === "hot"}
            onChange={handleWeatherChange}
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
            checked={weather === "warm"}
            onChange={handleWeatherChange}
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
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          <span className="form__radio-input-design"></span>
          <span className="form__radio-input-design-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
