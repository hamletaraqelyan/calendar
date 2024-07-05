import React, { memo, useRef } from "react";

import "./styles.scss";

export const CalendarItem = memo(
  ({
    monthday,
    monthname,
    weekday,
    value,
    handleToggleSelectedItems,
    isSelected,
  }) => {
    const handleSelectBody = () => {
      handleToggleSelectedItems(monthday);
    };

    return (
      <div className="calendar-item">
        <div className="calendar-item-header">
          <p>{weekday}</p>
          <p>{monthday}</p>
          <p>{monthname.slice(0, 3)}</p>
        </div>
        <label
          htmlFor="inputValue"
          className={`calendar-item-body ${isSelected ? "selected" : ""}`}
          onClick={handleSelectBody}
        >
          <p>({value})</p>
        </label>
      </div>
    );
  }
);
