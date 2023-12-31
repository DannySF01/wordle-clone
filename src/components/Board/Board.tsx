import "./Board.css";

export function Board({
  board,
  currentWord,
  currentRow,
}: {
  board: string[][];
  currentWord: string;
  currentRow: number;
}) {
  const rows = board.map((row, rowindex) => {
    const rowItems = row.map((value, index) => {
      return (
        <Letter key={index} letterPosition={index} attemtPosition={rowindex} />
      );
    });
    return (
      <div className="row" key={rowindex}>
        {rowItems}
      </div>
    );
  });

  function Letter({
    letterPosition,
    attemtPosition,
  }: {
    letterPosition: number;
    attemtPosition: number;
  }) {
    const value = board[attemtPosition][letterPosition];
    const correct = currentWord[letterPosition] === value;
    const present = !correct && value !== "" && currentWord.includes(value);

    const id =
      (currentRow > attemtPosition &&
        (correct ? "correct" : present ? "present" : "absent")) ||
      (value === "" ? "" : "active");

    return (
      <div className="letter" id={id}>
        {value}
      </div>
    );
  }

  return <div className="Board">{rows}</div>;
}
