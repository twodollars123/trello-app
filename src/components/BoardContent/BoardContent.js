import Column from "../Column/Column";
import { initialData } from "../../actions/initialData.js";
import { mapOrder } from "../../utilities/sorts";
import { applyDrag } from "../../utilities/dnd";
import "./BoardContent.scss";

import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

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
            <Column column={column} onRowDrop={onRowDrop} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
}

export default BoardContent;
