import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  weather,
  handleCardClick,
  setActiveModal,
}) {
  const listItems = clothingItems
    .filter((item) => item.weather === weather)
    .map((item) => (
      <li key={item.id} className="main__list-item">
        <ItemCard cardData={item} handleCardClick={handleCardClick} />
      </li>
    ));

  return (
    <section className="clothes-section">
      <h2 className="clothes-section__heading">Your Items</h2>
      <button
        className="header__text-button clothes-section__text-button"
        onClick={() => setActiveModal("add-cloth")}
      >
        + Add New
      </button>
      <ul className="main__list clothes-section__list">{listItems}</ul>
    </section>
  );
}

export default ClothesSection;
