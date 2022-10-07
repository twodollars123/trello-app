import "./Task.scss";

import { useState } from "react";
import ModalUpdateTask from "../Common/ModalUpdateTask";

function Task(props) {
  const { task, onRemoveTask, onUpdateTask } = props;

  const [visible, setVisible] = useState(false);

  const handleRemoveTask = () => {
    let taskId = task.id;
    onRemoveTask(taskId);
  };

  const handleUpdateTask = () => {
    setVisible(true);
  };
  return (
    <div className="row-drag-handle">
      {task.cover && (
        <img
          src={task.cover}
          alt="abc"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      <h5 className="title-task">Title: {task.title}</h5>
      <p>Description: {task.description}</p>
      <div>
        <div className="bottom-task">
          <p>Approve: {task.approve}</p>
          <p className={`priority-${task.priority}`}> {task.priority}</p>
        </div>
        <div className="actionTask">
          <i className="fa fa-trash " onClick={handleRemoveTask} />
          <i className="fa fa-pencil " onClick={handleUpdateTask} />
        </div>
      </div>
      <ModalUpdateTask
        visible={visible}
        setVisible={setVisible}
        title={task.title}
        description={task.description}
        approve={task.approve}
        priority={task.priority}
        column={props.column}
        onUpdateTask={onUpdateTask}
      />
    </div>
  );
}

export default Task;
