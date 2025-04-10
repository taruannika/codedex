const apiKey = "b494b6c3e51b257e261cc6f000276acf";

const fetchWeatherBasedOnCurrentLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }

          const weatherData = await response.json();
          console.log(weatherData);

          // Display weather data (example)
          const { name, main, weather } = weatherData;
          displayWeather(name, main, weather);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        const container = document.querySelector(".weather-display");
        container.innerHTML = "";
        const display = `
          <h2>Location access denied.</h2>
        `;
        container.insertAdjacentHTML("beforeend", display);
      }
    );
  } else {
    const container = document.querySelector(".weather-display");
    container.innerHTML = "";
    const display = `
    <h2>Geolocation is not supported by this browser.</h2>
    `;
    container.insertAdjacentHTML("beforeend", display);
    console.error("Geolocation is not supported by this browser.");
  }
};

const displayWeather = (name, main, weather) => {
  const container = document.querySelector(".weather-display");
  container.innerHTML = "";
  const display = `
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}" width="150" />
        <div class="weather-info">
            <h2>${name}</h2>
            <p>Temperature <span>${main.temp}°C</span></p>
            <p>Description <span>${weather[0].description}</span></p>
            <p>Feels Like <span>${main.feels_like}</span></p>

        </div>
    `;

  container.insertAdjacentHTML("beforeend", display);
};

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherBasedOnCurrentLocation();
});
