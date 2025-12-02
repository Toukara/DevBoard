export default function DateComponent() {
  return (
    <div>
      <h2>Date Component</h2>
      <p>{new Date().toLocaleDateString()}</p>
    </div>
  );
}
