import Column from "../Column/Column";
import { initialData } from "../../actions/initialData.js";
import { mapOrder } from "../../utilities/sorts";
import "./BoardContent.scss";

import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

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
  return (
    <div className="board-columns">
      {columns.map((column, index) => {
        return <Column key={index} column={column} />;
      })}
    </div>
  );
}

export default BoardContent;
