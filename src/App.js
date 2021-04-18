import React from "react";
import { Stock } from "./features/stock/Stock";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stock />
      </header>
    </div>
  );
}

export default App;
