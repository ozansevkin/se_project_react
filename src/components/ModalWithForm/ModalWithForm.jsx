import "./ModalWithForm.css";
import Modal from "../Modal/Modal";
import { useContext } from "react";
import ApiErrorContext from "../../contexts/ApiErrorContext";

function ModalWithForm({
  title,
  named,
  buttonText,
  onClose,
  handleSubmit,
  formValidity,
  children,
}) {
  const apiError = useContext(ApiErrorContext);

  return (
    <Modal name={named} onClose={onClose}>
      <form name={named} className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">{title}</h2>

        {children}

        {apiError && <p className="form__api-error">{apiError}</p>}
        <button
          type="submit"
          className="form__submit-button"
          disabled={!formValidity}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
