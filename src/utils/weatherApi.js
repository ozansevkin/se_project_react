import { weatherApiOptions as options } from "./constants";

function getTempRange(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp <= 85) {
    return "warm";
  } else if (temp <= 65) {
    return "cold";
  }
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
  const processedData = {};
  processedData.temp = Math.round(data.main.temp);
  processedData.weather = getTempRange(processedData.temp);
  processedData.city = data.name;
  processedData.condition = getWeatherCondition(data.weather[0].id);
  processedData.time = getTimeOfTheDay(data.sys.sunrise, data.sys.sunset);

  return processedData;
}

function processServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Network response was not ok. Status: ${res.status} - ${res.statusText}`
  );
}

async function weatherApi() {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${options.lat}&lon=${options.lon}&units=${options.units}&appid=${options.key}`
  )
    .then(processServerResponse)
    .then(processData);
}

export default weatherApi;
