const MOBILE_VIEWPORT = "(width < 69.375em)";

const media = window.matchMedia(MOBILE_VIEWPORT);

const mainNode = document.querySelector("main");
const openMenuButtonNode = document.querySelector("#nav-btn-open");
const closeMenuButtonNode = document.querySelector("#nav-btn-close");
const navContentNode = document.querySelector("#nav-content");
const navOverlayNode = document.querySelector("#nav-overlay");

const setupNavigation = (evt) => {
  if (evt.matches) {
    // атрибут inert скрывает элемент от скрин-ридера
    navContentNode.setAttribute("inert", true);
    // чтобы не было "прыжка" бокового меню при загрузке
    setTimeout(() => {
      navContentNode.style.display = "flex";
      navOverlayNode.style.display = "block";
    }, 0);
  } else {
    navContentNode.removeAttribute("inert");
    mainNode.removeAttribute("inert");
    navContentNode.style.display = "";
    navOverlayNode.style.display = "";
  }
};

const onOpenMenuButtonClick = () => {
  openMenuButtonNode.setAttribute("aria-expanded", "true");
  navContentNode.removeAttribute("inert");
  mainNode.setAttribute("inert", true);
  document.body.classList.add("noscroll");
};

const onCloseMenuButtonClick = () => {
  openMenuButtonNode.setAttribute("aria-expanded", "false");
  navContentNode.setAttribute("inert", true);
  mainNode.removeAttribute("inert");
  document.body.classList.remove("noscroll");
};

const onViewportChange = (evt) => {
  setupNavigation(evt);
};

const initNavigation = () => {
  setupNavigation(media); // проверка вьюпорта при первой загрузке
  openMenuButtonNode.addEventListener("click", onOpenMenuButtonClick);
  closeMenuButtonNode.addEventListener("click", onCloseMenuButtonClick);
  media.addEventListener("change", onViewportChange);
};

// Проверка порядка выбора элементов при нажатии на Tab
document.addEventListener("keyup", (evt) => {
  if (evt.key === "Tab") {
    console.log(document.activeElement);
  }
});

export { initNavigation };
