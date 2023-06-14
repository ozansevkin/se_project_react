import Modal from "../Modal/Modal";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  onClose,
  handleItemDelete,
  isLoading,
  activeModal,
}) {
  return (
    <Modal name={activeModal} onClose={onClose}>
        <h2 className="confirmation__heading">
          Are you sure you want to delete this item?
        </h2>
        <p className="confirmation__warning">This action is irreversible.</p>
        <button
          className="page__text-button confirmation__text-button--type_confirm"
          onClick={handleItemDelete}
        >
          {isLoading ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          className="page__text-button confirmation__text-button--type_cancel"
          onClick={onClose}
        >
          Cancel
        </button>
    </Modal>
  );
}

export default DeleteConfirmationModal;
