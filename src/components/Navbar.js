import { useContext } from "react";
import { SectionContext } from "../SectionContext";

export default function Navbar({ onSectionClick }) {
  const { section } = useContext(SectionContext);

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
          gap: "1rem",
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
        <div className="navbar-end">
          <div className="navbar-item">
            {/* <div className="buttons">
              <a
                className="button is-primary"
                href="https://github.com/toukara"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#e91e63", borderColor: "#e91e63" }}
              >
                <strong>Mon GitHub</strong>
              </a>
            </div> */}
            <p>08 : 24 pm</p>
          </div>
        </div>
      </nav>
    </div>
  );
}
