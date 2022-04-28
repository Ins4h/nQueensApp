import "./styles.css";

const Data = ({ errors, generation, runTime }) => {
  return (
    <div className="dataContainer">
      <span>Errors: {errors}</span>
      <span>Geneation: {generation}</span>
      <span>Run Time: {runTime}ms</span>
    </div>
  );
};

export default Data;
