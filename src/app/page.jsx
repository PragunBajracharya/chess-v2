"use client";

import {useEffect, useState} from 'react';
import ChessBoard from '../components/ChessBoard';
import MoveHistory from '../components/MoveHistory';
import {gameLogic} from '../lib/gameLogic';

export default function Home() {
    const [turn, setTurn] = useState('white');
    const [board, setBoard] = useState(gameLogic.initialBoard());
    const [moveHistory, setMoveHistory] = useState([]);

    useEffect(() => {
        setBoard(gameLogic.initialBoard())
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
        <div className="flex flex-col md:flex-row w-full h-screen">
            <div className="w-full md:w-[70%] p-4">
                <ChessBoard board={board} turn={turn} handleMovePiece={handleMovePiece}
                            handleTurnChange={handleTurnChange}/>
                <div className="mt-4 text-lg font-medium">Turn: {turn[0].toUpperCase() + turn.substring(1)}</div>
                {renderBoardArray()}
            </div>
            <div className="w-full md:w-[30%] p-4 border-l border-gray-200">
                <h2 className="text-xl font-bold mb-2">Move History</h2>
                <div className="h-[calc(100vh-5rem)] overflow-y-auto pr-2">
                    <MoveHistory moves={moveHistory}/>
                </div>
            </div>
        </div>
    );
}
