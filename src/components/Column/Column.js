import Task from "../Task/Task";
import { mapOrder } from "../../utilities/sorts";
import "./Column.scss";

import { Container, Draggable } from "react-smooth-dnd";

function Column(props) {
  const { column, onRowDrop } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");

  //dnd

  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>

      <div className="tasks">
        <Container
          groupName="row"
          getChildPayload={(index) => tasks[index]}
          onDrop={(dropResult) => onRowDrop(column.id, dropResult)}
          dragClass="card-ghost"
          dropClass="card-ghost-drog"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "drop-preview",
          }}
        >
          {tasks.map((task, index) => (
            <Draggable key={index}>
              <Task task={task} />
            </Draggable>
          ))}
        </Container>
      </div>

      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
