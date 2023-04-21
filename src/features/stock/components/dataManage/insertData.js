import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { insertNewScripAsync } from "../../StockSlice";

function InsertNewData() {
  const [newScrip, setNewScrip] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    console.log("newScrip", newScrip);

    if (newScrip && newScrip !== "" && newScrip.length > 0) {
      dispatch(insertNewScripAsync({ newScrip }));
    }
    setNewScrip("");
  };

  return (
    <div className="inserData">
      New Scrip Symbol:
      <input value={newScrip} onChange={(e) => setNewScrip(e.target.value.trim().toUpperCase())} />
      <button onClick={handleSave} disabled={!newScrip}>
        Save
      </button>
    </div>
  );
}

export default InsertNewData;
