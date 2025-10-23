import { useEffect, useState } from "react";

const { REACT_APP_WEATHER_API_KEY } = process.env;
const DEFAULT_CITY = "Arras";

const useWeather = (city) => {
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const queryCity = city || DEFAULT_CITY;
    if (!REACT_APP_WEATHER_API_KEY) {
      setWeather({ error: "No API key provided" });
      return;
    }
    const api_call = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`;
    fetch(api_call)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => setWeather({ error: error.message }));
  }, [city]);

  return weather;
};

export { useWeather };
