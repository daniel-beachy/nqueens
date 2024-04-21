import React, { useState } from "react";
import BoardAnimation from "./BoardAnimation";
import slow from "./img/slow.png";
import normal from "./img/normal.png";
import fast from "./img/fast.png";
import nQueensAlgo from "./nQueensAlgo";
import {
  Button,
  ButtonGroup,
  FormControl,
  Row,
  Col,
  Container,
} from "react-bootstrap";

const NQueens = () => {
  const [boardSize, setBoardSize] = useState(5);
  const [solution, setSolution] = useState([""]);
  const [animationSpeed, setAnimationSpeed] = useState("normal");
  const [showAnimationTime, setShowAnimationTime] = useState(false);

  const boardSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    if (!newSize || (newSize >= 1 && newSize <= 20)) {
      setBoardSize(newSize);
    }
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

  const getWaitTime = () => {
    switch (animationSpeed) {
      case "slow":
        return 500;
      case "normal":
        return 100;
      case "fast":
        return 25;
      default:
        return 100;
    }
  };

  const calculateAnimationTime = () => {
    const waitTime = getWaitTime();
    return ((solution.length * waitTime) / 1000).toFixed(1);
  };

  return (
    <Container fluid className="d-flex flex-column vh-100">
      <Row className="justify-content-center p-2 bg-dark">
        <Col md="auto">
          <ButtonGroup>
            {["slow", "normal", "fast"].map((speed) => (
              <Button
                key={speed}
                variant={animationSpeed === speed ? "input" : "primary"}
                onClick={() => setAnimationSpeed(speed)}
              >
                {speed === "slow" && (
                  <img src={slow} style={{ maxHeight: "25px" }} alt={speed} />
                )}
                {speed === "normal" && (
                  <img src={normal} style={{ maxHeight: "25px" }} alt={speed} />
                )}
                {speed === "fast" && (
                  <img src={fast} style={{ maxHeight: "25px" }} alt={speed} />
                )}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
        <Col md="auto">
          <FormControl
            type="number"
            style={{ width: "80px" }}
            className="bg-input"
            placeholder="Board Size"
            value={boardSize}
            onChange={boardSizeChange}
          />
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={solveNQueens}>
            Solve
          </Button>
        </Col>
        <Col md="auto">
          <Button variant="danger" onClick={clear}>
            Clear
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center p-3 bg-secondary">
        <BoardAnimation
          boardSize={boardSize}
          queenPositions={solution}
          waitTime={getWaitTime()}
        />
        {showAnimationTime && boardSize !== 0 && (
          <p className="text-center text-light-cell">
            animation time: {calculateAnimationTime()} seconds
          </p>
        )}
      </Row>
      <Row className="flex-grow-1 bg-secondary"></Row>
    </Container>
  );
};

export default NQueens;
