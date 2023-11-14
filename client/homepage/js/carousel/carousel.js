const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

// const carouselContainer = document.getElementById('carouselContainer');
//   let currentIndex = 0;

//   function nextSlide() {
//     currentIndex = (currentIndex + 1) % carouselContainer.children.length;
//     updateCarousel();
//   }

//   function updateCarousel() {
//     const translateValue = -currentIndex * 100 + '%';
//     carouselContainer.style.transform = 'translateX(' + translateValue + ')';
//   }

//   // Automatically slide every 3 seconds (adjust as needed)
//   setInterval(nextSlide, 3000);