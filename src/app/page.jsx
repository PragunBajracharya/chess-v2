"use client";

import { useState } from 'react';
import ChessBoard from '../components/ChessBoard';
import MoveHistory from '../components/MoveHistory';
import { gameLogic } from '../lib/gameLogic';

export default function Home() {
  const [board, setBoard] = useState(gameLogic.initialBoard());
  const [moveHistory, setMoveHistory] = useState([]);

  const handleMovePiece = (move) => {
    setBoard(move.newBoard);
    setMoveHistory([...moveHistory, move]);
  };

  const renderBoardArray = () => {
    return (
      <div style={{ marginTop: '20px' }}>
        <h3>Board State:</h3>
        <pre>
          {board.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((piece, colIndex) => (
                <span key={colIndex} style={{ padding: '5px' }}>
                  {piece ? piece.type ? piece.color[0].toUpperCase() + piece.type[0].toUpperCase() : 'X ' : 'X '} 
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ChessBoard board={board} handleMovePiece={handleMovePiece} />
      <MoveHistory moves={moveHistory} />
      {renderBoardArray()}
    </div>
  );
}
