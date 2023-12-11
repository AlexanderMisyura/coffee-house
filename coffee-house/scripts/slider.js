slider();

function slider() {
  const slider = document.querySelector(".slider");
  const left = slider.querySelector(".slider__btn-left");
  const right = slider.querySelector(".slider__btn-right");
  const row = slider.querySelector(".slider__active-content");

  const sliderItems = [...row.children];
  const sliderLength = row.children.length;
  let activeIndex = 0;
  let prevIndex = sliderLength - 1;
  let nextIndex = activeIndex + 1;

  const sliderControls = [...slider.querySelectorAll(".slider__control")];
  [sliderControls[1], sliderControls[2]] = [sliderControls[2], sliderControls[1]];
  sliderControls[0].classList.add("slider__control_active");

  let timerId;

  timerId = setInterval(() => {
    prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
    activeIndex = activeIndex - 1 < 0 ? sliderLength - 1 : activeIndex - 1;

    console.log('activeIndex', activeIndex)

    sliderItems.forEach((item, i) => {
      if (i === activeIndex) {
        item.className = "";
        item.classList.add("slider__item", "slider__item_active");
        sliderControls[i].classList.add(
          "slider__control_active"
        );
      } else if (i === prevIndex) {
        item.className = "";
        item.classList.add("slider__item", "slider__item_prev");
        sliderControls[i].classList.remove("slider__control_active");
        sliderControls
      } else {
        item.className = "";
        item.classList.add("slider__item", "slider__item_next");
        sliderControls[i].classList.remove("slider__control_active");
      }
    });

    // sliderControls.forEach((control, i) => {
    //   if (i === activeIndex) {
    //     control.className = "";
    //     control.classList.add("slider__control", "slider__control_active");
    //   } else {
    //     control.className = "";
    //     control.classList.add("slider__control");
    //   }
    // })
  }, 6000);
}
