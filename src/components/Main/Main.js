import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";

function Main({ clothingItems, weatherData, handleCardClick }) {
  const listItems = clothingItems
    .filter((item) => item.weather === weatherData.weather)
    .map((item) => (
      <li key={item._id} className="main__list-item">
        <ItemCard cardData={item} handleCardClick={handleCardClick} />
      </li>
    ));

  return (
    <main className="main">
      <WeatherCard temp={weatherData.temp} />
      <p className="main__parag">
        Today is {weatherData.temp}&deg; C / You may want to wear:
      </p>
      <ul className="main__list">{listItems}</ul>
    </main>
  );
}

export default Main;
