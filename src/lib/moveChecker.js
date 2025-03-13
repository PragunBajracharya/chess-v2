export const isValidMove = (turn, selectedPieceClass, from, to, board) => {
    switch (selectedPieceClass) {
        case "wp":
        case "bp":
            return isValidPawnMove(turn, from, to, board);
        case "wr":
        case "br":
            return isValidRookMove(from, to, board);
        case "wb":
        case "bb":
            return isValidBishopMove(from, to, board);
        case "wq":
        case "bq":
            return isValidQueenMove(from, to, board);
    }
}

export const isValidPawnMove = (turn, from, to, board) => {

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

export const isValidRookMove = (from, to, board) => {
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

    return true;
}

export const isValidBishopMove = (from, to, board) => {
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

export const isValidQueenMove = (from, to, board) => {
    if (from.row === to.row || from.col === to.col) {
        return isValidRookMove(from, to, board);
    }

    if (Math.abs(to.row - from.row) === Math.abs(to.col - from.col)) {
        return isValidBishopMove(from, to, board);
    }

    return false;
}