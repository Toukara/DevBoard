import { useEffect, useRef, useState } from "react";
import { useWeather } from "../hooks/useWeather";

import Clock from "./Widgets/Clock";
import WIDGET_WEATHER from "./Widgets/Weather";

// The "//" in the paragraph tag below is just text, not a comment.

export default function Navbar({ onLogout }) {
  const weather = useWeather();
  const [showWidget, setShowWidget] = useState(false);
  const weatherRef = useRef(null);
  const popupRef = useRef(null);

  // Affichage sécurisé pour le weather
  const weatherLoaded =
    weather && weather.main && weather.weather && weather.weather[0];

  // close popup when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (!showWidget) return;
      if (popupRef.current?.contains(e.target)) return;
      if (weatherRef.current?.contains(e.target)) return;
      setShowWidget(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [showWidget]);

  return (
    <div className="navbar-container" style={{ display: "flex", flexGrow: 1 }}>
      <div
        className="navbar-end"
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        <div className="navbar-item">
          <div className="buttons">
            <button
              className="button is-light"
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                if (onLogout) onLogout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="navbar-item">
          <div className="separators">{"//"}</div>
        </div>
        <div className="navbar-item">
          <Clock type="digital" />
        </div>
        <div className="navbar-item">
          <div className="separators">{"//"}</div>
        </div>
        <div
          className="weather-item"
          ref={weatherRef}
          onClick={() => setShowWidget((s) => !s)}
        >
          <div className="navbar-item">
            {weatherLoaded ? (
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            ) : (
              <span
                style={{ width: 40, height: 40, display: "inline-block" }}
              />
            )}
          </div>
          <div className="navbar-item">
            {weatherLoaded ? Math.round(weather.main.temp) + "°C" : "..."}
          </div>
        </div>
      </div>

      <div
        ref={popupRef}
        style={{
          position: "absolute",
          top: "100%",
          right: "2rem",
          marginTop: 8,
          zIndex: 1500,
          display: showWidget ? "block" : "none",
        }}
        onClick={() => setShowWidget((s) => !s)}
      >
        <div
          style={{
            border: "1px solid #A3A3A3",
            padding: 10,
          }}
        >
          <WIDGET_WEATHER />
        </div>
      </div>
    </div>
  );
}
