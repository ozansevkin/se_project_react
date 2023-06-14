import "./WeatherCard.css";
import * as weatherConditions from "../../images/weatherConditions/index";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import { BACKGROUND_COLOR } from "../../utils/constants";

function getCardBackgroundColor(time, condition) {
  if (time === "night") {
    return BACKGROUND_COLOR.night;
  } else if (["sunny", "cloudy"].includes(condition)) {
    return BACKGROUND_COLOR.dayClear;
  } else {
    return BACKGROUND_COLOR.dayOvercast;
  }
}

function WeatherCard({ weatherData: { time, condition, temp } }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const cardBackgroundColor = getCardBackgroundColor(time, condition);

  return (
    <article
      className="weather-card"
      style={{ background: cardBackgroundColor }}
    >
      <p className="weather-card__info">{temp[currentTemperatureUnit]}</p>
      <img
        src={weatherConditions[`${time}__${condition}`]}
        alt="weather condition"
        className="weather-card__image"
      />
    </article>
  );
}
export default WeatherCard;
