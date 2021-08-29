import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { insertNewScripAsync } from "../../StockSlice";

function InsertNewData() {
  const [newScrip, setNewScrip] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    console.log("newScrip", newScrip);
    dispatch(insertNewScripAsync({ newScrip }));
    setNewScrip("");
  };

  return (
    <div className="inserData">
      New Scrip Symbol:
      <input
        value={newScrip}
        onChange={(e) => setNewScrip(e.target.value.toUpperCase())}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default InsertNewData;
