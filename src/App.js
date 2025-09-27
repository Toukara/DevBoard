import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

import WIDGET_CLOCK from "./components/Widgets/Clock";
import WIDGET_WEATHER from "./components/Widgets/Weather";

import RSSDevTo from "./components/RSS/DevTo";
function App() {
  return (
    <div className="container mt-5 flex-col">
      <Header />
      <div className="widgets">
        <ToDoList />
        <WIDGET_CLOCK />
      </div>
      <br />
      <div className="widgets">
        <WIDGET_WEATHER />
      </div>
      <br />
      <div className="RSS-feeds">
        <RSSDevTo />
      </div>
    </div>
  );
}

export default App;
