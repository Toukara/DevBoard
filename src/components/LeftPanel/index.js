import Menu from "./Menu";

function LeftPanel({ onSelect }) {
  return (
    <div className="left-panel">
      <Menu onSelect={onSelect} />
    </div>
  );
}

export default LeftPanel;
