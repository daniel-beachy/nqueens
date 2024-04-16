import React from "react";
import queenImage from "./img/queen-black.png";

const Board = ({ boardSize, queens }) => {
  const styles = {
    width: `${boardSize * 75}px`,
    height: `${boardSize * 75}px`,
    display: "flex",
    flexDirection: "column",
  };

  const cellStyles = {
    width: "75px",
    height: "75px",
    textAlign: "center",
    lineHeight: "75px",
    fontSize: "60px",
  };

  const queenStyle = {
    maxWidth: "90%",
    maxHeight: "90%",
    alignSelf: "center",
  };

  const renderCell = (row, col) => {
    const isBlack = (row + col) % 2 === 1;
    const backgroundColor = isBlack ? "#4b7399" : "#eae9d2";
    let className = "cell";
    let content = "";
    if (Number(queens[row]) === col) {
      content = <img src={queenImage} alt="Queen" style={queenStyle} />;
      className += " queen-cell";
    }
    return (
      <div
        key={`${row}-${col}`}
        className={className}
        style={{ ...cellStyles, backgroundColor }}
      >
        {content}
      </div>
    );
  };

  const board = [];
  for (let row = 0; row < boardSize; row++) {
    const rowCells = [];
    for (let col = 0; col < boardSize; col++) {
      rowCells.push(renderCell(row, col));
    }
    board.push(
      <div key={`row-${row}`} style={{ display: "flex" }}>
        {rowCells}
      </div>
    );
  }

  return <div style={styles}>{board}</div>;
};

export default Board;
