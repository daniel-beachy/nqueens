import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import NQueens from "./components/n-queens/NQueens";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />{" "}
          <Route path="/nqueens" element={<NQueens />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
