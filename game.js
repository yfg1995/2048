import { createHTMLElement } from "./helpers";
import { GridInit } from "./gridInit";
import { Homepage } from "./homepage";

export class Game {
  constructor({ wrapSelector, slider }) {
    this.wrap = document.querySelector(wrapSelector);
    this.wrapSelector = wrapSelector;
    this.slider = slider;
    this.gridSize = this.slider.gridSize;
    this.init();
  }

  createGameHTML() {
    this.grid = new GridInit({
      wrapSelector: this.wrapSelector,
      slider: this.slider,
    });

    const header = createHTMLElement("div", { className: "header" });

    const menuButton = createHTMLElement("button", {
      className: "button menu-button",
      textContent: "Back to menu",
    });
    header.appendChild(menuButton);

    this.wrap.appendChild(header);
  }

  listeners() {
    this.menuButton = document.querySelector(".menu-button");

    this.menuButton.addEventListener("click", () => {
      this.wrap.innerHTML = "";
      new Homepage({ wrapSelector: this.wrapSelector });
    });
  }

  init() {
    this.createGameHTML();
    this.listeners();
  }
}
