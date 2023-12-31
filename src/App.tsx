import { useEffect, useState } from "react";
import "./App.css";
import wordBank_uk from "./wordle-bank.txt";
import wordBank_pt from "./wordle-pt.txt";
import { KeyBoard } from "./components/KeyBoard/KeyBoard";
import { Board } from "./components/Board/Board";
import { GameResult } from "./components/GameResult/GameResult";
import uk from "./assets/uk.png";
import pt from "./assets/pt.png";

const generateWordsSet = async (currentLanguage: string) => {
  let randomWord = "";
  let wordSet;
  let wordBank;

  if (currentLanguage === "en") {
    wordBank = wordBank_uk;
  } else {
    wordBank = wordBank_pt;
  }

  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      let words;
      if (currentLanguage === "pt") words = result.split("\r" + "\n");
      else words = result.split("\n");

      randomWord =
        words[Math.floor(Math.random() * words.length)].toUpperCase();
      wordSet = new Set(words);
    });
  return { wordSet, randomWord };
};

function App() {
  const [wordSet, setWordSet] = useState<Set<string>>();
  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [presentLetters, setPresentLetters] = useState<string[]>([]);
  const [result, setResult] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

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
    generateWordsSet(currentLanguage).then((words) => {
      setWordSet(words.wordSet);
      setCurrentWord(words.randomWord);
    });
  }, [currentLanguage]);

  function toggleLanguage() {
    if (currentLanguage === "en") {
      setCurrentLanguage("pt");
    } else {
      setCurrentLanguage("en");
    }
  }

  function Header() {
    return (
      <div className="Header">
        <div className="languages">
          {currentLanguage === "en" && (
            <button className="language" onClick={toggleLanguage}>
              <img src={uk} alt="uk" />
            </button>
          )}
          {currentLanguage === "pt" && (
            <button className="language" onClick={toggleLanguage}>
              <img src={pt} alt="pt" />
            </button>
          )}
        </div>
        <button className="language"></button>
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

  function Toast({ message }: { message: string }) {
    return <div className="toast">{message}</div>;
  }

  const setToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    document.getElementById(currentRow.toString())?.classList.add("shake");
    setTimeout(() => {
      setShowToast(false);
      document.getElementById(currentRow.toString())?.classList.remove("shake");
    }, 1000);
  };

  function checkWord() {
    if (currentPosition > 5) return;
    if (currentRow > 5) return;

    const word = board[currentRow].join("");

    if (word.length < 5) {
      setToast("Not enough letters");
      return;
    }

    if (!wordSet) {
      return;
    }

    if (!wordSet.has(word.toLowerCase())) {
      setToast("Not a valid word");
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

    document.getElementById(currentRow.toString())?.classList.add("flip");

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
      {currentLanguage + "-" + currentWord}
      <br></br>
      {currentPosition + "-" + currentRow}
      <div className="App">
        {showToast && <Toast message={toastMessage} />}
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
