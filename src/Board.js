import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row = []
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(row)
    }
    return initialBoard;
    // TODO: create array-of-arrays of true/false values
    // return Array.from({ length: nrows })
    //   .map(row => Array.from({ length: ncols })
    //     .map(cell => Math.random() < chanceLightStartsOn))

  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(c => !c))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copyOfBoard = oldBoard.map(row => [...row])
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copyOfBoard)
      flipCell(y - 1, x, copyOfBoard)
      flipCell(y + 1, x, copyOfBoard)
      flipCell(y, x + 1, copyOfBoard)
      flipCell(y, x - 1, copyOfBoard)

      // TODO: return the copy
      return copyOfBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div>You Win!</div>
    )
  }
  // TODO

  // make table board
  //   let tblBoard = []
  //   for (let y = 0; y < nrows; y++) {
  //     let row = []
  //     for (let x = 0; x < ncols; x++) {
  //       let coords = `${y}-${x}`
  //       row.push(
  //         <Cell
  //           key={coords}
  //           isLit={board[y][x]}
  //           flipCellsAroundMe=
  //           {e => flipCellsAround(coords)} />
  //       )
  //     }
  //     tblBoard.push(<tr key={y}>{row}</tr>)
  //   }
  //   return (
  //     <table className="Board">
  //       <tbody>{tblBoard}</tbody>
  //     </table>
  //   )
  // }

  return (
    <div>
      <table className="Board">
        <tbody>
          {createBoard().map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) =>
                <Cell
                  key={`${y}-${x}`}
                  isLit={board[y][x]}
                  flipCellsAroundMe=
                  {(e => flipCellsAround(`${y}-${x}`))} />
              )}
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}
Board.defaultProps = {
  nrows: 5,
  ncols: 5,
  chanceLightStartsOn: 0.3
}

export default Board;
