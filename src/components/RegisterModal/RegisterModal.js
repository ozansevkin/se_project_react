import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function RegisterModal({
  onRegister,
  handleButtonClose,
  handleOverlayClose,
  isLoading,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar,
    });
  }

  return (
    <ModalWithForm
      title="Sign up"
      named="register"
      buttonText={isLoading ? "Signing up..." : "Next"}
      handleButtonClose={handleButtonClose}
      handleOverlayClose={handleOverlayClose}
      handleSubmit={handleSubmit}
      formValidity={isValid}
    >
      <label
        className={`form__text-input-label ${
          errors.email && "form__text-input-label--error"
        }`}
      >
        Email*
        {errors.email && ` (${errors.email})`}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`form__text-input ${
            errors.email && "form__text-input--error"
          }`}
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label
        className={`form__text-input-label ${
          errors.password && "form__text-input-label--error"
        }`}
      >
        Password*
        {errors.password && ` (${errors.password})`}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={`form__text-input ${
            errors.password && "form__text-input--error"
          }`}
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
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

export default RegisterModal;
