export const twoOrFour = () => {
  return Math.random() >= 0.5 ? 2 : 4;
};

export const createHTMLElement = (tag, props) => {
  const element = document.createElement(tag);
  Object.keys(props).forEach((prop) => {
    element[prop] = props[prop];
  });
  return element;
};

export const generateGrid = (gridSize) => {
  const grid = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      grid.push({ row, col, index: col + row * gridSize, value: 0 });
    }
  }
  return grid;
};

export const createBGVar = (gridSize) => {
  let variable = "";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      variable += `calc(var(--cell-size) * ${col}) calc(var(--cell-size) * ${row}) 0 0 var(--cell-bg-clr), `;
    }
  }

  return variable.slice(0, -2);
};

export const groupCells = (grid, gridSize) => {
  const rows = [];
  const cols = [];

  Array.from({ length: gridSize }).forEach((_, i) => {
    rows.push(grid.filter((cell) => cell.row === i));
    cols.push(grid.filter((cell) => cell.col === i));
  });

  return { rows, cols };
};

export const createGrid = (grid, gridSize, gridWrap) => {
  gridWrap.style.setProperty("--grid-size", gridSize);
  gridWrap.style.setProperty("--bg-pattern", createBGVar(gridSize));

  return grid;
};

export const gridIsFilled = (grid) => grid.every((cell) => cell.value !== 0);

export const removeZeros = (cells) => {
  return [...cells].filter((cell) => cell.value !== 0);
};

export const sumCells = (cells) => {
  const newCells = [...cells];

  for (let i = 0; i < newCells.length - 1; i++) {
    if (newCells[i].value === newCells[i + 1].value) {
      newCells[i].value *= 2;
      newCells[i + 1].value = 0;
    }
  }

  return removeZeros(newCells);
};

export const restoreZeros = (cells, gridSize) => {
  return [
    ...cells,
    ...Array.from({ length: gridSize - cells.length }, () => ({ value: 0 })),
  ];
};

export const mirror = (cells) => {
  return [...cells].reverse();
};

class MenuToggle {
  constructor() {
    this.menu = document.querySelector(".menu");
    this.toogle = this.menu.querySelector(".toggle");
    this.handleMenuOpen();
  }

  handleMenuOpen() {
    this.handle();
  }

  handle() {
    this.menuItems = [];
    this.menuItems.push(new MenuItem());
  }
}

class MenuItem {
  constructor(parent) {
    this.parent = parent;
    this.menu = document.querySelector(".menu");
    this.toogle = this.menu.querySelector(".toggle");
    this.handleMenuOpen();
  }

  handleMenuOpen() {
    this.menuItem = null;
  }

  handle() {
    console.log(this.menuItem);
  }
}

new MenuToggle();
