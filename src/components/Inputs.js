import { useState, useContext } from "react";
import { NQueensContext } from "../App";
import { nQueens } from "../nQueensGenetic";
import "./styles.css";

const Inputs = () => {
  const [n, setN] = useState(4);
  const [pop, setPop] = useState(2);
  const [genMax, setgenMax] = useState(0);
  const [pn, setPn] = useState(0.5);
  const [pm, setPm] = useState(0.5);

  const { nQueens2, setNQueens } = useContext(NQueensContext);

  return (
    <div className="formContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const solveNQueens = new nQueens(n, pop, genMax, pn, pm);
          let startTime = performance.now();
          const { board, errors, generation, errorsThroughGenerations } =
            solveNQueens.evo();
          let endTime = performance.now();

          setNQueens({
            n,
            pop,
            genMax,
            pn,
            pm,
            board,
            errors,
            generation,
            errorsThroughGenerations,
            runTime: Math.floor(endTime - startTime),
          });
        }}
        className="form"
      >
        <div className="inputContainer">
          <label>Wielkość planszy: </label>
          <input
            type="number"
            value={n}
            min={4}
            onChange={(e) => setN(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label> Wartość pop: </label>
          <input
            type="number"
            min={2}
            value={pop}
            onChange={(e) => setPop(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label>Max generacji: </label>
          <input
            type="number"
            min={0}
            value={genMax}
            onChange={(e) => setgenMax(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label>Wartość Pn: </label>
          <input
            type="number"
            value={pn}
            min={0}
            max={1}
            step={0.001}
            onChange={(e) => setPn(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label>Wartość Pm: </label>
          <input
            type="number"
            value={pm}
            min={0}
            max={1}
            step={0.001}
            onChange={(e) => setPm(e.target.value)}
            className="input"
          />
        </div>
        <input
          type="submit"
          value={"calculate"}
          style={{ width: "200px", alignSelf: "center", marginTop: "10px" }}
        />
      </form>
    </div>
  );
};

export default Inputs;
