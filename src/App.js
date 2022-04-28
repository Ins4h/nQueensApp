import "./App.css";
import React, { useState } from "react";
import Inputs from "./components/Inputs";
import Board from "./components/Board";
import Data from "./components/Data";
import Plot from "react-plotly.js";

const nQueensObj = {
  n: 4,
  pop: 2,
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

  const { board, n, errors, generation, runTime, errorsThroughGenerations } =
    nQueens;

  return (
    <NQueensContext.Provider value={value}>
      <Inputs />
      <div className="boardContainer">
        <Board board={board} n={n} />
      </div>
      <Data
        errors={errors}
        generation={generation}
        runTime={runTime}
        errorsThroughGenerations={errorsThroughGenerations}
      />
      <div className="plotContainer">
        <Plot
          data={[
            {
              x: [...Array(generation + 1).keys()],
              y: errorsThroughGenerations,
              type: "log",
              mode: "markers",
              name: "spline",
              line: { shape: "spline" },
              marker: { color: "red" },
            },
          ]}
          layout={{
            width: 1400,
            height: 600,
            title: "x = generation, y = errors",
            xaxis: {
              title: "generation",
            },
            yaxis: {
              title: "errors",
            },
          }}
        />
      </div>
    </NQueensContext.Provider>
  );
}

export default App;
