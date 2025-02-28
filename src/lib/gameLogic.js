export const gameLogic = {
    initialBoard: () => [
      [
        { type: 'rook', color: 'black', image: '/pieces/br.png' },
        { type: 'knight', color: 'black', image: '/pieces/bn.png' },
        { type: 'bishop', color: 'black', image: '/pieces/bb.png' },
        { type: 'queen', color: 'black', image: '/pieces/bq.png' },
        { type: 'king', color: 'black', image: '/pieces/bk.png' },
        { type: 'bishop', color: 'black', image: '/pieces/bb.png' },
        { type: 'knight', color: 'black', image: '/pieces/bn.png' },
        { type: 'rook', color: 'black', image: '/pieces/br.png' },
      ],
      [
        { type: 'pawn', color: 'black', image: '/pieces/bp.png' },
        { type: 'pawn', color: 'black', image: '/pieces/bp.png' },
        { type: 'pawn', color: 'black', image: '/pieces/bp.png' },
        { type: 'pawn', color: 'black', image: '/pieces/bp.png' },
        { type: 'pawn', color: 'black', image: '/pieces/bp.png' },
        { type: 'pawn', color: 'black', image: '/pieces/bp.png' },
        { type: 'pawn', color: 'black', image: '/pieces/bp.png' },
        { type: 'pawn', color: 'black', image: '/pieces/bp.png' },
      ],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [
        { type: 'pawn', color: 'white', image: '/pieces/wp.png' }, 
        { type: 'pawn', color: 'white', image: '/pieces/wp.png' },
        { type: 'pawn', color: 'white', image: '/pieces/wp.png' },
        { type: 'pawn', color: 'white', image: '/pieces/wp.png' },
        { type: 'pawn', color: 'white', image: '/pieces/wp.png' },
        { type: 'pawn', color: 'white', image: '/pieces/wp.png' },
        { type: 'pawn', color: 'white', image: '/pieces/wp.png' },
        { type: 'pawn', color: 'white', image: '/pieces/wp.png' },
      ],
      [
        { type: 'rook', color: 'white', image: '/pieces/wr.png' },
        { type: 'knight', color: 'white', image: '/pieces/wn.png' },
        { type: 'bishop', color: 'white', image: '/pieces/wb.png' },
        { type: 'queen', color: 'white', image: '/pieces/wq.png' },
        { type: 'king', color: 'white', image: '/pieces/wk.png' },
        { type: 'bishop', color: 'white', image: '/pieces/wb.png' },
        { type: 'knight', color: 'white', image: '/pieces/wn.png' },
        { type: 'rook', color: 'white', image: '/pieces/wr.png' },
      ],
    ],
  
    drawBoard: (ctx, board) => {
      const squareSize = 60;
      if (!ctx) {
        return;
      }
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          ctx.fillStyle = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
          ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
  
          const piece = board[row][col];
          if (piece) {
            gameLogic.drawPiece(ctx, piece, col * squareSize, row * squareSize);
          }
        }
      }
    },
  
    drawPiece: (ctx, piece, x, y) => {
      const img = new Image();
      if (!piece.image) {
        return;
      }
      img.src = piece.image;
      img.onload = () => {
        ctx.drawImage(img, x, y, 60, 60);
      };
    },
  
    makeMove: (from, to, board, draggingPiece) => {
        const newBoard = [...board];
        const piece = newBoard[from.row][from.col];
        
        if (newBoard[to.row][to.col] && newBoard[to.row][to.col].color === draggingPiece.color) {
          return null; // Invalid move
        }
        newBoard[to.row][to.col] = draggingPiece; // Move the piece
        newBoard[from.row][from.col] = null; // Clear the old spot
        
        return {
          newBoard,
          piece: piece.type,
          from: from,
          to: to,
        };
    },
  };
  