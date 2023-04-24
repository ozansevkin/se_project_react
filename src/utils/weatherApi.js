import { weatherApiOptions as options } from "./constants";
import { processServerResponse } from "./api";

// temp in Fahrenheit
function getTempRange(temp) {
  temp = Math.round(temp);

  if (temp >= 86) {
    return "hot";
  } else if (temp > 65 && temp < 86) {
    return "warm";
  } else if (temp <= 65) {
    return "cold";
  }
}

// temp in Fahrenheit, temUnit only F and C
function getTempWithUnit(temp, tempUnit = "F") {
  if (tempUnit === "C") {
    temp = ((temp - 32) * 5) / 9;
  }
  return `${Math.round(temp)}°${tempUnit}`;
}

function getWeatherCondition(conditionId) {
  const firstDigit = Math.floor(conditionId / 100);

  if (firstDigit === 2) {
    return "storm";
  } else if (firstDigit === 3 || firstDigit === 5) {
    return "rain";
  } else if (firstDigit === 6) {
    return "snow";
  } else if (firstDigit === 7) {
    return "fog";
  } else if (conditionId === 800) {
    return "sunny";
  } else if (firstDigit === 8) {
    return "cloudy";
  }
}

function getTimeOfTheDay(sunrise, sunset) {
  const time = Math.floor(Date.now() / 1000);

  if (time > sunrise && time < sunset) {
    return "day";
  } else {
    return "night";
  }
}

function processData(data) {
  const processedData = { temp: {} };
  processedData.temp.F = getTempWithUnit(data.main.temp);
  processedData.temp.C = getTempWithUnit(data.main.temp, "C");
  processedData.weather = getTempRange(data.main.temp);
  processedData.city = data.name;
  processedData.condition = getWeatherCondition(data.weather[0].id);
  processedData.time = getTimeOfTheDay(data.sys.sunrise, data.sys.sunset);

  return processedData;
}

async function weatherApi() {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${options.lat}&lon=${options.lon}&units=${options.units}&appid=${options.key}`
  )
    .then(processServerResponse)
    .then(processData);
}

export default weatherApi;
