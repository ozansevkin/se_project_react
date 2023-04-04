import "./ModalWithForm.css";
import closeButtonIcon from "../../images/closeButtonIcon.svg";

function ModalWithForm({ title, name: named, buttonText, onClose, children }) {
  return (
    <div
      className={`modal modal_type_${named}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          return onClose();
        }
      }}
    >
      <div className="modal__container">
        <form action="#" method="#" name={named} className="form modal__form">
          <h2 className="form__title">{title}</h2>

          {children}

          <button type="submit" className="form__submit-button">
            {buttonText}
          </button>
        </form>
        <button type="button" onClick={onClose} className="modal__close-button">
          <img src={closeButtonIcon} alt="Close Button" />
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
