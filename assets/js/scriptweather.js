// API key: 6bdabfafea6c9fb1c11b7b85ca98c4ca
// To-do:
// How to get api out of the form & connect to front page form (connect with currency, country, etc -- 4 pieces of info)
// Connect to currency api & put info the page
// Change current weather for 5 day (?) & icons
// string name city country stringify

const weatherFormEl = document.getElementById("weatherForm");
const weatherResultEl = document.getElementById("weatherdataicon");
const weatherCityEl = document.getElementById("weatherdataicon");
const weatherReportEl = document.getElementById("weatherReport");

// Function that will take the input values from city and country *Still go to figure it out*
function inputCCs() {
  // make a loop for the city and country until it is filled correctly
  const inputCityEl = document.getElementById("cityInput");
  const inputCountryEl = document.getElementById("countryInput");

  // Figure ouy how to get the inputs before the loop below
  const city_one = inputCityEl.value;
  const country_one = inputCountryEl.value;
  // Need to get both inputs before starting the loop or it will break

  console.log(city_one);
  console.log(country_one);
  getWeather(city_one, country_one);
}

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
      console.log("result: " + data[0]);
      // if statement for data
      if (data[0]) {
        const resultObj = data[0];
        let lat = resultObj.lat;
        let long = resultObj.lon;
        // Getting the lat and long of the city, country stated in the parameter in the first fetch function
        const requestUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6bdabfafea6c9fb1c11b7b85ca98c4ca`;
        // Fetch geocode from location now (from the weather)
        fetch(requestUrlWeather)
          .then(function (response) {
            return response.json();
          })
          // Looking to change from Current Weather to 5 day weather api(?) - future dev
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
            // iconCity.setAttribute("src", "./assets/images/weather2.jpg");
            // weatherCityEl.appendChild(iconCity);
          });
      } else {
        showError("That location was not found. Try again");
      }
    });
}

weatherFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("weatherdataicon").innerHTML = "";
  removeError();
  inputCCs();
});

function showError(errorMsg) {
  const messageEl = document.createElement("div");
  messageEl.setAttribute("id", "weatherError");
  messageEl.classList.add("notification", "is-link");
  const buttonEl = document.createElement("button");
  buttonEl.classList.add("delete");

  messageEl.textContent = errorMsg;
  messageEl.prepend(buttonEl);

  weatherReportEl.prepend(messageEl);
}

function removeError() {
  const msgEl = document.getElementById("weatherError");
  if (msgEl) {
    msgEl.remove();
  }
}
