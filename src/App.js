import "./App.css";
import React, { useState } from "react";
import Inputs from "./components/Inputs";
import Board from "./components/Board";
import Data from "./components/Data";

const nQueensObj = {
  n: 4,
  pop: 1,
  maxGen: 0,
  pn: 0.5,
  pm: 0.5,
  board: [],
  errors: 0,
  generation: 0,
  errorsThroughGenerations: [],
  runTime: 0,
};

export const NQueensContext = React.createContext({
  nQueensObj,
  setNQueensObj: () => {},
});

function App() {
  const [nQueens, setNQueens] = useState(nQueensObj);
  const value = { nQueens, setNQueens };

  const { board, n, errors, generation, runTime } = nQueens;

  return (
    <NQueensContext.Provider value={value}>
      <Inputs />
      <div className="boardContainer">
        <Board board={board} n={n} />
      </div>
      <Data errors={errors} generation={generation} runTime={runTime} />
    </NQueensContext.Provider>
  );
}

export default App;
