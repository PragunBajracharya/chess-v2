export const pieceClassList = [
    "wp",
    "br",
    "wr",
    "bp",
    "bn",
    "wn",
    "bb",
    "wb",
    "bq",
    "wq",
    "bk",
    "wk"
];

export const getChessNotation = (row, col) => {
    const files = "abcdefgh";
    return `${files[col]}${8 - row}`;
};