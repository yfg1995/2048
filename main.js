import "./style.css";
import { GridInit } from "./gridInit";
import { Slider } from "./slider";

new Slider();
const newGrid = new GridInit({ wrapSelector: ".grid", gridSize: 5 });
window.grid = newGrid;

// const newGameButton = document.querySelector("#newGameBtn");
// const menuButton = document.querySelector(".menu-button");
// const game = document.querySelector("#game");
// const homepage = document.querySelector("#homepage");
