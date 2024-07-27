import { createGrid, createHTMLElement, generateGrid } from "./helpers";

export class Slider {
  constructor({ wrapSelector }) {
    this.wrap = document.querySelector(wrapSelector);
    this.gridSize = 3;
    this.currentIndex = 0;
    this.totalSlides = 3;
    this.createSliderHTML();
    this.listeners();
  }

  updateArrows() {
    this.leftArrow.disabled = this.currentIndex === 0;
    this.leftArrow.style.cursor =
      this.currentIndex === 0 ? "default" : "pointer";

    this.rightArrow.disabled = this.currentIndex === this.totalSlides - 1;
    this.rightArrow.style.cursor =
      this.currentIndex === this.totalSlides - 1 ? "default" : "pointer";
  }

  showSlide(index) {
    this.slides.style.transform = `translateX(${-index * 100}%)`;
    this.updateArrows();
  }

  createSliderHTML() {
    const slider = createHTMLElement("div", { className: "slider" });

    this.wrap.appendChild(slider);

    this.slides = createHTMLElement("div", { className: "slides" });
    slider.appendChild(this.slides);

    this.leftArrow = createHTMLElement("button", {
      className: "arrow left-arrow",
      innerHTML: "&#9664;",
    });

    this.rightArrow = createHTMLElement("button", {
      className: "arrow right-arrow",
      innerHTML: "&#9654;",
    });

    this.wrap.append(this.leftArrow, this.rightArrow);

    this.createGridSlidesHTML();
  }

  createGridSlidesHTML() {
    for (let i = 0; i < this.totalSlides; i++) {
      const slide = createHTMLElement("div", {
        className: "slide",
      });

      this.slides.appendChild(slide);
      this.showSlide(this.currentIndex);

      const grid = createHTMLElement("div", {
        className: "homepage-grid",
      });

      createGrid(generateGrid(i + this.gridSize), i + this.gridSize, grid);

      const gridText = createHTMLElement("div", {
        className: "homepage-grid-text",
        textContent: `${i + this.gridSize} x ${i + this.gridSize}`,
      });

      slide.appendChild(grid);
      grid.appendChild(gridText);
    }

    this.slideImages = document.querySelectorAll(".slide");
    this.showSlide(this.currentIndex);
  }

  listeners() {
    this.leftArrow.addEventListener("click", () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.showSlide(this.currentIndex);
      }
    });

    this.rightArrow.addEventListener("click", () => {
      if (this.currentIndex < this.totalSlides - 1) {
        this.currentIndex++;
        this.showSlide(this.currentIndex);
      }
    });
  }
}
