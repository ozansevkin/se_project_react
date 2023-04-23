import "./ModalWithForm.css";
import closeButtonIcon from "../../images/closeButtonIcon.svg";

function ModalWithForm({
  title,
  named,
  buttonText,
  handleButtonClose,
  handleOverlayClose,
  handleSubmit,
  formValidity,
  children,
}) {
  return (
    <div className={`modal modal_type_${named}`} onClick={handleOverlayClose}>
      <div className="modal__container">
        <form
          action="#"
          method="#"
          name={named}
          className="form modal__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="form__title">{title}</h2>

          {children}

          <button
            type="submit"
            className="form__submit-button"
            disabled={!formValidity}
          >
            {buttonText}
          </button>
        </form>
        <button
          type="button"
          onClick={handleButtonClose}
          className="modal__close-button"
        >
          <img src={closeButtonIcon} alt="Close Button" />
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
