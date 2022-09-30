import Task from "../Task/Task";
import { mapOrder } from "../../utilities/sorts";
import "./Column.scss";
import ActionsColumn from "../ActionsColumn/ActionsColumn";

import "react-toastify/dist/ReactToastify.css";
// import Modal from "../Common/Modal";

import { Container, Draggable } from "react-smooth-dnd";
import { useState, useEffect } from "react";

function Column(props) {
  const { column, onRowDrop, onColumnUpdate } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");

  //const [showInputEdit, setShowInputEdti] = useState(false);

  //const changeTitleColumnRef = useRef();
  const [changeValueTitleColumn, setChangeValueTitleColumn] = useState("");

  const handleChangeValueTitleColumn = (e) => {
    setChangeValueTitleColumn(e.target.value.trim());
  };

  useEffect(() => {
    setChangeValueTitleColumn(column.title);
  }, [column.title]);

  // const handleShowInputEdit = (e) => {
  //   //setShowInputEdti(!showInputEdit);
  //   // e.target.focus();
  //   // e.target.select();
  // };

  const selectInlineInput = (e) => {
    e.target.focus();
    e.target.select();
  };

  // const handleChangeDataTitleColumn = () => {
  //   let newColumns = [...column];
  //   console.log("ref", changeTitleColumnRef);
  //   console.log("data", changeValueTitleColumn);
  //   handleShowInputEdit();
  // };

  const saveValue = (e) => {
    e.target.blur();
    let newColumn = {
      ...column,
      title: changeValueTitleColumn,
    };

    onColumnUpdate(newColumn);
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        {/* {!showInputEdit ? (
          <div className="title-column" onDoubleClick={handleShowInputEdit}>
            {column.title}
          </div>
        ) : ( */}
        <div className="edit-title-column">
          <input
            type="text"
            value={changeValueTitleColumn}
            className="input-edit-title-column"
            onClick={selectInlineInput}
            //ref={changeTitleColumnRef}
            onChange={handleChangeValueTitleColumn}
            onKeyDown={(e) => e.key === "Enter" && saveValue(e)}
            //onBlur={handleChangeDataTitleColumn}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        {/* )} */}
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
