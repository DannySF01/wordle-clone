import { useEffect, useState } from "react";
import "./App.css";
import wordBank from "./wordle-bank.txt";
import { KeyBoard } from "./components/KeyBoard/KeyBoard";
import { Board } from "./components/Board/Board";
import { GameResult } from "./components/GameResult/GameResult";

const generateWordsSet = async () => {
  let randomWord = "";
  let wordSet;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const words = result.split("\n");
      randomWord =
        words[Math.floor(Math.random() * words.length)].toLocaleUpperCase();
      wordSet = new Set(result.split("\n"));
    });
  return { wordSet, randomWord };
};

function App() {
  const [wordSet, setWordSet] = useState<Set<string>>();
  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [presentLetters, setPresentLetters] = useState<string[]>([]);
  const [result, setResult] = useState<string>("");

  const [currentWord, setCurrentWord] = useState("");

  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    generateWordsSet().then((words) => {
      setWordSet(words.wordSet);
      setCurrentWord(words.randomWord);
    });
  }, []);

  function Header() {
    return (
      <div className="Header">
        <h2>Wordle</h2>
      </div>
    );
  }

  function addToAbsentLetters(key: string) {
    setAbsentLetters((absentLetters) => [...absentLetters, key]);
  }

  function addToCorrectLetters(key: string) {
    setCorrectLetters((correctLetters) => [...correctLetters, key]);
  }

  function addToPresentLetters(key: string) {
    setPresentLetters((presentLetters) => [...presentLetters, key]);
  }

  function addToBoard(key: string) {
    if (currentRow > 5) return;
    if (currentPosition > 4) return;
    setBoard((board: string[][]) => {
      const newBoard = [...board];
      newBoard[currentRow][currentPosition] = key;
      return newBoard;
    });
    setCurrentPosition(currentPosition + 1);
  }

  function deleteFromBoard() {
    setBoard((board: string[][]) => {
      const newBoard = [...board];
      newBoard[currentRow][currentPosition - 1] = "";
      return newBoard;
    });
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  }

  function checkWord() {
    if (currentPosition > 5) return;
    if (currentRow > 5) return;

    const word = board[currentRow].join("");

    if (!wordSet) {
      return;
    }

    if (!wordSet.has(word.toLowerCase())) {
      return;
    }

    board[currentRow].forEach((value, index) => {
      if (value !== currentWord[index] && !currentWord.includes(value)) {
        addToAbsentLetters(value);
      }
      if (value === currentWord[index]) {
        addToCorrectLetters(value);
      }
      if (value !== currentWord[index] && currentWord.includes(value)) {
        addToPresentLetters(value);
      }
    });

    setCurrentRow(currentRow + 1);
    setCurrentPosition(0);

    if (currentRow === 5) {
      setResult("LOSE");
    }
    if (currentWord === word) {
      setResult("WIN");
    }
  }

  return (
    <div className="App-Container">
      <Header />

      <div className="App">
        <Board
          board={board}
          currentWord={currentWord}
          currentRow={currentRow}
        />
        <KeyBoard
          addToBoard={addToBoard}
          deleteFromBoard={deleteFromBoard}
          checkWord={checkWord}
          absentLetters={absentLetters}
          correctLetters={correctLetters}
          presentLetters={presentLetters}
        />
        {result && <GameResult currentWord={currentWord} result={result} />}
      </div>
    </div>
  );
}

export default App;
