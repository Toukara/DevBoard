import { useContext } from "react";
import { useWeather } from "../hooks/useWeather";
import { SectionContext } from "../SectionContext";
import Clock from "./Widgets/Clock";

/* eslint-disable */
// The "//" in the paragraph tag below is just text, not a comment.

export default function Navbar({ onSectionClick }) {
  const { section } = useContext(SectionContext);
  const weather = useWeather();

  // Affichage sécurisé pour le weather
  const weatherLoaded =
    weather && weather.main && weather.weather && weather.weather[0];

  return (
    <div className="container">
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "transparent",
          padding: "0.5rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.65rem",
        }}
      >
        <h1
          style={{
            color: section === "home" ? "#e91e63" : undefined,
            textShadow: section === "home" ? "0 0 8px #e91e63aa" : undefined,
            cursor: "pointer",
          }}
          onClick={() => onSectionClick && onSectionClick("home")}
        >
          benjamin
        </h1>
        <p className="navbar-separator">/</p>
        <p
          style={{
            textDecoration: section === "dashboard" ? "underline" : "none",
            textUnderlineOffset: "5px",
            cursor: "pointer",
            color: section === "dashboard" ? "#e91e63" : undefined,
            textShadow:
              section === "dashboard" ? "0 0 8px #e91e63aa" : undefined,
          }}
          onClick={() => onSectionClick && onSectionClick("dashboard")}
        >
          dashboard
        </p>
        <p className="navbar-separator">/</p>
        <p
          style={{
            textDecoration: section === "rss" ? "underline" : "none",
            textUnderlineOffset: "5px",
            color: section === "rss" ? "#e91e63" : undefined,
            textShadow: section === "rss" ? "0 0 8px #e91e63aa" : undefined,
            cursor: "pointer",
          }}
          onClick={() => onSectionClick && onSectionClick("rss")}
        >
          flux rss
        </p>
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
            <p>
              {" "}
              <Clock type="digital" />
            </p>
          </div>
          <div className="navbar-item">
            <div className="separators">//</div>
          </div>

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
          <div className="navbar-item">
            <div className="separators">//</div>
          </div>
        </div>
      </nav>
    </div>
  );
}
