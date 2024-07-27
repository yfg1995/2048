import { Grid } from "./grid";
import { createHTMLElement } from "./helpers";

export class GridInit {
  constructor({ wrapSelector, slider }) {
    this.wrap = document.querySelector(wrapSelector);
    this.slider = slider;
    this.gridSize = this.slider.gridSize;
    this.currentIndex = this.slider.currentIndex;
    this.init();
  }

  initGrid() {
    this.wrap.innerHTML = "";
    this.grid = new Grid({
      wrap: this.wrap.appendChild(
        createHTMLElement("div", {
          className: "grid",
        })
      ),
      gridSize: this.currentIndex + this.gridSize,
    });
  }

  init() {
    this.initGrid();
  }
}
