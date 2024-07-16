import { Grid } from "./grid";

export class GridInit {
  constructor({ wrapSelector, gridSize }) {
    this.wrapSelector = wrapSelector;
    this.gridSize = gridSize;
    this.init();
  }

  init() {
    this.grid = new Grid({
      wrapSelector: this.wrapSelector,
      gridSize: this.gridSize,
    });
  }
}
