import { useWeather } from "../../hooks/useWeather";

function Weather() {
  const weather = useWeather();

  if (!weather) {
    return <div>Loading...</div>;
  }
  if (weather.cod && weather.cod !== 200) {
    return <div>Error: {weather.message || weather.error}</div>;
  }

  return (
    <div className="widget weather-widget">
      <h2 className="title is-4">Weather in</h2>
      <p className="subtitle is-4">{weather.name}</p>
      <p className="subtitle is-6">{weather.weather[0].description}</p>
      <p className="temperature">
        {Math.round(weather.main.temp)}°C -{" "}
        <em>(feels like {weather.main.feels_like}°C )</em>
      </p>
      <p className="humidity">Humidity: {weather.main.humidity}%</p>
      <p className="wind">Wind: {Math.round(weather.wind.speed) * 3.6} km/h</p>
    </div>
  );
}

export default Weather;
