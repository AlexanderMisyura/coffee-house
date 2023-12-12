const burgerIcon = document.querySelector(".button-icon_burger");
burgerIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
  const windowWidthBefore = document.documentElement.clientWidth;
  document.body.classList.toggle("scroll-disabled");
  const windowWidthAfter = document.documentElement.clientWidth;

  if (windowWidthBefore < windowWidthAfter) {
    document.body.style.paddingRight = `${
      windowWidthAfter - windowWidthBefore
    }px`;
  } else {
    document.body.style.paddingRight = "";
  }

  burgerIcon.classList.toggle("button-icon_burger__cross");
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("sidebar__active");
}

const sidebarNav = document.querySelector(".sidebar__navigation");
sidebarNav.addEventListener("click", (e) => {
  if (e.target.nodeName === "A") closeMenu();
});

document.querySelector(".sidebar__button").addEventListener("click", () => {
  closeMenu();
});

function closeMenu() {
  document.body.classList.remove("scroll-disabled");
  document.body.style.paddingRight = "";
  burgerIcon.classList.remove("button-icon_burger__cross");
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.remove("sidebar__active");
}
