import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import { useState, useRef } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function AddItemModal({
  onAddItem,
  handleButtonClose,
  handleOverlayClose,
  isLoading,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onAddItem({
      id: Math.floor(Math.random() * (100 - 17) + 17),
      name: values.name,
      weather: values.weather,
      imageUrl: values.imageUrl,
    });

    handleButtonClose();
  }

  return (
    <ModalWithForm
      title="New garment"
      named="add-cloth"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      handleButtonClose={handleButtonClose}
      handleOverlayClose={handleOverlayClose}
      handleSubmit={handleSubmit}
      formValidity={isValid}
    >
      <label
        className={`form__text-input-label ${
          errors.name && "form__text-input-label--error"
        }`}
      >
        Name
        {errors.name && ` (${errors.name})`}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={`form__text-input ${
            errors.name && "form__text-input--error"
          }`}
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        className={`form__text-input-label ${
          errors.imageUrl && "form__text-input-label--error"
        }`}
      >
        Image
        {errors.imageUrl && ` (${errors.imageUrl})`}
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          className={`form__text-input ${
            errors.imageUrl && "form__text-input--error"
          }`}
          required
          value={values.imageUrl}
          onChange={handleChange}
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
            checked={values.weather === "hot"}
            onChange={handleChange}
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
            checked={values.weather === "warm"}
            onChange={handleChange}
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
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span className="form__radio-input-design"></span>
          <span className="form__radio-input-design-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
