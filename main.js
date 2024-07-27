import "./style.css";
import { Homepage } from "./homepage";

document.addEventListener("DOMContentLoaded", () => {
  const homepageWrapper = document.querySelector(".homepage");

  if (homepageWrapper) {
    new Homepage({ wrapSelector: ".homepage" });
  }
});
