import "./Column.scss";

function Column() {
  return (
    <div className="column">
      <header>Brainstorm</header>
      <ul>
        <li>
          <img src={require("../../image/h1.jpg")} alt="h2" />
          Title: Column 1
        </li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
        <li>Second</li>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
