function geolocationApi(handleSuccsess, handleError) {
  if (navigator.geolocation) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(handleSuccsess, handleError);
  } else {
    console.error("Geolocation is not supported by your browser");
  }
}

export default geolocationApi;
