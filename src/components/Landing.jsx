import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <h1>My Portfolio</h1>
      <p>Welcome to my professional portfolio website!</p>
      {/* Consider adding links to individual projects or sections */}
      <Link to="/nqueens" className="nqueens-button">
        Try N-Queens Solver
      </Link>
    </div>
  );
}

export default Landing;
