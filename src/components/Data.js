import "./styles.css";

const Data = ({ errors, generation, runTime, errorsThroughGenerations }) => {
  const sum = errorsThroughGenerations.reduce((a, b) => a + b, 0);
  let avg = sum / errorsThroughGenerations.length || 0;
  avg = avg.toFixed(2);

  return (
    <div className="dataContainer">
      <span>Errors: {errors}</span>
      <span>Avg error: {avg}</span>
      <span>Geneation: {generation}</span>
      <span>Run Time: {runTime}ms</span>
    </div>
  );
};

export default Data;
