import {
  createGrid,
  createHTMLElement,
  generateGrid,
  gridIsFilled,
  groupCells,
  mirror,
  removeZeros,
  restoreZeros,
  sumCells,
  twoOrFour,
} from "./helpers";
import "./style.css";

class Grid {
  constructor({ wrapSelector, gridSize }) {
    this.gridWrap = document.querySelector(wrapSelector);
    this.gridSize = gridSize;
    this.init();
  }

  moveCells(direction, colsOrRows) {
    const newColsOrRows = [...colsOrRows];
    switch (direction) {
      case "up":
        // COLS
        newColsOrRows.forEach((col) => {
          const sumValues = restoreZeros(
            sumCells(removeZeros(col)),
            this.gridSize
          );

          col.forEach((cell, i) => {
            sumValues[i] = { ...cell, value: sumValues[i].value };
          });
          console.log({
            moveCellsUP: sumValues,
          });
        });
      case "down":
        // COLS
        newColsOrRows.forEach((col) => {
          const sumValues = mirror(
            restoreZeros(sumCells(removeZeros(mirror(col))), this.gridSize)
          );

          col.forEach((cell, i) => {
            sumValues[i] = { ...cell, value: sumValues[i].value };
          });
          console.log({
            moveCellsDOWN: sumValues,
          });
        });
      case "left":
        // ROWS
        newColsOrRows.forEach((row) => {
          const sumValues = restoreZeros(
            sumCells(removeZeros(row)),
            this.gridSize
          );

          row.forEach((cell, i) => {
            sumValues[i] = { ...cell, value: sumValues[i].value };
          });
          console.log({
            moveCellsLEFT: sumValues,
          });
        });
      case "right":
        // ROWS
        newColsOrRows.forEach((row) => {
          const sumValues = mirror(
            restoreZeros(sumCells(removeZeros(mirror(row))), this.gridSize)
          );

          row.forEach((cell, i) => {
            sumValues[i] = { ...cell, value: sumValues[i].value };
          });
          console.log({
            moveCellsRIGHT: sumValues,
          });
        });
      default:
        break;
    }

    // return [...this.grid, newColsOrRows.flat()];
  }

  listeners() {
    document.body.addEventListener("keydown", (e) => {
      const { rows, cols } = groupCells(this.grid, this.gridSize);

      switch (e.key) {
        case "ArrowUp":
          this.grid = this.moveCells("up", cols);
        case "ArrowDown":
          this.grid = this.moveCells("down", cols);
        case "ArrowLeft":
          this.grid = this.moveCells("left", rows);
        case "ArrowRight":
          this.grid = this.moveCells("right", rows);
        default:
          break;
      }

      // this.pickRandomCell()

      console.log({ FINISHED: this.grid });
    });
  }

  pickRandomCell() {
    const newGrid = [...this.grid];

    if (gridIsFilled(newGrid)) {
      return newGrid;
    }
    const randomCell = newGrid.filter(
      (c) => c.index === Math.floor(Math.random() * newGrid.length)
    )[0];

    if (randomCell?.value === 0) {
      randomCell.value = twoOrFour();

      this.gridWrap.appendChild(
        createHTMLElement("div", {
          className: "cell",
          style: `--row: ${randomCell.row}; --col: ${randomCell.col}`,
          textContent: randomCell.value,
        })
      );

      return randomCell;
    } else {
      return this.pickRandomCell(newGrid);
    }
  }

  initGridState() {
    for (let i = 0; i < Math.floor(this.grid.length * 0.5); i++) {
      this.pickRandomCell(this.grid, this.gridWrap);
    }
  }

  init() {
    this.grid = createGrid(
      generateGrid(this.gridSize),
      this.gridSize,
      this.gridWrap
    );
    this.initGridState();
    this.listeners();
  }
}

const classGrid = new Grid({ wrapSelector: ".grid", gridSize: 4 });
window.grid = classGrid;
