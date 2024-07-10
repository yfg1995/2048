import './style.css';

const gridSize = 4;

const getRandomCell = () => {
  return Math.floor(Math.random() * gridSize) + 1;
};

const grid = document.querySelector('.grid');

for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    row.appendChild(cell);
  }

  grid.appendChild(row);
}
const grid = [];

const generateGrid = (gridSize) => {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {}
  }
};
