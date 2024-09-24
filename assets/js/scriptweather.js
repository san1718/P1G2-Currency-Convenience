// API key: 6bdabfafea6c9fb1c11b7b85ca98c4ca
// To-do:
// How to get api out of the form & connect to front page form (connect with currency, country, etc -- 4 pieces of info)
// Connect to currency api & put info the page
// Change current weather for 5 day (?) & icons
// string name city country stringify

const weatherResultEl = document.getElementById("weatherdataicon");
const weatherCityEl = document.getElementById("weatherdataicon");

// Getting parameters for the city and country
function getWeather(city, country) {
  // fetch request gets a list of all the repos for the node.js organization
  const requestUrlGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=6bdabfafea6c9fb1c11b7b85ca98c4ca`;

  // Fetch for first response
  fetch(requestUrlGeocode)
    .then(function (response) {
      return response.json();
    })
    // Function response after getting data, data only available inside the function
    .then(function (data) {
      console.log(data[0]);
      const resultObj = data[0];
      let lat = resultObj.lat;
      let long = resultObj.lon;
      // Getting the lat and long of the city, country stated in the parameter in the first fetch function
      // *Changing it for the 5 day instead of current* current: current
      const requestUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6bdabfafea6c9fb1c11b7b85ca98c4ca`;
      // Fetch geocode from location now (from the weather)
      fetch(requestUrlWeather)
        .then(function (response) {
          return response.json();
        })
        // Looking to change from Current Weather to 5 day weather api
        .then(function (weatherdata) {
          console.log(weatherdata.weather[0]);
          // "Decorative" part
          const weatherObj = weatherdata.weather[0];
          const iconWeather = document.createElement("img");
          iconWeather.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`
          );
          weatherResultEl.appendChild(iconWeather);

          // // Icon for city
          // const iconCity = document.createElement("img");
          // iconCity.setAttribute("src", "./assets/images/travel2.jpg");
          // weatherCityEl.appendChild(iconCity);
        });
    });
}

getWeather('New York','US');