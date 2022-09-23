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
      Title: {task.title}
    </div>
  );
}

export default Task;
