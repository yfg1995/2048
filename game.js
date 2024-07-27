import { createHTMLElement } from "./helpers";
import { GridInit } from "./gridInit";

export class Game {
  constructor({ wrapSelector, slider }) {
    this.wrap = document.querySelector(wrapSelector);
    this.wrapSelector = wrapSelector;
    this.slider = slider;
    this.gridSize = this.slider.gridSize;
    this.init();
  }

  createGameHTML() {
    const header = createHTMLElement("div", { className: "header" });
    this.wrap.appendChild(header);

    const score = createHTMLElement("div", {
      className: "score",
      textContent: "Score:",
    });
    const menuButton = createHTMLElement("button", {
      className: "button menu-button",
      textContent: "Back to menu",
    });
    header.appendChild(score);
    header.appendChild(menuButton);

    const grid = createHTMLElement("div", { className: "grid" });
    this.wrap.appendChild(grid);

    this.grid = new GridInit({
      wrapSelector: this.wrapSelector,
      slider: this.slider,
    });
  }

  listeners() {
    this.menuButton = document.querySelector(".menu-button");
    this.menuButton.addEventListener("click", () => {
      console.log("first");
    });
  }

  init() {
    this.createGameHTML();
  }
}
