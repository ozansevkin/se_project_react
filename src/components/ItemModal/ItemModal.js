import { useEffect } from "react";
import "./ItemModal.css";
import closeButtonIcon from "../../images/closeButtonIcon.svg";

function ItemModal({ cardData: { name, link, weather }, onClose }) {
  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      return onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  return (
    <div
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          return onClose();
        }
      }}
    >
      <article className="card modal__container">
        <img className="card__image" src={link} alt={name} />
        <div className="card__info">
          <p className="card__title">{name}</p>
          <p className="card__detail">Weather: {weather}</p>
        </div>
        <button className="modal__close-button" type="button" onClick={onClose}>
          <img src={closeButtonIcon} alt="Close Button" />
        </button>
      </article>
    </div>
  );
}

export default ItemModal;
