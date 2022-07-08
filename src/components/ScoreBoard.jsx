import React from "react";

function ScoreBoard({ score }) {
  return (
      <div className="scoreBoard">
        <h2>Score:{score}</h2>
        <h1>CANDY <br /> CRUSH</h1>
      </div>
    
  );
}

export default ScoreBoard;
