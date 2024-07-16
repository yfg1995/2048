import { Grid } from "./grid";
import { Slider } from "./slider";

export class GridInit {
  constructor({ wrapSelector }) {
    this.newGameButton = document.querySelector("#newGameBtn");
    // this.menuButton = document.querySelector(".menu-button");
    this.wrap = document.querySelector(wrapSelector);
    this.gridSize = 3;
    this.slider = new Slider(this);
    this.init();
  }

  initGrid() {
    this.wrap.innerHTML = "";
    this.grid = new Grid({
      wrap: this.wrap,
      gridSize: this.gridSize,
    });
  }

  init() {
    this.newGameButton.addEventListener("click", () => {
      this.initGrid();
    });
  }
}
