// Configuration Options

const weatherApiOptions = {
  lat: "-37.81353897594871",
  lon: "144.96319207781238",
  units: "imperial",
  key: "87ecaf5163a88f4161ef1ecb6b13bb75",
};

// Magic Numbers

const MOBILE_BREAKPOINT_WIDTH = 750; //Check Header.css media queries if needs to be changed

const BACKGROUND_COLOR = {
  night: "#286897",
  dayClear: "#00A3FF",
  dayOvercast: "#6CA6C7",
};

export { weatherApiOptions, MOBILE_BREAKPOINT_WIDTH, BACKGROUND_COLOR };
