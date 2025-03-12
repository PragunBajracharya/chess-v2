"use client";

import React, {useEffect, useState} from "react";
import {gameLogic} from "../lib/gameLogic";
import {pieceList} from "../lib/pieceList";

export default function Chessboard({board, turn, handleMovePiece, handleTurnChange}) {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [dragStart, setDragStart] = useState(null);
    const [draggedPiece, setDraggedPiece] = useState(null);

    const handleSquareClick = (e, row, col) => {
        const classList = e.target.classList;
        let pieceClass = null;
        let hasPieceClass = pieceList.some(cls => {
                if (classList.contains(cls)) {
                    pieceClass = cls;
                    return true;
                }
                return false;
            }
        )
        if (!hasPieceClass && !draggedPiece) {
            return;
        } else if (hasPieceClass && !draggedPiece) {
            const piece = board[row][col];
            setDraggedPiece(piece);
            setDragStart({row, col});

        } else if (!hasPieceClass && draggedPiece) {
            if (!validTurnMove()) return;
            handleMove(row, col);
        } else if (hasPieceClass && draggedPiece) {
            if (!validTurnMove()) return;
            if (pieceClass[0] !== draggedPiece.color[0]) {
                handleMove(row, col);
                return;
            }
            const piece = board[row][col];
            setDraggedPiece(piece);
            setDragStart({row, col});
        }
    };

    const handleMove = (row, col) => {
        const move = gameLogic.makeMove(dragStart, {row, col}, board, draggedPiece);
        let changedTurn = turn === "white" ? "black" : "white";
        handleTurnChange(changedTurn);
        handleMovePiece(move);
        setDraggedPiece(null);
        setDragStart(null);
    }

    const validTurnMove = () => {
        if (draggedPiece.color !== turn) {
            console.error(turn, "Turn")
            setDraggedPiece(null);
            setDragStart(null);
            return false;
        }
        return true;
    }

    if (board.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
            <div className="grid grid-cols-8 border border-gray-800">
                {board.map((row, rowIndex) =>
                    row.map((square, colIndex) => {
                        const isBlackSquare = (rowIndex + colIndex) % 2 === 1;
                        const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`
					aspect-square 
					${isBlackSquare ? "bg-gray-600" : "bg-gray-200"} 
					${isSelected ? "ring-2 ring-blue-500 ring-inset" : ""}
					${square ? gameLogic.getPieceBackground(square) : ""}
				  `}
                                onClick={(e) => handleSquareClick(e, rowIndex, colIndex)}

                            />
                        );
                    })
                )}
            </div>

            <div
                className="mt-4 text-center text-sm">{selectedPiece ? `Selected: ${board[selectedPiece.row][selectedPiece.col].position}` : "Click on a piece to move it"}</div>
        </div>
    );
}
