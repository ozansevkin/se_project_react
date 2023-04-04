import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import randomizeButtonIcon from "../../images/randomizeButtonIcon.svg";

function Main({
  clothingItems,
  weatherData,
  weatherData: { temp, weather },
  handleCardClick,
  isMobileMenuOpened,
}) {
  const listItems = clothingItems
    .filter((item) => item.weather === weather)
    .map((item) => (
      <li key={item._id} className="main__list-item">
        <ItemCard cardData={item} handleCardClick={handleCardClick} />
      </li>
    ));

  return (
    <main className="main">
      {!isMobileMenuOpened && <WeatherCard weatherData={weatherData} />}
      <p className="main__parag">
        Today is {temp}&deg; F / You may want to wear:
      </p>
      <ul className="main__list">{listItems}</ul>
      <button className="main__button">
        <img src={randomizeButtonIcon} alt="Randomize" />
        &nbsp; Randomize
      </button>
    </main>
  );
}

export default Main;
