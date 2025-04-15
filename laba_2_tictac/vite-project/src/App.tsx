import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type SquareValue = 'X' | 'O' | null;

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  highlight: boolean;
}

function Square({ value, onClick, highlight }: SquareProps) {
  const textColor = value === 'X' ? 'text-danger' : 'text-primary';
  const highlightClass = highlight ? 'bg-warning-subtle border-warning' : '';

  return (
    <button
      className={`btn border fs-1 fw-bold w-100 h-100 ${textColor} ${highlightClass}`}
      style={{ aspectRatio: '1 / 1' }}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

function Board({ squares, onClick, winningLine }: BoardProps) {
  const renderSquare = (i: number) => {
    const isWinning = winningLine?.includes(i) ?? false;
    return (
      <div className="col p-1" key={i}>
        <Square
          value={squares[i]}
          onClick={() => onClick(i)}
          highlight={isWinning}
        />
      </div>
    );
  };

  const rows = [0, 1, 2].map(row => (
    <div className="row" key={row}>
      {Array(3)
        .fill(null)
        .map((_, col) => renderSquare(row * 3 + col))}
    </div>
  ));

  return <div className="">{rows}</div>;
}

function App() {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? null;

  const handleClick = (i: number) => {
    if (currentSquares[i] || winner) return;

    const nextSquares = [...currentSquares];
    nextSquares[i] = xIsNext ? 'X' : 'O';

    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([...nextHistory, nextSquares]);
    setCurrentMove(nextHistory.length);
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const status = winner
    ? `Победитель: ${winner}`
    : currentMove === 9
    ? 'Ничья!'
    : `Ход: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Крестики-Нолики</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <Board squares={currentSquares} onClick={handleClick} winningLine={winningLine} />
        </div>
        <div className="col-md-4">
          <div className="mb-3 h4">{status}</div>
          <ul className="list-group mb-3">
            {history.map((_, move) => (
              <li key={move} className="list-group-item p-1">
                <button
                  className="btn btn-outline-secondary btn-sm w-100"
                  onClick={() => jumpTo(move)}
                >
                  {move === 0 ? 'К началу' : `Ход #${move}`}
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-danger w-100" onClick={resetGame}>
            Сбросить игру
          </button>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares: SquareValue[]): { winner: SquareValue; line: number[] } | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
    [0, 4, 8], [2, 4, 6],            // диагонали
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return null;
}

export default App;
