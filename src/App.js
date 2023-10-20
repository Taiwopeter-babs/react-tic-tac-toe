import { useState } from "react";

function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  let statusDiv;

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [status, setStatus] = useState('');

  function handleClick(idx) {
    if (squares[idx]) {
      return;
    }
    const nextSquares = squares.slice();

    if (calculateWinner(nextSquares)) {
      setStatus(calculateWinner(nextSquares));
      setSquares(Array(9).fill(null));
      return;
    }
    nextSquares[idx] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // no winner and no box is empty
    if (!calculateWinner(nextSquares) && nextSquares.indexOf(null) === -1) {
      setSquares(Array(9).fill(null));
      setStatus(calculateWinner(nextSquares))
      return;
    }
    // winner and player clicks on any box
    if (calculateWinner(nextSquares) && squares.indexOf(null) >= 0) {
      setStatus(calculateWinner(nextSquares));
      return;
    }
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setStatus('');
  }

  return (

    <section className="game">

      <div className="winner">
        {status ? `${status} WINS` : ''}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button className="restart-game" onClick={handleRestart}>RESTART</button>
    </section>
  )
}

function calculateWinner(array) {
  let idx;
  let val;
  // for rows || horizontal traversal
  for (let i = 0; i < array.length; i += 3) {
    const [idx, val] = isConsistent(array, i, 1);
    if (val) {
      return array[idx];
    }
  }

  // for columns || vertical traversal
  for (let i = 0; i < 3; i += 1) {
    [idx, val] = isConsistent(array, i, 3);
    if (val) {
      return array[idx];
    }
  }
  // diagonal left
  [idx, val] = isConsistent(array, 2, 2);
  if (val) {
    return array[idx];
  }
  // diagonal right
  [idx, val] = isConsistent(array, 0, 4);
  if (val) {
    return array[idx];
  }

  return null;
}


function isConsistent(array, idx, step) {
  let i;
  let count = 0;

  for (i = idx; count <= 2; i += step) {

    if (count === 2) {
      if (array[i] && (array[i] === array[i - step])) {
        return [idx, true];
      } else {
        break;
      }
    }
    if (array[i] && array[i] !== array[i + step]) {
      return [null, false]
    }
    count += 1;
  }
  return [null, false];

}