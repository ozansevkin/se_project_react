import "./DeleteConfirmationModal.css";
import closeButtonIcon from "../../images/closeButtonIcon.svg";

function DeleteConfirmationModal({
  handleButtonClose,
  handleOverlayClose,
  handleCardDelete,
  isLoading,
}) {
  return (
    <div className="modal" onClick={handleOverlayClose}>
      <div className="modal__container confirmation">
        <h2 className="confirmation__heading">
          Are you sure you want to delete this item?
        </h2>
        <p className="confirmation__warning">This action is irreversible.</p>
        <button
          className="confirmation__text-button confirmation__text-button--type_confirm"
          onClick={handleCardDelete}
        >
          {isLoading ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          className="confirmation__text-button confirmation__text-button--type_cancel"
          onClick={handleButtonClose}
        >
          Cancel
        </button>
        <button
          className="modal__close-button"
          type="button"
          onClick={handleButtonClose}
        >
          <img src={closeButtonIcon} alt="Close Button" />
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
