import "./ItemCard.css";

function ItemCard({ cardData, cardData: { name, link }, handleCardClick }) {
  return (
    <article onClick={() => handleCardClick(cardData)} className="item-card">
      <img className="item-card__image" src={link} alt={name} />
      <p className="item-card__title">{name}</p>
    </article>
  );
}

export default ItemCard;
