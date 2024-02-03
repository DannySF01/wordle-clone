import { createContext, useContext, useState } from "react";
import useWordList from "../hooks/useWordList";

interface IGameContext {
  currentPosition: number;
  currentRow: number;
  board: string[][];
  wordSet: Set<string> | undefined;
  word: string;
  stats: {
    played: number;
    wins: number;
    losses: number;
    streak: number;
    maxStreak: number;
  };
  result: string;
  showStats: boolean;
  absentLetters: string[];
  correctLetters: string[];
  presentLetters: string[];
  errorMessage: string;
  addToBoard: (key: string) => void;
  addToAbsentLetters: (key: string) => void;
  addToCorrectLetters: (key: string) => void;
  addToPresentLetters: (key: string) => void;
  deleteFromBoard: () => void;
  checkWord: () => void;
  setShowStats: (value: boolean) => void;
  setResult: (value: string) => void;
  setErrorMessage: (value: string) => void;
}
const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<string>("");
  const [showStats, setShowStats] = useState(false);
  const stats = JSON.parse(localStorage.getItem("stats")!) || {
    played: 0,
    wins: 0,
    losses: 0,
    streak: 0,
    maxStreak: 0,
  };

  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);

  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [presentLetters, setPresentLetters] = useState<string[]>([]);

  const { wordSet, word } = useWordList();
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const row = document.getElementById(currentRow.toString());
  const ANIMATION_DELAY = 500;
  const WIN_DELAY = 500;
  const PAINT_KEYS_DELAY = 500;

  function addToAbsentLetters(key: string) {
    setAbsentLetters((absentLetters) => [...absentLetters, key]);
  }

  function addToCorrectLetters(key: string) {
    setCorrectLetters((correctLetters) => [...correctLetters, key]);
  }

  function addToPresentLetters(key: string) {
    setPresentLetters((presentLetters) => [...presentLetters, key]);
  }

  function checkWord() {
    if (currentPosition > 5) return;
    if (currentRow > 5) return;

    const guessedWord = board[currentRow].join("");

    if (guessedWord.length < 5) {
      row?.classList.add("shake");
      setErrorMessage("Not enough letters");
      setTimeout(() => {
        row?.classList.remove("shake");
        setErrorMessage("");
      }, ANIMATION_DELAY);
      return;
    }

    if (!wordSet) {
      return;
    }

    if (!wordSet.has(guessedWord.toLowerCase())) {
      row?.classList.add("shake");
      setErrorMessage("Not a valid word");
      setTimeout(() => {
        row?.classList.remove("shake");
        setErrorMessage("");
      }, ANIMATION_DELAY);
      return;
    }

    setTimeout(() => {
      board[currentRow].forEach((value, index) => {
        if (value !== word[index] && !word.includes(value)) {
          addToAbsentLetters(value);
        }
        if (value === word[index]) {
          addToCorrectLetters(value);
        }
        if (value !== word[index] && word.includes(value)) {
          addToPresentLetters(value);
        }
      });

      if (currentRow === 5) {
        localStorage.setItem(
          "stats",
          JSON.stringify({
            ...stats,
            played: stats.played + 1,
            losses: stats.losses + 1,
            streak: 0,
          })
        );
        setResult("LOSE");
      }
      if (word === guessedWord) {
        localStorage.setItem(
          "stats",
          JSON.stringify({
            ...stats,
            played: stats.played + 1,
            wins: stats.wins + 1,
            streak: stats.streak + 1,
            maxStreak:
              stats.streak >= stats.maxStreak
                ? stats.streak + 1
                : stats.maxStreak,
          })
        );
        setTimeout(() => {
          setResult("WIN");
        }, WIN_DELAY);
      }
    }, PAINT_KEYS_DELAY);

    setCurrentRow(currentRow + 1);
    setCurrentPosition(0);
  }

  function addToBoard(key: string) {
    if (currentRow > 5) return;
    if (currentPosition > 4) return;
    setBoard((board: string[][]) => {
      const newBoard = [...board];
      board[currentRow][currentPosition] = key;
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

  const gameValues = {
    currentRow,
    currentPosition,
    addToAbsentLetters,
    addToCorrectLetters,
    addToPresentLetters,
    board,
    setBoard,
    setCurrentPosition,
    setCurrentRow,
    wordSet,
    word,
    absentLetters,
    correctLetters,
    presentLetters,
    checkWord,
    deleteFromBoard,
    addToBoard,
    errorMessage,
    setErrorMessage,
    setShowStats,
    showStats,
    setResult,
    stats,
    result,
  };

  return (
    <GameContext.Provider value={gameValues}>{children}</GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};
