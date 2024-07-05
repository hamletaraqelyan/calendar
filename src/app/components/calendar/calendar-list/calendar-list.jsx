import { useCallback, useEffect, useState } from "react";
import {
  getMonthData,
  setLocalStorage,
  getLocalStorage,
} from "../../../helpers";
import { CalendarItem } from "../calendar-item";

import "./styles.scss";

export const CalendarList = () => {
  const [monthData, setMonthData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleToggleSelectedItems = useCallback(
    (id) => {
      const itemIndex = selectedItems.indexOf(id);
      if (itemIndex !== -1) {
        const removeSelected = [...selectedItems];
        removeSelected.splice(itemIndex, 1);
        setSelectedItems(removeSelected);
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    },
    [selectedItems]
  );

  const handleSetInputValue = (e) => {
    e.target.value >= 0 && setInputValue(e.target.value);
  };

  useEffect(() => {
    if (monthData) {
      const data = [...monthData];

      selectedItems.forEach((item) => {
        data[item - 1].value = inputValue || 0;
      });

      setMonthData(data);
      setLocalStorage("monthsData", data);
    }
  }, [inputValue]);

  const handleClickOutside = (e) => {
    if (!e.target.classList.contains("calendar-item-body")) {
      setSelectedItems.length > 0 && setSelectedItems([]);
      setInputValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = getLocalStorage("monthsData") || getMonthData();
      setMonthData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="calendar-list">
      {monthData ? (
        <div className="fadeIn calendar-list-wrapper">
          {monthData?.map((monthItem) => (
            <CalendarItem
              key={monthItem.monthday}
              monthday={monthItem.monthday}
              monthname={monthItem.monthname}
              weekday={monthItem.weekday}
              value={monthItem.value}
              isSelected={selectedItems.includes(monthItem.monthday)}
              handleToggleSelectedItems={handleToggleSelectedItems}
            />
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}

      <input
        type="number"
        onChange={handleSetInputValue}
        id="inputValue"
        min="0"
        value={inputValue}
      />
    </div>
  );
};
