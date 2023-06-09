import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({
  clothingItems,
  weatherData,
  weatherData: { temp, weather },
  handleCardClick,
  isMobileMenuOpened,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const listItems =
    clothingItems.length > 0 &&
    clothingItems
      .filter((item) => item.weather === weather)
      .map((item) => (
        <li key={item.id} className="main__list-item">
          <ItemCard cardData={item} handleCardClick={handleCardClick} />
        </li>
      ));

  return (
    <main className="main">
      {!isMobileMenuOpened && <WeatherCard weatherData={weatherData} />}
      <p className="main__parag">
        Today is {temp[currentTemperatureUnit]} / You may want to wear:
      </p>
      <ul className="main__list">{listItems}</ul>
    </main>
  );
}

export default Main;
