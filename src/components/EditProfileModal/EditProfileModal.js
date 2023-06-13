import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function EditProfileModal({
  onEditProfile,
  handleButtonClose,
  handleOverlayClose,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });

  function handleSubmit(e) {
    e.preventDefault();

    onEditProfile({
      name: values.name,
      avatar: values.avatar,
    });
  }

  return (
    <ModalWithForm
      title="Change profile data"
      named="edit-profile"
      buttonText={isLoading ? "Saving..." : "Save changes"}
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
        Name*
        {errors.name && ` (${errors.name})`}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={`form__text-input ${
            errors.name && "form__text-input--error"
          }`}
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        className={`form__text-input-label ${
          errors.avatar && "form__text-input-label--error"
        }`}
      >
        Avatar URL
        {errors.avatar && ` (${errors.avatar})`}
        <input
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          className={`form__text-input ${
            errors.avatar && "form__text-input--error"
          }`}
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
