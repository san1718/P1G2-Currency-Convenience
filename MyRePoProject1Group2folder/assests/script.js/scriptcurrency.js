// const repoList = document.querySelector('ul');
// const fetchButton = document.getElementById('fetch-button');

//getApi function is called when the fetchButton is clicked

// function getApi() {
//   // Insert the API url to get a list of your repos
//   const requestUrl = 'https://api.github.com/fawazahmed0/exchange-api';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       //looping over the fetch response and inserting the URL of your repos into a list
//       for (let i = 0; i < data.length; i++) {
//         //Create a list element
//         const listItem = document.createElement('li');

//         //Set the text of the list element to the JSON response's .html_url property
//         listItem.textContent = data[i].html_url;

//         //Append the li element to the id associated with the ul element.
//         repoList.appendChild(listItem);
//       }
//     });
// }

// fetchButton.addEventListener('click', getApi);

fetch("https://api.github.com/fawazahmed0/exchange-api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ key: "value" }) // Your data here
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });







    

    document.addEventListener('DOMContentLoaded', () => {
        const apiKey = '6bdabfafea6c9fb1c11b7b85ca98c4ca';
    
        function getWeather(city, country) {
            const requestUrlGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;
    
            fetch(requestUrlGeocode)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        alert("City not found. Please check your input.");
                        return;
                    }
                    
                    const resultObj = data[0];
                    const lat = resultObj.lat;
                    const lon = resultObj.lon;
    
                    const requestUrlWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
                    return fetch(requestUrlWeather);
                })
                .then(response => response.json())
                .then(weatherData => {
                    const weatherForecast = document.getElementById('weather-forecast');
                    weatherForecast.innerHTML = '';
    
                    weatherData.list.forEach(day => {
                        if (day.dt_txt.includes('12:00:00')) {
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
                })
                .catch(error => console.error('Error fetching weather data:', error));
        }
    
        document.getElementById('fetch-weather').addEventListener('click', () => {
            const city = document.getElementById('city-input').value;
            const country = document.getElementById('country-input').value;
    
            if (city && country) {
                getWeather(city, country);
            } else {
                alert("Please enter both city and country.");
            }
        });
    });



    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('user-entry');
        const amountInput = document.getElementById('amount');
        const currencySelect = document.getElementById('currencies');
        const resultDisplay = document.getElementById('conversion-result');
      
        // Fetch available currencies and populate dropdown
        function fetchCurrencies() {
          const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';  // You can use a different API if needed
      
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              const currencies = Object.keys(data.rates);
              // Populate the currency dropdown
              currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                currencySelect.appendChild(option);
              });
            })
            .catch(error => console.error('Error fetching currency list:', error));
        }
      
        // Handle form submission and fetch conversion rate
        form.addEventListener('submit', (event) => {
          event.preventDefault();
      
          const amount = amountInput.value;
          const selectedCurrency = currencySelect.value;
      
          if (amount && selectedCurrency) {
            convertCurrency(amount, selectedCurrency);
          } else {
            alert('Please enter an amount and select a currency.');
          }
        });
      
        // Fetch the conversion rate and calculate the result
        function convertCurrency(amount, currency) {
          const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;
      
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              const rate = data.rates[currency];
              const convertedAmount = (amount * rate).toFixed(2);
              resultDisplay.textContent = `${amount} USD = ${convertedAmount} ${currency}`;
            })
            .catch(error => console.error('Error fetching currency conversion:', error));
        }
      
        // Initialize the currency dropdown on page load
        fetchCurrencies();
      });