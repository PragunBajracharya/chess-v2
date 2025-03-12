"use client";

import React, {useEffect, useState} from "react";
import {gameLogic} from "../lib/gameLogic";
import {pieceList} from "../lib/helper";
import {isValidMove} from "../lib/moveChecker";

export default function Chessboard({board, turn, handleMovePiece, handleTurnChange}) {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [dragStart, setDragStart] = useState(null);
    const [draggedPiece, setDraggedPiece] = useState(null);

    const handleSquareClick = (e, row, col) => {
        const classList = e.target.classList;
        let pieceClass = pieceList.find(cls => classList.contains(cls)) || null;
        if (!pieceClass && !draggedPiece) {
            return;
        }
        if (pieceClass && !draggedPiece) {
            console.log("1")
            selectPiece(e, row, col);
            return;
        }
        if (!pieceClass && draggedPiece) {
            console.log("2")
            let selectedPieceClass = pieceList.find(cls => selectedPiece.classList.contains(cls));
            if (validTurnMove(e) && isValidMove(turn, selectedPieceClass, dragStart, {row, col}, pieceClass, board)) handleMove(row, col);
            showError();
            resetSelection();
            return;
        }
        if (pieceClass && draggedPiece) {
            console.log("3")
            if (pieceClass[0] === draggedPiece.color[0]) {
                selectPiece(e, row, col);
                return;
            }
            let selectedPieceClass = pieceList.find(cls => selectedPiece.classList.contains(cls));
            if (!validTurnMove(e) || !isValidMove(turn, selectedPieceClass, dragStart, {row, col}, pieceClass, board)) {
                showError();
                resetSelection();
                return;
            }
            if (pieceClass[0] !== draggedPiece.color[0]) {
                handleMove(row, col);
            }
        }
    };

    const selectPiece = (e, row, col) => {
        if (selectedPiece) selectedPiece.classList.remove("selected");

        e.target.classList.add("selected");
        setSelectedPiece(e.target);
        setDraggedPiece(board[row][col]);
        setDragStart({ row, col });
    };

    const handleMove = (row, col) => {
        const move = gameLogic.makeMove(dragStart, {row, col}, board, draggedPiece);
        handleTurnChange(turn === "white" ? "black" : "white");
        handleMovePiece(move);
        resetSelection();
    }

    const validTurnMove = (e) => {
        if (draggedPiece.color === turn) return true;

        selectedPiece.classList.remove("selected");
        showError();
        resetSelection();
        return false;
    }

    const resetSelection = () => {
        selectedPiece.classList.remove("selected");
        setDraggedPiece(null);
        setDragStart(null);
        setSelectedPiece(null);
    };

    const showError = () => {
        selectedPiece.classList.add("error");
        setTimeout(() => selectedPiece.classList.remove("error"), 1000);
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
        </div>
    );
}
