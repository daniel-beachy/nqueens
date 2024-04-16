import React, { useState } from "react";
import BoardAnimation from "./BoardAnimation";
import nQueensAlgo from "./nQueensAlgo";

const NQueens = () => {
  const [boardSize, setBoardSize] = useState(5);
  const [solution, setSolution] = useState([""]);
  const [animationSpeed, setAnimationSpeed] = useState("normal");
  const [showAnimationTime, setShowAnimationTime] = useState(false);

  const handleChange = (event) => {
    const newSize = parseInt(event.target.value);
    setBoardSize(newSize);
    clear();
  };

  const solveNQueens = () => {
    const positions = nQueensAlgo(boardSize);
    setSolution(positions);
    setShowAnimationTime(true);
  };

  const clear = () => {
    setSolution([""]);
    setShowAnimationTime(false);
  };

  const handleSpeedChange = (event) => {
    setAnimationSpeed(event.target.value);
  };

  const getWaitTime = () => {
    switch (animationSpeed) {
      case "slow":
        return 500;
      case "normal":
        return 100;
      case "fast":
        return 25;
      default:
        return 100; // Default to normal speed
    }
  };

  const calculateAnimationTime = () => {
    const waitTime = getWaitTime();
    return (solution.length * waitTime) / 1000;
  };

  const styles = {
    container: {
      backgroundColor: "#071108",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      justifyContent: "center", // Center elements horizontally
      alignItems: "center",
      padding: 10,
      backgroundColor: "#6B5E62",
    },
    input: {
      width: 75,
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "3px",
      marginRight: 20, // Add margin for spacing
    },
    button: {
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
      marginRight: 10,
    },
    boardContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 25,
    },
    dropdown: {
      backgroundColor: "#C9C9EE",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "5px 10px",
      fontSize: "12px",
      cursor: "pointer",
      marginRight: 10,
      appearance: "none",
    },
    animationTimeText: {
      color: "white",
      marginTop: 10,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <select
          value={animationSpeed}
          onChange={handleSpeedChange}
          style={styles.dropdown}
        >
          <option value="slow">Slow</option>
          <option value="normal">Normal</option>
          <option value="fast">Fast</option>
        </select>
        <input
          onChange={handleChange}
          placeholder="Board Size"
          style={styles.input}
        />
        <button
          onClick={solveNQueens}
          style={{ ...styles.button, backgroundColor: "#3f51b5" }}
        >
          Solve
        </button>
        <button
          onClick={clear}
          style={{ ...styles.button, backgroundColor: "#ff4242" }}
        >
          Clear
        </button>
      </div>
      <div style={styles.boardContainer}>
        <BoardAnimation
          boardSize={boardSize}
          queenPositions={solution}
          waitTime={getWaitTime()}
          style={{ justifyContent: "center" }}
        />
        {showAnimationTime && (
          <p style={styles.animationTimeText}>
            Animation time: {calculateAnimationTime()} seconds
          </p>
        )}
      </div>
    </div>
  );
};

export default NQueens;
