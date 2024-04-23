import React, { useState } from "react";
import BoardAnimation from "./BoardAnimation";
import snail from "./img/snail.png";
import rabbit from "./img/rabbit.png";
import rocket from "./img/rocket.png";
import homeIcon from "./img/home.png";
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
      if (newSize === NaN) {
        setBoardSize(undefined);
      } else {
        setBoardSize(newSize);
      }
    }
    clear();
  };

  const solveNQueens = () => {
    setSolution(nQueensAlgo(boardSize));
    setShowAnimationTime(true);
  };

  const clear = () => {
    setSolution([[]]);
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
      <a
        href="http://daniel-beachy.github.io"
        className="pt-3 d-flex align-items-center position-absolute"
      >
        <img style={{ maxHeight: "25px" }} src={homeIcon} alt="Home" />
      </a>
      <Row className="justify-content-center bg-dark">
        <Col xs={12} sm="auto" className="p-2 justify-content-center d-flex">
          <ButtonGroup>
            {["slow", "normal", "fast"].map((speed) => (
              <Button
                key={speed}
                variant={animationSpeed === speed ? "light-blue" : "primary"}
                onClick={() => setAnimationSpeed(speed)}
              >
                {speed === "slow" && (
                  <img src={snail} style={{ maxHeight: "25px" }} alt={speed} />
                )}
                {speed === "normal" && (
                  <img src={rabbit} style={{ maxHeight: "25px" }} alt={speed} />
                )}
                {speed === "fast" && (
                  <img src={rocket} style={{ maxHeight: "25px" }} alt={speed} />
                )}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
        <Col xs="auto" className="p-2 justify-content-end d-flex">
          <FormControl
            type="number"
            style={{ width: "80px" }}
            className="bg-light-blue"
            placeholder="N"
            value={boardSize}
            onChange={boardSizeChange}
          />
        </Col>
        <Col xs="auto" className="p-2 justify-content-center d-flex">
          <Button variant="primary" onClick={solveNQueens}>
            Solve
          </Button>
        </Col>
        <Col xs="auto" className="p-2 justify-content-start d-flex">
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
