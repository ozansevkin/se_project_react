import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useRef } from "react";

function AddItemModal({ onAddItem, handleButtonClose, handleOverlayClose }) {
  const [name, setName] = useState("");
  const [imageUrl, setImage] = useState("");
  const [weather, setWeather] = useState("");
  const [nameValidity, setNameValidity] = useState(false);
  const [imageUrlValidity, setImageUrlValidity] = useState(false);
  const [weatherValidity, setWeatherValidity] = useState(false);
  const [formValidity, setformValidity] = useState(false);
  const nameValidationMessage = useRef("");
  const imageUrlValidationMessage = useRef("");

  function handleNameChange(e) {
    setName(e.target.value);
    setNameValidity(e.target.validity.valid);
    setformValidity(
      e.target.validity.valid && imageUrlValidity && weatherValidity
    );
    nameValidationMessage.current = e.target.validationMessage;
  }

  function handleImageUrlChange(e) {
    setImage(e.target.value);
    setImageUrlValidity(e.target.validity.valid);
    setformValidity(e.target.validity.valid && nameValidity && weatherValidity);
    imageUrlValidationMessage.current = e.target.validationMessage;
  }

  function handleWeatherChange(e) {
    setWeather(e.target.value);
    setWeatherValidity(e.target.validity.valid);
    setformValidity(
      e.target.validity.valid && nameValidity && imageUrlValidity
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddItem({
      id: Math.floor(Math.random() * (100 - 17) + 17),
      name,
      weather,
      imageUrl,
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
      formValidity={formValidity}
    >
      <label
        className={`form__text-input-label ${
          nameValidationMessage.current && "form__text-input-label--error"
        }`}
      >
        Name
        {nameValidationMessage.current && ` (${nameValidationMessage.current})`}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={`form__text-input ${
            nameValidationMessage.current && "form__text-input--error"
          }`}
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label
        className={`form__text-input-label ${
          imageUrlValidationMessage.current && "form__text-input-label--error"
        }`}
      >
        Image
        {imageUrlValidationMessage.current &&
          ` (${imageUrlValidationMessage.current})`}
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          className={`form__text-input ${
            imageUrlValidationMessage.current && "form__text-input--error"
          }`}
          required
          value={imageUrl}
          onChange={handleImageUrlChange}
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
