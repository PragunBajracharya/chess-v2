'use client';

const Piece = () => {
  const pieceImages = {
    bp: '/pieces/bp.png',
    wp: '/pieces/wp.png',
    br: '/pieces/br.png',
    wr: '/pieces/wr.png',
    bn: '/pieces/bn.png',
    wn: '/pieces/wn.png',
    bb: '/pieces/bb.png',
    wb: '/pieces/wb.png',
    bq: '/pieces/bq.png',
    wq: '/pieces/wq.png',
    bk: '/pieces/bk.png',
    wk: '/pieces/wk.png',
  };

  const initialPieces = [
    { img: new Image(), x: 0, y: 0, type: 'br' },
    { img: new Image(), x: 1, y: 0, type: 'bn' },
  ];

  initialPieces.forEach((piece) => {
    piece.img.src = pieceImages[piece.type];
  });

  return initialPieces;
};

export default Piece;