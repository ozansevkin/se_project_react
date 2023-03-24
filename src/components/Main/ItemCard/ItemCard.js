import "./ItemCard.css";

function ItemCard({ cardData, handleCardClick }) {
  return (
    <article onClick={() => handleCardClick(cardData)} className="item-card">
      <img
        className="item-card__image"
        src={cardData.link}
        alt={cardData.name}
      />
      <p className="item-card__title">{cardData.name}</p>
    </article>
  );
}

export default ItemCard;
