import {getChessNotation} from "../lib/helper";

const MoveHistory = ({moves}) => {
    return (
        <div style={{maxWidth: '250px'}}>
            <h3>Move History</h3>
            <ul style={{listStyleType: 'none', padding: 0}}>
                {moves.map((move, index) => (
                    <li key={index} style={{marginBottom: '10px'}}>
                        <strong>Move {index + 1}:</strong>
                        <p>{`${move.piece} moved from ${move.piece !== "pawn" ? move.piece === "knight" ? "N": move.piece[0].toUpperCase() : ""}${getChessNotation(move.from.row, move.from.col)} → ${getChessNotation(move.to.row, move.to.col)}`}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MoveHistory;
  