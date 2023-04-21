import "./ItemModal.css";
import closeButtonIcon from "../../images/closeButtonIcon.svg";

function ItemModal({
  cardData,
  cardData: { name, imageUrl, weather },
  handleButtonClose,
  handleOverlayClose,
  openConfirmationModal,
}) {
  return (
    <div className="modal" onClick={handleOverlayClose}>
      <article className="card modal__container">
        <img className="card__image" src={imageUrl} alt={name} />
        <div className="card__info">
          <p className="card__title">{name}</p>
          <p className="card__detail">Weather: {weather}</p>
          <button
            className="card__delete-button"
            onClick={() => openConfirmationModal(cardData)}
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
