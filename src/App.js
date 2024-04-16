import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import NQueens from "./components/n-queens/NQueens";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />{" "}
        <Route path="/nqueens" element={<NQueens />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
