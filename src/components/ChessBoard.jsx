"use client";

import React, { useEffect, useRef, useState } from "react";
import { gameLogic } from "../lib/gameLogic";
import { DndContext, useDroppable, useDraggable, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";

const ChessBoard = ({ board, handleMovePiece }) => {
	const canvasRef = useRef(null);
	const [draggingPiece, setDraggingPiece] = useState(null);
	const [dragStart, setDragStart] = useState(null);
	const [turn, setTurn] = useState("white");

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");

		// Draw the board and pieces
		gameLogic.drawBoard(ctx, board);
	}, [board]);

	const { attributes, isDragging, listeners, setNodeRef } = useDraggable({});

	const handleMouseDown = (e) => {
		const canvas = canvasRef.current;
		const squareSize = 60;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const col = Math.floor(x / squareSize);
		const row = Math.floor(y / squareSize);

		const piece = board[row][col];
		if (turn === "white" && piece?.color === "black") return;
		if (turn === "black" && piece?.color === "white") return;
		if (piece) {
			setDraggingPiece(piece);
			setDragStart({ row, col });
		}
	};

	const handleMouseMove = (e) => {
		if (!draggingPiece) return;

		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Redraw the board with the moved piece
		const ctx = canvas.getContext("2d");
		gameLogic.drawBoard(ctx, board);
		gameLogic.drawPiece(ctx, draggingPiece, x - 30, y - 30); // Draw piece at mouse position
	};

	const handleMouseUp = (e) => {
		if (!draggingPiece || !dragStart) return;

		const canvas = canvasRef.current;
		const squareSize = 60;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const col = Math.floor(x / squareSize);
		const row = Math.floor(y / squareSize);

		const move = gameLogic.makeMove(dragStart, { row, col }, board, draggingPiece);
		if (move) {
			handleMovePiece(move);
		}
		if (move && move.newBoard) {
			setTurn(turn === "white" ? "black" : "white");
		}
		setDraggingPiece(null);
		setDragStart(null);
	};

	return (
		<DndContext>
				<canvas
					ref={canvasRef}
					width={480}
					height={480}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					style={{ border: "1px solid black" }}
				/>
		</DndContext>
	);
};

export default ChessBoard;
