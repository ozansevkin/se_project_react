import "./WeatherCard.css";
import * as weatherConditions from "../../../images/weatherConditions/index";
import { useEffect, useState } from "react";

function getCardBackgroundColor(time, condition) {
  if (time === "night") {
    return "#286897";
  } else if (["sunny", "cloudy"].includes(condition)) {
    return "#00A3FF";
  } else {
    return "#6CA6C7";
  }
}

function WeatherCard({ weatherData: { time, condition, temp } }) {
  const [cardBackgroundColor, setCardBackgroundColor] = useState("");

  useEffect(() => {
    setCardBackgroundColor(getCardBackgroundColor(time, condition));
  }, [time, condition]);

  return (
    <article
      className="weather-card"
      style={{ background: cardBackgroundColor }}
    >
      <p className="weather-card__info">{temp}&deg;F</p>
      <img
        src={weatherConditions[`${time}__${condition}`]}
        alt="weather condition"
        className="weather-card__image"
      />
    </article>
  );
}
export default WeatherCard;
