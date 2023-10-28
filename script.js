//OpenWeatherMap API key
const apiKey = '469f57d03bb3241cdfdb4b0d380cf205';

// Selecting elements
const cityInput = document.getElementById('cityInput');
const getWeatherButton = document.getElementById('getWeatherButton');
const weatherInfo = document.getElementById('weatherInfo');

// Function to fetch weather data
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Display weather information in the UI
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError();
    }
}

// Function to display weather information
function displayWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    // Update the weatherInfo div with the weather data
    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${description}</p>
    `;

    // Add a fade-in class for a smooth transition effect
    weatherInfo.classList.add('fade');
}

// Function to display an error message in the UI
function displayError() {
    weatherInfo.innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
}

// Event listener for the "Get Weather" button
getWeatherButton.addEventListener('click', function () {
    const city = cityInput.value.trim();

    if (city !== '') {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
