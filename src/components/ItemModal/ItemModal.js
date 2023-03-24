import "./ItemModal.css";

function ItemModal({ cardData, closeModals }) {
  return (
    <div
      className="item-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          return closeModals();
        }
      }}
    >
      <article className="card">
        <img className="card__image" src={cardData.link} alt={cardData.name} />
        <div className="card__info">
          <p className="card__title">{cardData.name}</p>
          <p className="card__detail">Weather: {cardData.weather}</p>
        </div>
        <button
          className="card__close-button"
          type="button"
          onClick={closeModals}
        ></button>
      </article>
    </div>
  );
}

export default ItemModal;
