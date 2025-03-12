export const gameLogic = {
    initialBoardWhite: () => [
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

    initialBoardBlack: () => [
      [
        { type: 'rook', color: 'white', image: '/pieces/wr.png' },
        { type: 'knight', color: 'white', image: '/pieces/wn.png' },
        { type: 'bishop', color: 'white', image: '/pieces/wb.png' },
        { type: 'king', color: 'white', image: '/pieces/wk.png' },
        { type: 'queen', color: 'white', image: '/pieces/wq.png' },
        { type: 'bishop', color: 'white', image: '/pieces/wb.png' },
        { type: 'knight', color: 'white', image: '/pieces/wn.png' },
        { type: 'rook', color: 'white', image: '/pieces/wr.png' },
      ],
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
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
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
      [
        { type: 'rook', color: 'black', image: '/pieces/br.png' },
        { type: 'knight', color: 'black', image: '/pieces/bn.png' },
        { type: 'bishop', color: 'black', image: '/pieces/bb.png' },
        { type: 'king', color: 'black', image: '/pieces/bk.png' },
        { type: 'queen', color: 'black', image: '/pieces/bq.png' },
        { type: 'bishop', color: 'black', image: '/pieces/bb.png' },
        { type: 'knight', color: 'black', image: '/pieces/bn.png' },
        { type: 'rook', color: 'black', image: '/pieces/br.png' },
      ],
    ],

    getPieceBackground: (square) => {
        let typeInitial = square.type ? square.type === "knight" ? 'n' : square.type[0] : square.type[0];
        let colorInitial = square.color ? square.color[0] : '';
        return colorInitial + typeInitial;
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
  