const buttonNodes = document.querySelectorAll(".btn");
const modalOverlayNode = document.querySelector(".modal-overlay");
const modalNodes = document.querySelectorAll(".modal");

const onTriggerClick = (evt) => {
  const trigger = evt.currentTarget.dataset.trigger;

  modalNodes.forEach((node) => node.classList.remove("modal--visible"));

  document.querySelector(`[data-target=${trigger}]`).classList.add("modal--visible");
  modalOverlayNode.classList.add("modal-overlay--visible");
};

const onModalOverlayClick = (evt) => {
  if (evt.target !== modalOverlayNode) return;
  modalNodes.forEach((node) => node.classList.remove("modal--visible"));
  modalOverlayNode.classList.remove("modal-overlay--visible");
};

buttonNodes.forEach((node) => {
  node.addEventListener("click", onTriggerClick);
});

modalOverlayNode.addEventListener("click", onModalOverlayClick);
