import { useWeather } from "../../hooks/useWeather";

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
      <div className="weather-widget header" style={{ display: "flex" }}>
        <h2
          className="weather-widget-title"
          style={{ fontSize: "18px", fontWeight: "bold", color: "#d3d3d3" }}
        >
          {weather.name}{" "}
          {weather.sys && weather.sys.country ? `, ${weather.sys.country}` : ""}
        </h2>
        <div className="weather-widget-cross" style={{ marginLeft: "auto", cursor: "pointer" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
      </div>
      <div
        className="weather-widget-description"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
          gap: 30,
        }}
      >
        <div className="weather-widget-temperature">
          <p style={{ fontSize: "32px", fontWeight: "bold" }}>
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="weather-widget-feelslike" style={{ fontSize: "12px" }}>
            <em>feels like {Math.round(weather.main.feels_like)}°C</em>
          </p>
        </div>
        <div
          className="weather-widget-clouds"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginLeft: "auto",
          }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            style={{ width: 50, height: 50 }}
          />
          <p className="weather-widget-subtitle">
            {weather.weather[0].description}
          </p>{" "}
        </div>
      </div>
      <div
        className="weather-widget-details"
        style={{ fontSize: "12px", marginTop: 10 }}
      >
        <p className="weather-widget-humidity">
          Humidity: {weather.main.humidity}%
        </p>
        <p className="weather-widget-wind">
          Wind: {Math.round(weather.wind.speed * 3.6)} km/h
        </p>
      </div>
    </div>
  );
}

export default Weather;
