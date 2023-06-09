import "./ItemCard.css";

function ItemCard({ itemData, itemData: { name, imageUrl }, handleCardClick }) {
  return (
    <article onClick={() => handleCardClick(itemData)} className="item-card">
      <img className="item-card__image" src={imageUrl} alt={name} />
      <p className="item-card__title">{name}</p>
    </article>
  );
}

export default ItemCard;
