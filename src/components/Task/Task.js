import "./Task.scss";

function Task(props) {
  const { task } = props;
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
      <div className="bottom-task">
        <p>Approve: {task.approve}</p>
        <p className={`priority-${task.priority}`}> {task.priority}</p>
      </div>
    </div>
  );
}

export default Task;
