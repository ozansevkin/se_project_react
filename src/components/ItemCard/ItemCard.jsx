import "./ItemCard.css";
import cardLikeIcon from "../../images/cardLikeIcon.svg";
import cardLikeIconActive from "../../images/cardLikeIconActive.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ itemData, handleCardClick, onCardLike, isLoggedIn }) {
  const { _id, name, imageUrl, likes } = itemData;

  const currentUser = useContext(CurrentUserContext);

  const isLiked = likes.some((user) => user._id === currentUser._id);

  const likeButtonClassName = `item-card__like ${
    isLoggedIn && "item-card__like--visible"
  }`;

  function handleLikeClick(event) {
    event.stopPropagation();
    onCardLike(_id, !isLiked);
  }

  return (
    <article onClick={() => handleCardClick(itemData)} className="item-card">
      <img className="item-card__image" src={imageUrl} alt={name} />
      <div className="item-card__info">
        <p className="item-card__title">{name}</p>
        <button
          className={likeButtonClassName}
          onClick={handleLikeClick}
          type="button"
        >
          <img
            src={isLiked ? cardLikeIconActive : cardLikeIcon}
            alt={
              isLiked
                ? "A filled heart shape card like icon"
                : "An empty heart shape card like icon"
            }
          />
        </button>
      </div>
    </article>
  );
}

export default ItemCard;
