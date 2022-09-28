import Tippy from "@tippyjs/react/headless"; // different import path!
import { useState } from "react";

import "./ActionsColumn.scss";

function ActionsColumn() {
  const [showDropDown, setShowDropDown] = useState(false);

  const hide = () => setShowDropDown(false);
  return (
    <Tippy
      placement="bottom-start"
      interactive={true}
      visible={showDropDown}
      onClickOutside={hide}
      render={(attrs) => (
        <div className="box-tippy" tabIndex="-1" {...attrs}>
          <div className="header-actions">
            <p>List Actions</p>
            <i className="fa fa-close " onClick={hide} />
          </div>
          <div className="action-item">Add Card</div>
          <div className="action-item">Remove Column</div>
          <div className="action-item">Remove all tasks in column</div>
          <div className="action-item">Archive all tasks in column</div>
        </div>
      )}
    >
      <i
        className="fa fa-caret-down icon"
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
      />
    </Tippy>
  );
}

export default ActionsColumn;
