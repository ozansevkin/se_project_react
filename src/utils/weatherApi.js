import { weatherApiOptions as options } from "./constants";

function getTempRange(temp) {
  if (temp >= 30) {
    return "hot";
  } else if (temp > 19 && temp < 30) {
    return "warm";
  } else if (temp <= 19) {
    return "cold";
  }
}

function processData(data) {
  const processedData = {};
  processedData.temp = Math.round(data.main.temp);
  processedData.weather = getTempRange(processedData.temp);
  processedData.city = data.name;

  return processedData;
}

async function weatherApi() {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${options.lat}&lon=${options.lon}&units=${options.units}&appid=${options.key}`
  )
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Network response was not ok. Status: ${res.status}`);
    })
    .then((data) => processData(data));
}

export default weatherApi;
