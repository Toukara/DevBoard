import { useEffect, useRef, useState } from "react";
import { SectionContext } from "./SectionContext";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ToDoList from "./components/ToDoList";

import WIDGET_CLOCK from "./components/Widgets/Clock";
import WIDGET_WEATHER from "./components/Widgets/Weather";

import RSSDevTo from "./components/RSS/DevTo";
function App() {
  const [section, setSection] = useState("home");
  const dashboardRef = useRef();
  const rssRef = useRef();

  // Fonction de scroll vers une section
  const scrollToSection = (key) => {
    if (key === "dashboard" && dashboardRef.current) {
      setSection("dashboard");
      dashboardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (key === "rss" && rssRef.current) {
      setSection("rss");
      rssRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (key === "home") {
      setSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  // Détection dynamique de la section visible au scroll
  useEffect(() => {
    const handleScroll = () => {
      const dashboardTop =
        dashboardRef.current?.getBoundingClientRect().top ?? Infinity;
      const rssTop = rssRef.current?.getBoundingClientRect().top ?? Infinity;
      if (window.scrollY < 100) {
        setSection("home");
      } else if (dashboardTop < window.innerHeight / 2 && dashboardTop > -200) {
        setSection("dashboard");
      } else if (rssTop < window.innerHeight / 2 && rssTop > -200) {
        setSection("rss");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SectionContext.Provider value={{ section, setSection }}>
      <div className="container mt-5 flex-row">
        <Navbar onSectionClick={scrollToSection} />
        <div className="container mt-5 flex-col">
          <Header />
          <section ref={dashboardRef} className="dashboard">
            <div className="widgets">
              <ToDoList />
              <WIDGET_CLOCK />
            </div>
            <br />
            <div className="widgets">
              <WIDGET_WEATHER />
            </div>
          </section>
          <br />
          <section ref={rssRef} className="rss-section">
            <div className="RSS-feeds">
              <RSSDevTo />
            </div>
          </section>
        </div>
      </div>
    </SectionContext.Provider>
  );
}

export default App;
