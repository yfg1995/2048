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

export class Grid {
  colors = {
    0: "#ccc0b3",
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc850",
    2048: "#edc850",
  };

  constructor({ wrapSelector, gridSize }) {
    this.gridWrap = document.querySelector(wrapSelector);
    this.gridSize = gridSize;
    this.init();
  }

  moveCells(direction, colsOrRows) {
    const newColsOrRows = [...colsOrRows];

    switch (direction) {
      case "up":
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
      let newGrid;

      switch (e.key) {
        case "ArrowUp":
          newGrid = this.moveCells("up", cols);
          break;
        case "ArrowDown":
          newGrid = this.moveCells("down", cols);
          break;
        case "ArrowLeft":
          newGrid = this.moveCells("left", rows);
          break;
        case "ArrowRight":
          newGrid = this.moveCells("right", rows);
          break;
        default:
          break;
      }

      this.grid = this.canMove(this.grid, newGrid);
    });
  }

  canMove(oldGrid, newGrid) {
    if (sameGrid(oldGrid, newGrid)) {
      this.grid = oldGrid;
      this.renderNewGrid();
      return this.grid;
    } else {
      this.grid = newGrid;
      this.renderNewGrid();
      this.pickRandomCell(this.grid, this.gridWrap);
      return this.grid;
    }
  }

  renderNewGrid() {
    this.gridWrap.innerHTML = "";

    this.grid.forEach((cell) => {
      if (cell.value !== 0) {
        this.createCellHTML(cell);
      }
    });
  }

  createCellHTML(cell) {
    const { row, col, value } = cell;

    this.gridWrap.appendChild(
      createHTMLElement("div", {
        className: "cell",
        style: `--row: ${row}; --col: ${col}; --bg-clr: ${this.colors[value]}`,
        textContent: value,
      })
    );
  }

  pickRandomCell() {
    const newGrid = [...this.grid];

    if (gridIsFilled(newGrid)) {
      return newGrid;
    }

    const emptyCells = newGrid.filter((cell) => cell.value === 0);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (randomCell) {
      randomCell.value = twoOrFour();
      this.createCellHTML(randomCell);
      return randomCell;
    }
  }

  initGridState() {
    for (let i = 0; i < Math.floor(this.gridSize * 0.5); i++) {
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
