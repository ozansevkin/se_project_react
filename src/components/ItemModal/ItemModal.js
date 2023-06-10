import "./ItemModal.css";
import { useContext } from "react";
import closeButtonIcon from "../../images/closeButtonIcon.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  itemData,
  itemData: { name, imageUrl, weather, owner },
  handleButtonClose,
  handleOverlayClose,
  openConfirmationModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn && "item__delete-button_visible"
  }`;

  return (
    <div className="modal" onClick={handleOverlayClose}>
      <article className="item modal__container">
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
        <button
          className="modal__close-button"
          type="button"
          onClick={handleButtonClose}
        >
          <img src={closeButtonIcon} alt="Close Button" />
        </button>
      </article>
    </div>
  );
}

export default ItemModal;
