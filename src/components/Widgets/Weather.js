import { useEffect, useState } from "react";

const { REACT_APP_WEATHER_API_KEY } = process.env;

const api_call = `https://api.openweathermap.org/data/2.5/weather?q=Lens&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`;

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(api_call)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }
  if (weather.cod !== 200) {
    return <div>Error: {weather.message}</div>;
  }

  return (
    <div className="widget weather-widget">
      <h2 className="title is-4">Weather in</h2>
      <p className="subtitle is-4">{weather.name}</p>
      <p className="subtitle is-6">{weather.weather[0].description}</p>
      <p className="temperature">
        {Math.round(weather.main.temp)}°C - <em>(feels like {weather.main.feels_like}°C )</em>
      </p>
      <p className="humidity">Humidity: {weather.main.humidity}%</p>
      <p className="wind">Wind: {Math.round(weather.wind.speed)*3.6} km/h</p>
    </div>
  );
}

export default Weather;
