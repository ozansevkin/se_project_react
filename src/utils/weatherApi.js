import { weatherApiOptions as options } from "./constants";

async function weatherApi() {
  await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${options.lat}&lon=${options.lon}&exclude=${options.part}&appid=${options.key}`
  ).then((res) => res.json());
}

if (temperature >= 86) {
  return "hot";
} else if (temperature >= 66 && temperature <= 85) {
  return "warm";
} else if (temperature <= 65) {
  return "cold";
}
