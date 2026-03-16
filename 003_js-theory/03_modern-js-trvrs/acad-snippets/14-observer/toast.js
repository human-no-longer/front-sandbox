const SHOW_TIME = 5000;

const showMessage = (message) => {
  const containerNode = document.createElement("div");
  containerNode.textContent = message;
  containerNode.classList.add("toast");
  document.body.append(containerNode);

  setTimeout(() => {
    containerNode.remove();
  }, SHOW_TIME);
};

const makeToast = (message) => () => showMessage(message);

export { makeToast };
