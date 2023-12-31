import "./GameResult.css";

export function GameResult({
  currentWord,
  result,
}: {
  currentWord: string;
  result: string;
}) {
  return (
    <div className="GameResult">
      <div>Right Word: {currentWord}</div>
      <div>Result: {result}</div>
      <button className="play-again" onClick={() => window.location.reload()}>
        Play Again
      </button>
    </div>
  );
}
