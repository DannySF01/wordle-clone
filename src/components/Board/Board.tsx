import { memo } from "react";
import { useGameContext } from "../../contexts/GameContext";
import "./Board.css";

interface LetterProps {
  letter: string;
  state: string;
  isRevealed: boolean;
  isJustRevealed: boolean;
  letterPosition: number;
  id: string;
}

const Letter = memo(
  ({
    letter,
    state,
    isRevealed,
    isJustRevealed,
    letterPosition,
    id,
  }: LetterProps) => {
    return (
      <div
        className={`letter ${state} ${isRevealed ? "reveal" : ""}`}
        id={id}
        style={{
          animationDelay: isJustRevealed ? `${letterPosition * 150}ms` : "0ms",
        }}
      >
        {letter}
      </div>
    );
  },
);

export function Board() {
  const { currentRow, board, word } = useGameContext();

  const STATES = {
    CORRECT: "correct",
    PRESENT: "present",
    ABSENT: "absent",
    ACTIVE: "active",
  };

  return (
    <div className="Board">
      {board.map((row, attemtPosition) => (
        <div
          className="row"
          key={attemtPosition}
          id={attemtPosition.toString()}
        >
          {row.map((_, letterPosition) => {
            const letter = board[attemtPosition][letterPosition];
            const isRevealed = currentRow > attemtPosition;
            const isJustRevealed = currentRow === attemtPosition + 1;

            const correct = word[letterPosition] === letter;
            const present = !correct && letter !== "" && word.includes(letter);

            const state = isRevealed
              ? correct
                ? STATES.CORRECT
                : present
                  ? STATES.PRESENT
                  : STATES.ABSENT
              : letter === ""
                ? ""
                : STATES.ACTIVE;

            return (
              <Letter
                key={`${attemtPosition}-${letterPosition}`}
                letter={letter}
                state={state}
                isRevealed={isRevealed}
                isJustRevealed={isJustRevealed}
                letterPosition={letterPosition}
                id={attemtPosition.toString() + letterPosition.toString()}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
