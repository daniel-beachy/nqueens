import React, { useState, useEffect } from "react";
import Board from "./Board";

const BoardAnimation = ({ boardSize, queenPositions, waitTime }) => {
  const [currentPosition, setCurrentPosition] = useState("");
  useEffect(() => {
    console.log(queenPositions);
    if (queenPositions.length === 0) {
      setCurrentPosition("");
      return;
    }
    let index = 1;
    const intervalId = setInterval(() => {
      if (index < queenPositions.length) {
        setCurrentPosition(queenPositions[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, waitTime);

    return () => clearInterval(intervalId);
  }, [queenPositions, waitTime]);

  return (
    <>
      {queenPositions.length > 1 ? (
        <Board boardSize={boardSize} queens={currentPosition} />
      ) : (
        <Board boardSize={boardSize} queens={""} />
      )}
    </>
  );
};

export default BoardAnimation;
