import "./style.css";
import {
  createGrid,
  createHTMLElement,
  generateGrid,
  gridIsFilled,
  groupCells,
  mirror,
  removeZeros,
  restoreZeros,
  sameGrid,
  sumCells,
  twoOrFour,
} from "./helpers";

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

          sumValues.forEach((sumValue, i) => {
            col[i] = { ...col[i], value: sumValue.value };
          });
        });
        break;

      case "down":
        // COLS
        newColsOrRows.forEach((col) => {
          const sumValues = mirror(
            restoreZeros(sumCells(removeZeros(mirror(col))), this.gridSize)
          );

          sumValues.forEach((sumValue, i) => {
            col[i] = { ...col[i], value: sumValue.value };
          });
        });
        break;

      case "left":
        // ROWS
        newColsOrRows.forEach((row) => {
          const sumValues = restoreZeros(
            sumCells(removeZeros(row)),
            this.gridSize
          );

          sumValues.forEach((sumValue, i) => {
            row[i] = { ...row[i], value: sumValue.value };
          });
        });
        break;

      case "right":
        // ROWS
        newColsOrRows.forEach((row) => {
          const sumValues = mirror(
            restoreZeros(sumCells(removeZeros(mirror(row))), this.gridSize)
          );

          sumValues.forEach((sumValue, i) => {
            row[i] = { ...row[i], value: sumValue.value };
          });
        });
        break;

      default:
        break;
    }

    return newColsOrRows.flat();
  }

  renderNewGrid() {
    this.gridWrap.innerHTML = "";
    this.pickRandomCell(this.grid, this.gridWrap);

    this.grid.forEach((cell) => {
      if (cell.value !== 0) {
        this.createCellHTML(cell);
      }
    });
  }

  listeners() {
    document.body.addEventListener("keydown", (e) => {
      if (
        e.key !== "ArrowUp" &&
        e.key !== "ArrowDown" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight"
      ) {
        return;
      }

      const { rows, cols } = groupCells(this.grid, this.gridSize);

      switch (e.key) {
        case "ArrowUp":
          this.grid = this.canMove(this.grid, this.moveCells("up", cols));
          break;
        case "ArrowDown":
          this.grid = this.canMove(this.grid, this.moveCells("down", cols));
          break;
        case "ArrowLeft":
          this.grid = this.canMove(this.grid, this.moveCells("left", rows));
          break;
        case "ArrowRight":
          this.grid = this.canMove(this.grid, this.moveCells("right", rows));
          break;
        default:
          break;
      }
    });
  }

  canMove(oldGrid, newGrid) {
    if (sameGrid(oldGrid, newGrid)) {
      return this.grid;
    } else {
      this.grid = newGrid;
      this.renderNewGrid();
      return this.grid;
    }
  }

  createCellHTML(cell) {
    const { row, col, value } = cell;
    this.gridWrap.appendChild(
      createHTMLElement("div", {
        className: "cell",
        style: `--row: ${row}; --col: ${col}`,
        textContent: value,
      })
    );
  }

  pickRandomCell() {
    const newGrid = [...this.grid];

    if (gridIsFilled(newGrid)) {
      return newGrid;
    }
    const randomCell = newGrid.filter(
      (cell) => cell.index === Math.floor(Math.random() * newGrid.length)
    )[0];

    if (randomCell?.value === 0) {
      randomCell.value = twoOrFour();

      this.createCellHTML(randomCell);

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

const classGrid = new Grid({ wrapSelector: ".grid", gridSize: 5 });
window.grid = classGrid;
