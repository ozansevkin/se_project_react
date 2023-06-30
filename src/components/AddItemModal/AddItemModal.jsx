import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function AddItemModal({ onAddItem, onClose, isLoading, activeModal }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    name: "",
    weather: "",
    imageUrl: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    onAddItem({
      name: values.name,
      weather: values.weather,
      imageUrl: values.imageUrl,
    });
  }

  return (
    <ModalWithForm
      title="New garment"
      named={activeModal}
      buttonText={isLoading ? "Saving..." : "Add garment"}
      onClose={onClose}
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
          minLength={2}
          maxLength={30}
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
