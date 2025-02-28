const MoveHistory = ({ moves }) => {
    return (
      <div style={{ marginLeft: '20px', maxWidth: '250px' }}>
        <h3>Move History</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {moves.map((move, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>Move {index + 1}:</strong>
              <p>{`${move.piece} moved from (${move.from.row}, ${move.from.col}) to (${move.to.row}, ${move.to.col})`}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MoveHistory;
  