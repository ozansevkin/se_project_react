import "./ItemCard.css";
import cardLikeIcon from "../../images/cardLikeIcon.svg";
import cardLikeIconActive from "../../images/cardLikeIconActive.svg";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({
  itemData,
  itemData: { _id, name, imageUrl, likes },
  handleCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = likes.some((user) => user._id === currentUser._id);

  const likeButtonClassName = `item-card__like${isLoggedIn && "--visible"}`;

  return (
    <article onClick={() => handleCardClick(itemData)} className="item-card">
      <img className="item-card__image" src={imageUrl} alt={name} />
      <div className="item-card__info">
        <p className="item-card__title">{name}</p>
        <button
          className={likeButtonClassName}
          onClick={() => onCardLike(_id, !isLiked)}
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
