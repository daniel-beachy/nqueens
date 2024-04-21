import React, { useEffect, useState } from "react";
import queenImage from "./img/queen-black.png";
import { Row, Col } from "react-bootstrap";

const Board = ({ boardSize, queens }) => {
  const [cellSize, setCellSize] = useState(100);

  useEffect(() => {
    const calculateCellSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const screenSize = Math.min(screenWidth, screenHeight);
      const minCellWidth = 30;
      const maxCellWidth = 100;
      const calculatedCellSize = screenSize / (boardSize + 2);

      const newCellSize = Math.max(
        minCellWidth,
        Math.min(maxCellWidth, calculatedCellSize)
      );
      setCellSize(newCellSize);
    };

    calculateCellSize();
    window.addEventListener("resize", calculateCellSize);

    return () => {
      window.removeEventListener("resize", calculateCellSize);
    };
  }, [boardSize]);

  const renderCell = (row, col) => {
    const background = (row + col) % 2 === 1 ? "bg-dark-cell" : "bg-light-cell";
    return (
      <Col
        key={`${row}-${col}`}
        className={`${background} px-0`}
        style={{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          lineHeight: `${cellSize}px`,
        }}
      >
        {Number(queens[row]) === col ? (
          <img src={queenImage} className="img-fluid" alt="Queen" />
        ) : null}
      </Col>
    );
  };

  const boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    const rowCells = [];
    for (let col = 0; col < boardSize; col++) {
      rowCells.push(renderCell(row, col));
    }
    boardRows.push(<Row key={`row-${row}`}>{rowCells}</Row>);
  }

  return (
    <div
      style={{
        width: `${boardSize * cellSize}px`,
        height: `${boardSize * cellSize}px`,
      }}
    >
      {boardRows}
    </div>
  );
};

export default Board;
