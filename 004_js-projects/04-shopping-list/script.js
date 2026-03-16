const itemForm = document.querySelector("#item-form");
const formBtn = itemForm.querySelector(".btn");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const filterInput = document.querySelector("#filter");
let isEditModeOn = false;

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  if (isEditModeOn === true) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.remove();
    isEditModeOn = false;
  }
  addItemToDOM(newItem);
  addItemToStorage(newItem);
  resetUI();
}

function onItemClick({ target }) {
  const item = target.closest("#item-list li");
  if (!item) return;
  if (target.closest(".remove-item")) {
    if (!confirm("Are you sure?")) return;
    removeItemFromDOM(item);
    removeItemFromStorage(item.textContent);
  } else {
    setItemToEdit(item);
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem("items");
  resetUI();
}

function filterItems({ target }) {
  const items = Array.from(itemList.querySelectorAll("li"));
  const text = target.value.toLowerCase();
  items.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();
    if (itemText.indexOf(text) === -1) {
      item.style.display = "none";
    } else {
      item.style.display = "";
    }
  });
}

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  resetUI();
}

function resetUI() {
  const items = Array.from(itemList.querySelectorAll("li"));
  itemInput.value = "";
  formBtn.style.backgroundColor = "";
  formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filterInput.style.display = "none";
  } else {
    clearBtn.style.display = "";
    filterInput.style.display = "";
  }
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function removeItemFromDOM(item) {
  item.remove();
  resetUI();
}

function removeItemFromStorage(itemText) {
  let itemsFromStorage = getItemsFromStorage();
  const indexToRemove = itemsFromStorage.findIndex((item) => item === itemText);
  itemsFromStorage.splice(indexToRemove, 1);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function setItemToEdit(item) {
  isEditModeOn = true;
  Array.from(itemList.querySelectorAll("li")).forEach((item) =>
    item.classList.remove("edit-mode")
  );
  item.classList.add("edit-mode");
  formBtn.textContent = "Update item";
  formBtn.style.backgroundColor = "limegreen";
  itemInput.value = item.textContent;
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function init() {
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onItemClick);
  clearBtn.addEventListener("click", clearItems);
  filterInput.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
}

init();
