import Column from "../Column/Column";
import { initialData } from "../../actions/initialData.js";
import { mapOrder } from "../../utilities/sorts";
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
  const onColumnDrop = (dropResult) => {};
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
            <Column column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
}

export default BoardContent;
