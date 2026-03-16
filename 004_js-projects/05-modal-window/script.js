"use strict";
const modalEl = document.querySelector(".modal");
const overlayEl = document.querySelector(".overlay");
const closeModalBtnEl = document.querySelector(".close-modal");
const openModalBtns = Array.from(document.querySelectorAll(".show-modal"));

for (const btnEl of openModalBtns) {
  btnEl.addEventListener("click", openModal);
}

closeModalBtnEl.addEventListener("click", closeModal);
overlayEl.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
    closeModal();
  }
});

function openModal() {
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
}

function closeModal() {
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
}
