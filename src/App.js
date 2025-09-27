import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

import WIDGET_CLOCK from "./components/Widgets/Clock";
function App() {
  return (
    <div className="container mt-5 flex-col">
      <Header />
      <div className="widgets">
        <ToDoList />
        <WIDGET_CLOCK />
      </div>
    </div>
  );
}

export default App;
