"use client";

import {useEffect, useState} from 'react';
import ChessBoard from '../components/ChessBoard';
import MoveHistory from '../components/MoveHistory';
import {gameLogic} from '../lib/gameLogic';

export default function Home() {
    const [turn, setTurn] = useState('white');
    const [board, setBoard] = useState(gameLogic.initialBoardWhite());
    const [moveHistory, setMoveHistory] = useState([]);

    useEffect(() => {
        setBoard(turn === "black" ? gameLogic.initialBoardBlack() : gameLogic.initialBoardWhite())
    }, []);
    const handleMovePiece = (move) => {
        setBoard(move.newBoard);
        setMoveHistory([...moveHistory, move]);
    };

    const handleTurnChange = (changedTurn) => {
        setTurn(changedTurn);
    }

    const renderBoardArray = () => {
        return (
            <div style={{marginTop: '20px'}}>
                <h3>Board State:</h3>
                <pre>
          {board.map((row, rowIndex) => (
              <div key={rowIndex}>
                  {row.map((piece, colIndex) => (
                      <span key={colIndex} style={{padding: '5px'}}>
                  {piece ? gameLogic.getPieceBackground(piece).toUpperCase() : 'X '}
                </span>
                  ))}
              </div>
          ))}
        </pre>
            </div>
        );
    };

    return (
        <div>
            <ChessBoard board={board} turn={turn} handleMovePiece={handleMovePiece}
                        handleTurnChange={handleTurnChange}/>
            <div>
                Turn: {turn[0].toUpperCase() + turn.substring(1)}
            </div>
            <MoveHistory moves={moveHistory}/>
            {renderBoardArray()}
        </div>
    );
}
