import Clock from "./components/Clock";
import Date from "./components/Date";
import Weather from "./components/Weather";

function App() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  const dayName = weekday[d];
  return (
    <>
      <div className="left container">
        <h1>Hello, World!</h1>
        <Clock type="digital" />
        <Date />
      </div>
      <div className="right container">
        <p class="day">{dayName}</p>
        <Weather />
      </div>
    </>
  );
}

export default App;
