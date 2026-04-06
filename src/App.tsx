import "./App.css";
import { KeyBoard } from "./components/KeyBoard/KeyBoard";
import { Board } from "./components/Board/Board";
import { GameResult } from "./components/GameResult/GameResult";

import Toast from "./components/Toast/Toast";
import Header from "./components/Header/Header";
import { useGameContext } from "./contexts/GameContext";
import Statistics from "./components/Statistics/Statistics";

function App() {
  const { word, result, showStats, setShowStats, stats, errorMessage } =
    useGameContext();

  return (
    <div className="App-Container">
      <Header />
      {result && <GameResult currentWord={word} result={result} />}
      {showStats && <Statistics stats={stats} setShowStats={setShowStats} />}

      <div className="App">
        {errorMessage && <Toast message={errorMessage} />}
        <Board />
        <KeyBoard />
      </div>
    </div>
  );
}

export default App;
