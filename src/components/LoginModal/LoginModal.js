import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function LoginModal({
  onLogin,
  handleButtonClose,
  handleOverlayClose,
  isLoading,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <ModalWithForm
      title="Log in"
      named="login"
      buttonText={isLoading ? "Logging in..." : "Log in"}
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
        Email
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
        Password
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
    </ModalWithForm>
  );
}

export default LoginModal;
