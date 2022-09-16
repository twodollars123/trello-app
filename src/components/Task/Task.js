import "./Task.scss";

function Task(props) {
  const { task } = props;
  return (
    <li>
      {task.cover && <img src={task.cover} alt="abc" />}
      Title: {task.title}
    </li>
  );
}

export default Task;
