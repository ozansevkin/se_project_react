import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Modal from "../Modal/Modal";

function ItemModal({ itemData, onClose, openConfirmationModal, activeModal }) {
  const { name, imageUrl, weather, owner } = itemData;
  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;

  const itemDeleteButtonClassName = `page__text-button item__delete-button${
    isOwn ? " item__delete-button--visible" : ""
  }`;

  return (
    <Modal name={activeModal} onClose={onClose}>
      <article className="item">
        <img className="item__image" src={imageUrl} alt={name} />
        <div className="item__info">
          <p className="item__title">{name}</p>
          <p className="item__detail">Weather: {weather}</p>
          <button
            className={itemDeleteButtonClassName}
            onClick={() => openConfirmationModal(itemData)}
          >
            Delete item
          </button>
        </div>
      </article>
    </Modal>
  );
}

export default ItemModal;
