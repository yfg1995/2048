export class Slider {
  constructor(parent) {
    this.parent = parent;
    this.slides = document.querySelector(".slides");
    this.slideImages = document.querySelectorAll(".slide");
    this.leftArrow = document.querySelector(".left-arrow");
    this.rightArrow = document.querySelector(".right-arrow");
    this.totalSlides = this.slideImages.length;
    this.currentIndex = 0;
    this.showSlide(this.currentIndex);
    this.listeners();
  }

  showSlide(index) {
    this.slides.style.transform = `translateX(${-index * 100}%)`;
    this.updateArrows();
  }

  updateArrows() {
    if (this.currentIndex === 0) {
      this.leftArrow.disabled = true;
      this.leftArrow.style.cursor = "default";
    } else {
      this.leftArrow.disabled = false;
      this.leftArrow.style.cursor = "pointer";
    }

    if (this.currentIndex === this.totalSlides - 1) {
      this.rightArrow.disabled = true;
      this.rightArrow.style.cursor = "default";
    } else {
      this.rightArrow.disabled = false;
      this.rightArrow.style.cursor = "pointer";
    }
  }

  // handleLeftArrowClick() {
  //   if (this.currentIndex > 0) {
  //     this.currentIndex--;
  //     this.parent.gridSize = this.currentIndex + 3;
  //     this.showSlide(this.currentIndex);
  //   }
  // }

  // handleRightArrowClick() {
  //   if (this.currentIndex < this.totalSlides - 1) {
  //     this.currentIndex++;
  //     this.parent.gridSize = this.currentIndex + 3;
  //     this.showSlide(this.currentIndex);
  //   }
  // }

  listeners() {
    this.leftArrow.addEventListener("click", () => {
      if (this.currentIndex < this.totalSlides - 1) {
        this.currentIndex++;
        this.parent.gridSize = this.currentIndex + 3;
        this.showSlide(this.currentIndex);
      }
    });
    this.rightArrow.addEventListener("click", () => {
      if (this.currentIndex < this.totalSlides - 1) {
        this.currentIndex++;
        this.parent.gridSize = this.currentIndex + 3;
        this.showSlide(this.currentIndex);
      }
    });
  }
}
