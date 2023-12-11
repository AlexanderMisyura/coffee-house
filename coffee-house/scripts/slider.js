slider();

function slider() {
  const slider = document.querySelector(".slider");
  const leftBtn = slider.querySelector(".slider__btn-left");
  const rightBtn = slider.querySelector(".slider__btn-right");
  const row = slider.querySelector(".slider__active-content");

  const sliderItems = [...row.children];
  const sliderLength = row.children.length;
  let activeIndex = 0;
  let prevIndex = sliderLength - 1;
  let nextIndex = activeIndex + 1;

  const sliderControls = [...slider.querySelectorAll(".slider__control")];
  [sliderControls[1], sliderControls[2]] = [
    sliderControls[2],
    sliderControls[1],
  ];
  sliderControls[0].classList.add("slider__control_active");

  let timerId;
  // let timestamp;

  function moveCarousel() {
    sliderItems.forEach((item, i) => {
      if (i === activeIndex) {
        item.className = "";
        item.classList.add("slider__item", "slider__item_active");
        sliderControls[i].classList.add("slider__control_active");
      } else if (i === prevIndex) {
        item.className = "";
        item.classList.add("slider__item", "slider__item_prev");
        sliderControls[i].classList.remove("slider__control_active");
        sliderControls;
      } else {
        item.className = "";
        item.classList.add("slider__item", "slider__item_next");
        sliderControls[i].classList.remove("slider__control_active");
      }
    });
  }

  startInterval();

  function startInterval() {
    timerId = setInterval(() => {
      activeIndex = activeIndex - 1 < 0 ? sliderLength - 1 : activeIndex - 1;
      prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;

      moveCarousel();
    }, 6000);
  }

  rightBtn.addEventListener("click", () => {
    clearInterval(timerId);
    activeIndex = activeIndex - 1 < 0 ? sliderLength - 1 : activeIndex - 1;
    prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
    moveCarousel();
    startInterval();
  });

  leftBtn.addEventListener("click", () => {
    clearInterval(timerId);
    activeIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
    prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
    moveCarousel();
    startInterval();
  });
}
