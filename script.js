const apiKey = 'd4de727582b25de8a745a84835559d7c'; 

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfoElement = document.getElementById('weatherInfo');
const celsiusButton = document.getElementById('celsiusButton');
const fahrenheitButton = document.getElementById('fahrenheitButton');

let temperatureUnit = 'metric'; // Default to Celsius

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

celsiusButton.addEventListener('click', () => {
    temperatureUnit = 'metric';
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

fahrenheitButton.addEventListener('click', () => {
    temperatureUnit = 'imperial';
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    // Construct the API URL with the selected temperature unit
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${temperatureUnit}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp.toFixed(2);

            // Display weather information with selected temperature unit
            const unitLabel = temperatureUnit === 'metric' ? '°C' : '°F';
            const weatherHTML = `
                <p>City: ${city}</p>
                <p>Weather: ${weatherDescription}</p>
                <p>Temperature: ${temperature}${unitLabel}</p>
            `;

            weatherInfoElement.innerHTML = weatherHTML;
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            weatherInfoElement.innerHTML = 'Unable to fetch weather data. Please try again later.';
        });
}
