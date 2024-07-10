import "./style.css";

const gridWrap = document.querySelector(".grid");
const gridSize = 4;

const getRandomCell = () => {
  return Math.floor(Math.random() * gridSize) + 1;
};

const twoOrFour = () => {
  return Math.random() >= 0.5 ? 2 : 4;
};

const createHTMLElement = (tag, props) => {
  const element = document.createElement(tag);
  Object.keys(props).forEach((prop) => {
    element[prop] = props[prop];
  });
  return element;
};

const generateGrid = (gridSize) => {
  const grid = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      grid.push({ row, col, index: col + row * gridSize, value: 0 });
    }
  }
  return grid;
};

const createGrid = (grid) => {
  gridWrap.style.setProperty("--grid-size", gridSize);
  grid.forEach((i) => {
    const cell = createHTMLElement("div", {
      className: "cell",
    });

    cell.appendChild(
      createHTMLElement("div", {
        className: "col",
        textContent: `col: ${i.col}`,
      })
    );

    cell.appendChild(
      createHTMLElement("div", {
        className: "row",
        textContent: `row: ${i.row}`,
      })
    );

    cell.appendChild(
      createHTMLElement("div", {
        className: "index",
        textContent: `index: ${i.index}`,
      })
    );

    cell.appendChild(
      createHTMLElement("div", {
        className: "value empty",
        textContent: `value: ${i.value}`,
      })
    );

    i.domElement = cell;

    gridWrap.appendChild(cell);
  });

  return grid;
};

const grid = createGrid(generateGrid(gridSize));

const gridIsFilled = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].value === 0) {
      return false;
    }
  }
  return true;
};

const pickCell = (grid) => {
  const newGrid = [...grid];

  if (gridIsFilled(newGrid)) {
    return newGrid;
  }

  const randomCell = newGrid.filter(
    (c) => c.index === Math.floor(Math.random() * grid.length)
  )[0];

  if (randomCell?.value === 0) {
    randomCell.value = twoOrFour();
    const domValue = randomCell.domElement.querySelector(".value");
    domValue.classList.remove("empty");
    domValue.innerText = randomCell.value;
    return randomCell;
  } else {
    return pickCell(newGrid);
  }
};

const initGridState = (grid) => {
  for (let i = 0; i < Math.floor(grid.length * 0.25); i++) {
    pickCell(grid);
  }
};

initGridState(grid);

gridWrap.addEventListener("click", () => {
  pickCell(grid);
});
