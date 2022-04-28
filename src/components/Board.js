import { useEffect, useState } from "react";
import "./styles.css";

const Board = ({ board, n }) => {
  const [chessBoardChange, setChessBoardChange] = useState([]);

  useEffect(() => {
    let chessBoardSchema = [];
    for (let i = 0; i < n; i++) {
      chessBoardSchema.push([]);
      for (let j = 0; j < n; j++) {
        if (board[i] === j) {
          chessBoardSchema[i].push(1);
        } else {
          chessBoardSchema[i].push(0);
        }
      }
    }
    setChessBoardChange(chessBoardSchema);
  }, [board, n]);

  return (
    <div className="board">
      {chessBoardChange.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((piece, tileIndex) => {
              let check = tileIndex;
              if (rowIndex % 2) check += 1;

              if (check % 2) {
                if (piece === 1)
                  return (
                    <div key={tileIndex} className="boardTile queenTile"></div>
                  );
                else return <div key={tileIndex} className="boardTile"></div>;
              } else {
                if (piece === 1)
                  return (
                    <div
                      key={tileIndex}
                      className="boardTileGray queenTile"
                    ></div>
                  );
                else
                  return <div key={tileIndex} className="boardTileGray"></div>;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
