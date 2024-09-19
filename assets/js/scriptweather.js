// API key: 6bdabfafea6c9fb1c11b7b85ca98c4ca (this should be in envirnment variable for API key for security purposes)
// To-do:
// How to get api out of the form & connect to front page form (connect with currency, country, etc -- 4 pieces of info)
// Connect to currency api & put info the page
// Change current weather for 5 day (?) & icons
// string name city country stringify

const weatherResultEl = document.getElementById("weatherdataicon");
const weatherCityEl = document.getElementById("weatherdataicon");

// Function that will take the input values from city and country *Still go to figure it out*
function inputCCs() {
  // make a loop for the city and country until it is filled correctly
  const inputCity = document.getElementById("weatherdataicon").value;
  const inputCountry = document.getElementById("weatherdataicon").value;
  const inputCityStr = JSON.stringify(inputCity);
  const inputCountryStr = JSON.stringify(inputCountry);
  // Figure ouy how to get the inputs before the loop below
  inputCity.input();
  inputCountry.input();
  // Need to get both inputs before starting the loop or it will break
  while (!city || !country) {
    console.log(`Please fill in both spaces.`);
  }
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

          // Icon for city
          const iconCity = document.createElement("img");
          iconCity.setAttribute("src", "./assets/images/weather2.jpg");
          weatherCityEl.appendChild(iconCity);
        });
    });
}

getWeather(inputCCs);




document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '6bdabfafea6c9fb1c11b7b85ca98c4ca';
    const city = 'YOUR_CITY'; // Replace with actual city or retrieve from user input
    const country = 'YOUR_COUNTRY'; // Replace with actual country or retrieve from user input

    function getWeather(city, country) {
        // Geocode request to get latitude and longitude
        const requestUrlGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;
        
        fetch(requestUrlGeocode)
            .then(response => response.json())
            .then(data => {
                const resultObj = data[0];
                const lat = resultObj.lat;
                const lon = resultObj.lon;

                // 5-day weather forecast request
                const requestUrlWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

                fetch(requestUrlWeather)
                    .then(response => response.json())
                    .then(weatherData => {
                        const weatherForecast = document.getElementById('weather-forecast');
                        weatherForecast.innerHTML = ''; // Clear any existing content

                        weatherData.list.forEach(day => {
                            if (day.dt_txt.includes('12:00:00')) { // Only display forecast for midday
                                const weatherCard = document.createElement('div');
                                weatherCard.className = 'column is-one-fifth';

                                weatherCard.innerHTML = `
                                    <div class="card">
                                        <div class="card-content">
                                            <div class="media">
                                                <div class="media-left">
                                                    <figure class="image is-48x48">
                                                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
                                                    </figure>
                                                </div>
                                                <div class="media-content">
                                                    <p class="title is-4">${new Date(day.dt_txt).toLocaleDateString()}</p>
                                                    <p class="subtitle is-6">${day.weather[0].description}</p>
                                                    <p>Temperature: ${day.main.temp} °C</p>
                                                    <p>Humidity: ${day.main.humidity}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                weatherForecast.appendChild(weatherCard);
                            }
                        });
                    });
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Call the function with city and country
    getWeather(city, country);
});

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '6bdabfafea6c9fb1c11b7b85ca98c4ca';

    function getWeather(city, country) {
        // Existing code...
    }

    document.getElementById('fetch-weather').addEventListener('click', () => {
        const city = document.getElementById('city-input').value;
        const country = document.getElementById('country-input').value;
        getWeather(city, country);
    });
});


fetch(“https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API KEY}”, {
    method: “POST”,
    headers: {
      “Content-Type”: “application/json”
    },
    body: JSON.stringify({ key: “value” }) // Your data here
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(‘Error:’, error);
    }); (edited) 
