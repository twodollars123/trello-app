import Column from "../Column/Column";
import { initialData } from "../../actions/initialData.js";
import { mapOrder } from "../../utilities/sorts";
import { applyDrag } from "../../utilities/dnd";
import "./BoardContent.scss";

import { isEmpty } from "lodash";
import { useEffect, useState, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openAddColumnForm, setOpenAddColumnForm] = useState(false);
  const [titleColumn, setTitleColumn] = useState("");

  const titleColumnRef = useRef();

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (openAddColumnForm) {
      titleColumnRef.current.focus();
      titleColumnRef.current.select();

      return;
    }
  }, [openAddColumnForm]);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  const tongleAddColumnForm = () => {
    setOpenAddColumnForm(!openAddColumnForm);
  };

  const handleChangeAddTitleColumn = (e) => {
    setTitleColumn(e.target.value.trim());
  };
  const handleAddColumn = () => {
    if (titleColumn) {
      const newColumn = {
        id: Math.random().toString(36).substring(2, 5),
        boardId: board.id,
        title: titleColumn,
        taskOrder: [],
        tasks: [],
      };

      let newColumns = [...columns, newColumn];
      setColumns(newColumns);
      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((column) => column.id);
      newBoard.columns = newColumns;
      setBoard(newBoard);

      tongleAddColumnForm();
      setTitleColumn("");
    }
  };

  //dnd
  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onRowDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((col) => col.id === columnId);
      currentColumn.tasks = applyDrag(currentColumn.tasks, dropResult);
      currentColumn.taskOrder = currentColumn.tasks.map((item) => item.id);
      setColumns(newColumns);
    }
  };

  const onColumnUpdate = (newcolumn) => {
    const newColumnId = newcolumn.id;
    let newColumns = [...columns];
    const newColumnIndex = newColumns.findIndex((i) => i.id === newColumnId);
    if (newcolumn._destroy) {
    } else {
      newColumns.splice(newColumnIndex, 1, newcolumn);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };
  return (
    <div className="board-columns">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "cards-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onRowDrop={onRowDrop}
              onColumnUpdate={onColumnUpdate}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="bootstrap-container">
        {!openAddColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={tongleAddColumnForm}>
              <i className="fa fa-plus icon" />
              Add another card
            </Col>
          </Row>
        )}
        {openAddColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter a new column"
                ref={titleColumnRef}
                onChange={handleChangeAddTitleColumn}
                value={titleColumn}
                onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
              />
              <Button
                variant="success"
                size="sm"
                className="btn-add-column"
                onClick={handleAddColumn}
              >
                Add
              </Button>
              <i className="fa fa-close icon" onClick={tongleAddColumnForm} />
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}

export default BoardContent;
