import "./ItemModal.css";
import closeButtonIcon from "../../images/closeButtonIcon.svg";

function ItemModal({
  cardData: { name, link, weather },
  handleButtonClose,
  handleOverlayClose,
}) {
  return (
    <div className="modal" onClick={handleOverlayClose}>
      <article className="card modal__container">
        <img className="card__image" src={link} alt={name} />
        <div className="card__info">
          <p className="card__title">{name}</p>
          <p className="card__detail">Weather: {weather}</p>
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
