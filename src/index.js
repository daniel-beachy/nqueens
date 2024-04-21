import React from "react";
import ReactDOM from "react-dom/client";
import "./custom.scss";
import NQueens from "./components/NQueens";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NQueens />
  </React.StrictMode>
);
