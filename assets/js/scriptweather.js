// Get api key: 6bdabfafea6c9fb1c11b7b85ca98c4ca
// Get lat and long
// Get parameters for city and country
const weatherResultEl = document.getElementById('weatherdataicon');

function getWeather(city,country) {
  // fetch request gets a list of all the repos for the node.js organization
  const requestUrlGeocode = 
  `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=6bdabfafea6c9fb1c11b7b85ca98c4ca`

  // Fetch for first response
  fetch(requestUrlGeocode)
    .then(function (response) {
      return response.json();
    })
    // Function response after getting data, data only available inside the function
    .then(function (data) {
      console.log(data[0]);
      const resultObj = data[0];
      let lat = resultObj.lat
      let long = resultObj.lon
      const requestUrlWeather =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6bdabfafea6c9fb1c11b7b85ca98c4ca`;
      // Fetch geocode from location now (from the weather)
      fetch(requestUrlWeather)
      .then(function(response) {
        return response.json();
      })
      .then(function(weatherdata) {
        console.log(weatherdata.weather[0]);
        // "Decorative" part
        const weatherObj = weatherdata.weather[0];
        const iconWeather = document.createElement('img');
        iconWeather.setAttribute('src',`https://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`)
        weatherResultEl.appendChild(iconWeather);
      })
  });

}

getWeather('New York', 'US')