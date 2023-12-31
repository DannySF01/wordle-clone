import { useEffect } from "react";
import "./KeyBoard.css";

export function KeyBoard({
  addToBoard,
  deleteFromBoard,
  checkWord,
  absentLetters,
  correctLetters,
  presentLetters,
}: {
  addToBoard: (key: string) => void;
  deleteFromBoard: () => void;
  checkWord: () => void;
  absentLetters: string[];
  correctLetters: string[];
  presentLetters: string[];
}) {
  const firstRow = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]];
  const secondRow = [["A", "S", "D", "F", "G", "H", "J", "K", "L"]];
  const thirdRow = [["Z", "X", "C", "V", "B", "N", "M"]];

  function Key({ value }: { value: string }) {
    const id = absentLetters.includes(value)
      ? "absent"
      : correctLetters.includes(value)
      ? "correct"
      : presentLetters.includes(value)
      ? "present"
      : "";

    return (
      <button className="key" id={id} onClick={() => addToBoard(value)}>
        {value}
      </button>
    );
  }

  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      deleteFromBoard();
    } else if (event.key === "Enter") {
      checkWord();
    } else {
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        addToBoard(key);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="KeyBoard">
      <div className="row">
        {firstRow.map((row) => {
          return row.map((value) => {
            return <Key key={value} value={value} />;
          });
        })}
      </div>
      <div className="row">
        {secondRow.map((row) => {
          return row.map((value) => {
            return <Key key={value} value={value} />;
          });
        })}
      </div>

      <div className="row">
        <button className="key functional" onClick={checkWord}>
          Enter
        </button>
        {thirdRow.map((row) => {
          return row.map((value) => {
            return <Key key={value} value={value} />;
          });
        })}
        <button
          className="key functional"
          id="delete"
          onClick={deleteFromBoard}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
