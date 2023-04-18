import { weatherApiOptions as options } from "./constants";

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
function getTempWithUnit(temp, tempUnit) {
  if (tempUnit === "C") {
    temp = ((temp - 32) * 5) / 9;
  } else if (tempUnit !== "F") {
    throw new Error(`This function only works with F and C`);
  }

  return `${Math.round(temp)}&deg;${tempUnit}`;
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
  processedData.temp.F = getTempWithUnit(data.main.temp, "F");
  processedData.temp.C = getTempWithUnit(data.main.temp, "C");
  processedData.weather = getTempRange(data.main.temp);
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
