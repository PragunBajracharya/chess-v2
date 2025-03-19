let castlingRights = {
    whiteKingMoved: false,
    whiteRookLeftMoved: false,
    whiteRookRightMoved: false,
    blackKingMoved: false,
    blackRookLeftMoved: false,
    blackRookRightMoved: false
};

export const isValidMoveWithCheck = (turn, draggedPiece, from, to, board) => {
    let tempBoard = JSON.parse(JSON.stringify(board));;
    tempBoard[to.row][to.col] = draggedPiece;
    tempBoard[from.row][from.col] = null;
    if (isKingInCheck(turn, tempBoard)) {
        return false;
    }
    return isValidMove(turn, draggedPiece, from, to, board);
}

const isValidMove = (turn, draggedPiece, from, to, board) => {
    switch (draggedPiece.type) {
        case "pawn":
            return isValidPawnMove(turn, from, to, board);
        case "rook":
            return isValidRookMove(from, to, board);
        case "bishop":
            return isValidBishopMove(from, to, board);
        case "queen":
            return isValidQueenMove(from, to, board);
        case "knight":
            return isValidKnightMove(from, to);
        case "king" :
            return isValidKingMove(from, to, board);
        default:
            return false;
    }
}

const isValidPawnMove = (turn, from, to, board) => {

    let direction = -1;
    let startRowInitial = 6;

    if (turn === "black") {
        direction = 1;
        startRowInitial = 1;
    }
    // Single move forward
    if (to.row === from.row + direction && to.col === from.col && !board[to.row][to.col]) {
        return true;
    }
    // Double move forward from starting position

    if (from.row === startRowInitial && to.row === from.row + 2 * direction && to.col === from.col && !board[to.row][to.col]) {
        return true;
    }

    // Capturing move (diagonal)
    if (to.row === from.row + direction && Math.abs(to.col - from.col) === 1 && board[to.row][to.col]) {
        return true;
    }

    return false;
}

const isValidRookMove = (from, to, board) => {
    if (from.row !== to.row && from.col !== to.col) {
        return false;
    }

    // Determine the direction of movement
    let rowDirection = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
    let colDirection = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);

    // Check if there are any pieces in the way
    let currentRow = from.row + rowDirection;
    let currentCol = from.col + colDirection;

    while (currentRow !== to.row || currentCol !== to.col) {
        if (board[currentRow][currentCol] !== null) {
            return false; // A piece is blocking the way
        }
        currentRow += rowDirection;
        currentCol += colDirection;
    }
    updateCastlingRights(from, board);

    return true;
}

const isValidBishopMove = (from, to, board) => {
    if (Math.abs(to.row - from.row) !== Math.abs(to.col - from.col)) {
        return false;
    }

    // Determine the direction of movement
    let rowDirection = to.row > from.row ? 1 : -1;
    let colDirection = to.col > from.col ? 1 : -1;

    // Check if there are any pieces in the way
    let currentRow = from.row + rowDirection;
    let currentCol = from.col + colDirection;

    while (currentRow !== to.row || currentCol !== to.col) {
        if (board[currentRow][currentCol] !== null) {
            return false; // A piece is blocking the way
        }
        currentRow += rowDirection;
        currentCol += colDirection;
    }

    return true;
}

const isValidQueenMove = (from, to, board) => {
    if (from.row === to.row || from.col === to.col) {
        return isValidRookMove(from, to, board);
    }

    if (Math.abs(to.row - from.row) === Math.abs(to.col - from.col)) {
        return isValidBishopMove(from, to, board);
    }

    return false;
}

const isValidKnightMove = (from, to) => {
    let rowDiff = Math.abs(to.row - from.row);
    let colDiff = Math.abs(to.col - from.col);

    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

export const isValidKingMove = (from, to, board) => {
    let rowDiff = Math.abs(to.row - from.row);
    let colDiff = Math.abs(to.col - from.col);

    if (rowDiff <= 1 && colDiff <= 1) {
        return true;
    }
    // Castling
    if (rowDiff === 0 && colDiff === 2) {
        let color = board[from.row][from.col].color;
        if (to.col === 6) { // Kingside
            return canCastle(board, from, to, color, "right");
        } else if (to.col === 2) { // Queenside
            return canCastle(board, from, to, color, "left");
        }
    }

    return false;
}

const isKingInCheck = (turn, board) => {
    let kingPos = findKingPosition(board, turn);
    if (!kingPos) return false;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let piece = board[row][col];
            if (piece && piece.color !== turn) {
                if (isValidMove(turn, piece, { row, col }, kingPos, board)) {
                    return true;
                }
            }
        }
    }

    return false;
}

const findKingPosition = (board, turn) => {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] && board[row][col].type === "king" && board[row][col].color === turn) {
                return { row, col };
            }
        }
    }
    return null;
}

const canCastle = (board, from, to, turn, side) => {
    let kingPos = findKingPosition(board, turn);
    if (!kingPos) return false;
    if (turn === "white") {
        if (castlingRights.whiteKingMoved) return false;
        if (side === "left" && castlingRights.whiteRookLeftMoved) return false;
        if (side === "right" && castlingRights.whiteRookRightMoved) return false;
    } else {
        if (castlingRights.blackKingMoved) return false;
        if (side === "left" && castlingRights.blackRookLeftMoved) return false;
        if (side === "right" && castlingRights.blackRookRightMoved) return false;
    }

    // Check if spaces between king and rook are empty
    let row = (turn === "white") ? 7 : 0;
    if (side === "left") {
        for (let col = 1; col < 4; col++) {
            if (board[row][col] !== null) return false;
        }
    } else {
        for (let col = 5; col < 7; col++) {
            if (board[row][col] !== null) return false;
        }
    }

    // Check king not in check, doesn't pass through or land in check
    let kingPathCols = (side === "left") ? [4, 3, 2] : [4, 5, 6];
    for (let col of kingPathCols) {
        let tempBoard = JSON.parse(JSON.stringify(board));
        tempBoard[row][4] = null;
        tempBoard[row][col] = board[kingPos.row][kingPos.col];
        if (isKingInCheck(turn, tempBoard)) return false;
    }

    return true;
}

export const performCastling = (board, from, to) => {
    let row = from.row;
    // Kingside castling
    if (to.col === 6) {
        board[row][5] = board[row][7]; // Move rook
        board[row][7] = null;
    }
    // Queenside castling
    else if (to.col === 2) {
        board[row][3] = board[row][0];
        board[row][0] = null;
    }
}

export const updateCastlingRights = (from, board) => {
    let piece = board[from.row][from.col];
    if (!piece) return;

    if (piece.type === "king") {
        if (piece.color === "white") castlingRights.whiteKingMoved = true;
        else castlingRights.blackKingMoved = true;
    }

    if (piece.type === "rook") {
        if (piece.color === "white") {
            if (from.row === 7 && from.col === 0) castlingRights.whiteRookLeftMoved = true;
            if (from.row === 7 && from.col === 7) castlingRights.whiteRookRightMoved = true;
        } else {
            if (from.row === 0 && from.col === 0) castlingRights.blackRookLeftMoved = true;
            if (from.row === 0 && from.col === 7) castlingRights.blackRookRightMoved = true;
        }
    }
}

export const movePiece = (board, from, to) => {
    let piece = board[from.row][from.col];

    // King move & Castling
    if (piece.type === "king") {
        if (isValidKingMove(from, to, board, castlingRights)) {
            // Move king
            board[to.row][to.col] = piece;
            board[from.row][from.col] = null;

            // Handle castling rook move
            if (Math.abs(to.col - from.col) === 2) {
                performCastling(board, from, to);
            }

            // Update castling rights
            updateCastlingRights(from, board, castlingRights);

            return true;
        } else {
            return false; // Invalid king move
        }
    }
    updateCastlingRights(from, board, castlingRights);

    return true;
}