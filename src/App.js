import { useState } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Login from "./view/Login";

import LeftPanel from "./components/LeftPanel/index";
import RSSDevTo from "./components/RSS/DevTo";
import Taskbook from "./components/ToDoList";

import { Suspense, lazy } from "react";

const WeatherComponent = lazy(() => import("./components/Widgets/Weather"));
function App() {
  const [showWeather, setShowWeather] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true",
  );
  const [visibleSections, setVisibleSections] = useState({ dashboard: true });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  if (!isAuthenticated) {
    return (
      <div style={{ height: "100vh" }}>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      <div
        className="left-panel"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "250px",
          borderRight: "1px solid #ccc",
        }}
      >
        <LeftPanel
          onSelect={(name) =>
            setVisibleSections((prev) => ({ ...prev, [name]: !prev[name] }))
          }
        />
      </div>
      <div className="main-content" style={{ flex: 1, overflowY: "auto" }}>
        <Navbar
          onWeatherClick={() => setShowWeather(true)}
          onLogout={handleLogout}
        />
        <Suspense fallback={null}>
          {showWeather && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2000,
              }}
              onClick={() => setShowWeather(false)}
            >
              <div
                style={{ background: "#fff", padding: 20, borderRadius: 8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <WeatherComponent />
                <div style={{ textAlign: "right", marginTop: 8 }}>
                  <button onClick={() => setShowWeather(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </Suspense>
        <main>
          <div className="container">
            {visibleSections.taskbook && (
              <div id="taskbook">
                <Taskbook />
              </div>
            )}
            {visibleSections.dashboard && (
              <div id="dashboard">
                <h1>Welcome to the Dashboard</h1>
                <p>This is your central hub for all activities.</p>
              </div>
            )}
            {visibleSections.rss && (
              <div id="rss">
                <h1>RSS Feeds</h1>
                <RSSDevTo />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
