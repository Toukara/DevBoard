import { useWeather } from "../hooks/useWeather";

function Weather() {
  const weather = useWeather();

  if (!weather) {
    return <div>Loading...</div>;
  }
  if (weather.cod && weather.cod !== 200) {
    return <div>Error: {weather.message || weather.error}</div>;
  }

  console.log("Weather data:", weather);
  return (
    <div className="widget">
      <div className="weather-container" style={{ display: "flex" }}>
        <h2 className="weather-item">City : {weather.name}</h2>
        <h2 className="weather-item">
          Temp : {Math.round(weather.main.temp)}°C / feels like{" "}
          {Math.round(weather.main.feels_like)}
        </h2>
        <h2 className="weather-item">
          Weather : {weather.weather[0].description}{" "}
        </h2>
      </div>
      <div className="weather-widget body"></div>
    </div>
  );
}

export default Weather;
