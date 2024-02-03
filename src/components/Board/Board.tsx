import { useGameContext } from "../../Contexts/GameContext";
import "./Board.css";

export function Board() {
  const { currentRow, board, word } = useGameContext();

  function Letter({
    letterPosition,
    attemtPosition,
  }: {
    letterPosition: number;
    attemtPosition: number;
  }) {
    const value = board[attemtPosition][letterPosition];
    const correct = word[letterPosition] === value;
    const present = !correct && value !== "" && word.includes(value);
    /* const absent =
      !correct && !present && value !== "" && !word.includes(value); */
    const id = attemtPosition.toString() + letterPosition.toString();

    const state =
      (currentRow > attemtPosition &&
        (correct ? "correct" : present ? "present" : "absent")) ||
      (value === "" ? "" : "active");

    return (
      <div className={"letter " + state} id={id}>
        {value}
      </div>
    );
  }

  return (
    <div className="Board">
      <div className="row" id="0">
        <Letter letterPosition={0} attemtPosition={0} />
        <Letter letterPosition={1} attemtPosition={0} />
        <Letter letterPosition={2} attemtPosition={0} />
        <Letter letterPosition={3} attemtPosition={0} />
        <Letter letterPosition={4} attemtPosition={0} />
      </div>
      <div className="row" id="1">
        <Letter letterPosition={0} attemtPosition={1} />
        <Letter letterPosition={1} attemtPosition={1} />
        <Letter letterPosition={2} attemtPosition={1} />
        <Letter letterPosition={3} attemtPosition={1} />
        <Letter letterPosition={4} attemtPosition={1} />
      </div>
      <div className="row" id="2">
        <Letter letterPosition={0} attemtPosition={2} />
        <Letter letterPosition={1} attemtPosition={2} />
        <Letter letterPosition={2} attemtPosition={2} />
        <Letter letterPosition={3} attemtPosition={2} />
        <Letter letterPosition={4} attemtPosition={2} />
      </div>
      <div className="row" id="3">
        <Letter letterPosition={0} attemtPosition={3} />
        <Letter letterPosition={1} attemtPosition={3} />
        <Letter letterPosition={2} attemtPosition={3} />
        <Letter letterPosition={3} attemtPosition={3} />
        <Letter letterPosition={4} attemtPosition={3} />
      </div>
      <div className="row" id="4">
        <Letter letterPosition={0} attemtPosition={4} />
        <Letter letterPosition={1} attemtPosition={4} />
        <Letter letterPosition={2} attemtPosition={4} />
        <Letter letterPosition={3} attemtPosition={4} />
        <Letter letterPosition={4} attemtPosition={4} />
      </div>
      <div className="row" id="5">
        <Letter letterPosition={0} attemtPosition={5} />
        <Letter letterPosition={1} attemtPosition={5} />
        <Letter letterPosition={2} attemtPosition={5} />
        <Letter letterPosition={3} attemtPosition={5} />
        <Letter letterPosition={4} attemtPosition={5} />
      </div>
    </div>
  );
}
