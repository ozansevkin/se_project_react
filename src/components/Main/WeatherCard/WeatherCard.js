import "./WeatherCard.css";

function WeatherCard({ temp }) {
  return (
    <article className="weather-card">
      <p className="weather-card__temp">{temp}&deg;C</p>
    </article>
  );
}
export default WeatherCard;
