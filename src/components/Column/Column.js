import Task from "../Task/Task";
import { mapOrder } from "../../utilities/sorts";
import "./Column.scss";

function Column(props) {
  const { column } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");
  return (
    <div className="column">
      <header>{column.title}</header>
      <ul>
        {tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
