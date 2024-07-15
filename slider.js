const slides = document.querySelector(".slides");
const slideImages = document.querySelectorAll(".slide");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let currentIndex = 0;
const totalSlides = slideImages.length;

function showSlide(index) {
  slides.style.transform = `translateX(${-index * 100}%)`;
  updateArrows();
}

function updateArrows() {
  if (currentIndex === 0) {
    leftArrow.disabled = true;
    leftArrow.style.cursor = "default";
  } else {
    leftArrow.disabled = false;
    leftArrow.style.cursor = "pointer";
  }

  if (currentIndex === totalSlides - 1) {
    rightArrow.disabled = true;
    rightArrow.style.cursor = "default";
  } else {
    rightArrow.disabled = false;
    rightArrow.style.cursor = "pointer";
  }
}

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
  }
});

rightArrow.addEventListener("click", () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    showSlide(currentIndex);
  }
});

showSlide(currentIndex);
