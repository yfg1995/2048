import { Game } from "./game";
import { createHTMLElement } from "./helpers";
import { Slider } from "./slider";

export class Homepage {
  constructor({ wrapSelector }) {
    this.wrap = document.querySelector(wrapSelector);
    this.wrapSelector = wrapSelector;
    this.init();
  }

  createHomepageHTML() {
    this.slider = new Slider({ wrapSelector: this.wrapSelector });

    this.wrap.appendChild(
      createHTMLElement("button", {
        className: "button",
        id: "newGameBtn",
        textContent: "New Game",
      })
    );

    this.newGameButton = document.querySelector("#newGameBtn");
  }

  init() {
    this.createHomepageHTML();

    this.newGameButton.addEventListener("click", () => {
      this.wrap.innerHTML = "";
      new Game({ wrapSelector: this.wrapSelector, slider: this.slider });
    });
  }
}
