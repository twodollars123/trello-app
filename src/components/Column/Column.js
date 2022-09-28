import Task from "../Task/Task";
import { mapOrder } from "../../utilities/sorts";
import "./Column.scss";
import ActionsColumn from "../ActionsColumn/ActionsColumn";

import "react-toastify/dist/ReactToastify.css";
// import Modal from "../Common/Modal";

import { Container, Draggable } from "react-smooth-dnd";

function Column(props) {
  const { column, onRowDrop } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="title-column">{column.title}</div>
        <div className="action-header-column">
          <ActionsColumn />
        </div>
      </header>

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

      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon" />
          Add another card
        </div>
      </footer>
    </div>
  );
}

export default Column;
