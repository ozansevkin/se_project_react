import "./ClothesSection.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  weather,
  handleCardClick,
  setActiveModal,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const listItems =
    clothingItems.length > 0 &&
    clothingItems
      .filter(
        (item) => item.weather === weather && item.owner._id === currentUser._id
      )
      .map((item) => (
        <li key={item._id} className="main__list-item">
          <ItemCard
            itemData={item}
            handleCardClick={handleCardClick}
            onCardLike={onCardLike}
            isLoggedIn={true}
          />
        </li>
      ));

  return (
    <section className="clothes-section">
      <h2 className="clothes-section__heading">Your Items</h2>
      <button
        className="page__text-button clothes-section__text-button"
        onClick={() => setActiveModal("add-cloth")}
      >
        + Add New
      </button>
      <ul className="main__list clothes-section__list">{listItems}</ul>
    </section>
  );
}

export default ClothesSection;
