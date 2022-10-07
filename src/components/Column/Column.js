import Task from "../Task/Task";
import { mapOrder } from "../../utilities/sorts";
import "./Column.scss";
import ActionsColumn from "../ActionsColumn/ActionsColumn";

import "react-toastify/dist/ReactToastify.css";

import { Container, Draggable } from "react-smooth-dnd";
import { useState, useEffect } from "react";
import FooterColumn from "../FooterColumn/FooterColumn";
import ModalCoreUI from "../../components/Common/ModalCoreUI";

function Column(props) {
  const [visible, setVisible] = useState(false);
  const { column, onRowDrop, onColumnUpdate } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");

  const [changeValueTitleColumn, setChangeValueTitleColumn] = useState("");

  const handleChangeValueTitleColumn = (e) => {
    setChangeValueTitleColumn(e.target.value.trim());
  };

  useEffect(() => {
    setChangeValueTitleColumn(column.title);
  }, [column.title]);

  const selectInlineInput = (e) => {
    e.target.focus();
    e.target.select();
  };

  const saveValue = (e) => {
    e.target.blur();
    let newColumn = {
      ...column,
      title: changeValueTitleColumn,
    };

    onColumnUpdate(newColumn);
  };

  const onRemoveTask = (taskId) => {
    let newTasks = [...tasks];
    let indexRemoveTask = newTasks.findIndex((item) => item.id === taskId);
    newTasks.splice(indexRemoveTask, 1);
    column.tasks = newTasks;
    onColumnUpdate(column);
  };

  const onUpdateTask = (newTask) => {
    let newTasks = [...tasks];
    let indexRemoveTask = newTasks.findIndex((item) => item.id === newTask.id);
    newTasks.splice(indexRemoveTask, 1, newTask);
    column.tasks = newTasks;
    onColumnUpdate(column);
  };

  const onHandleAddNewTask = (newTask) => {
    let newTasks = [...column.tasks];
    newTasks.push(newTask);
    column.tasks = newTasks;
    onColumnUpdate(column);
    setVisible(false);
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
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
              <Task
                task={task}
                onRemoveTask={onRemoveTask}
                column={column}
                onUpdateTask={onUpdateTask}
              />
            </Draggable>
          ))}
        </Container>
      </div>

      <footer>
        <FooterColumn setVisible={setVisible} />
      </footer>
      <ModalCoreUI
        visible={visible}
        setVisible={setVisible}
        column={column}
        onHandleAddNewTask={onHandleAddNewTask}
      />
      {/* <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal> */}
    </div>
  );
}

export default Column;
