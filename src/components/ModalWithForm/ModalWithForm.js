import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  title,
  named,
  buttonText,
  isOpen,
  onClose,
  handleSubmit,
  formValidity,
  children,
}) {
  return (
    <Modal isOpen={isOpen} name={named} onClose={onClose}>
      <form name={named} className="form" onSubmit={handleSubmit}>
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
    </Modal>
  );
}

export default ModalWithForm;
