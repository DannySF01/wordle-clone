import "./GameResult.css";

export function GameResult({
  currentWord,
  result,
}: {
  currentWord: string;
  result: string;
}) {
  function getResult() {
    switch (result) {
      case "win":
        return "You Win!";
      case "lose":
        return "You Lost!";
      default:
        return "No Result Yet";
    }
  }

  return (
    <div className="GameResult">
      <h2 className="result-title" id={result}>
        {getResult()}
      </h2>
      <div className="right-word">Right Word: {currentWord}</div>
      <button className="play-again" onClick={() => window.location.reload()}>
        Play Again
      </button>
    </div>
  );
}
