document.addEventListener("DOMContentLoaded", () => {
    const weatherInfo = document.querySelector(".weather .info");
    const searchButton = document.querySelector(".search button");
    const inputField = document.getElementById("cityInput"); 
    const cityName = document.querySelector(".city");
    const temperature = document.querySelector(".temp");
    const weatherDescription = document.querySelector(".d-info");
    const weatherIcon = document.querySelector(".W-icon");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");

    const weatherIcons = {
        "Clear": "../img/clear.png",
        "Clouds": "../img/clouds.png",
        "Rain": "../img/rain.png",
        "Mist": "../img/mist.png",
        "Drizzle": "../img/drizzle.png",
    };

    function fetchWeatherData() {
        const city = inputField.value;
        const apiKey = '377ba9a40aaba60398fa00084824416d';

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                cityName.textContent = data.name;
                temperature.textContent = `${Math.round(data.main.temp)}°C`;
                weatherDescription.textContent = data.weather[0].description;
                weatherIcon.style.backgroundImage = `url(${weatherIcons[data.weather[0].main] || ''})`; 
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                wind.textContent = `Wind: ${data.wind.speed} KMPH`;
                weatherInfo.style.display = "block";
                setWeatherBackground(data);
            })
            .catch((error) => {
                alert('City not found. Please try again.');
                weatherInfo.style.display = "none";

            });

        inputField.value = ''; 
    }
    searchButton.addEventListener("click", fetchWeatherData);

    inputField.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            fetchWeatherData();
        }
    });
});

function setWeatherBackground(data) {
    const body = document.body;
    const weatherConditions = data.weather[0].main.toLowerCase();
    const backgroundImages = {
        "clear": "url(../img/bg-img/clear.jpg)",
        "clouds": "url(../img/bg-img/clouds.jpg)",
        "rain": "url(../img/bg-img/rainy.jpg)",
        "mist": "url(../img/mist-back.jpg)",
        "drizzle": "url(../img/drizzle-back.jpg)",
    };
    body.style.backgroundImage = backgroundImages[weatherConditions] || "url(../img/bg-.jpg)";
}