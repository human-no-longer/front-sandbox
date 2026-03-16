/* eslint-disable no-undef */
class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

    document.querySelector("#limit").value = this._calorieLimit;
  }

  // Public methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.setTotalCalories(this._totalCalories);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.setTotalCalories(this._totalCalories);
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((item) => item.id === id);
    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.setTotalCalories(this._totalCalories);
      Storage.removeMeal(id);
      this._meals.splice(index, 1);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((item) => item.id === id);
    if (index !== -1) {
      const meal = this._workouts[index];
      this._totalCalories -= meal.calories;
      Storage.setTotalCalories(this._totalCalories);
      Storage.removeWorkout(id);
      this._workouts.splice(index, 1);
      this._render();
    }
  }

  setLimit(limit) {
    this._calorieLimit = limit;
    Storage.setCalorieLimit(limit);
    this._displayCaloriesLimit();
    this._render();
  }

  loadItems() {
    this._meals.forEach((item) => this._displayNewMeal(item));
    this._workouts.forEach((item) => this._displayNewWorkout(item));
  }

  // Private methods
  _displayNewMeal(meal) {
    const mealsNode = document.querySelector("#meal-items");
    const mealNode = document.createElement("div");
    mealNode.classList.add("card", "my-2");
    mealNode.setAttribute("data-id", meal.id);
    mealNode.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    mealsNode.append(mealNode);
  }

  _displayNewWorkout(workout) {
    const workoutsNode = document.querySelector("#workout-items");
    const workoutNode = document.createElement("div");
    workoutNode.classList.add("card", "my-2");
    workoutNode.setAttribute("data-id", workout.id);
    workoutNode.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div
            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    workoutsNode.append(workoutNode);
  }

  _displayCaloriesTotal() {
    const caloriesTotalNode = document.querySelector("#calories-total");
    caloriesTotalNode.textContent = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimitNode = document.querySelector("#calories-limit");
    caloriesLimitNode.textContent = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedNode = document.querySelector("#calories-consumed");
    const caloriesConsumed = this._meals.reduce(
      (total, item) => total + item.calories,
      0
    );
    caloriesConsumedNode.textContent = caloriesConsumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedNode = document.querySelector("#calories-burned");
    const caloriesBurned = this._workouts.reduce(
      (total, item) => total + item.calories,
      0
    );
    caloriesBurnedNode.textContent = caloriesBurned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingParentNode = document.querySelector(
      ".card:has(#calories-remaining)"
    );
    const caloriesRemainingNode = document.querySelector("#calories-remaining");
    const caloriesRemaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingNode.textContent = caloriesRemaining;
    if (caloriesRemaining < 0) {
      caloriesRemainingParentNode.classList.remove("bg-light");
      caloriesRemainingParentNode.classList.add("bg-danger");
    } else {
      caloriesRemainingParentNode.classList.remove("bg-danger");
      caloriesRemainingParentNode.classList.add("bg-light");
    }
  }

  _displayCaloriesProgress() {
    const caloriesProgressNode = document.querySelector("#calorie-progress");
    const caloriesProgress = Math.max(
      (this._totalCalories / this._calorieLimit) * 100,
      0
    );
    caloriesProgressNode.style.width = `${Math.min(caloriesProgress, 100)}%`;
    if (caloriesProgress > 100) {
      caloriesProgressNode.classList.remove("bg-success");
      caloriesProgressNode.classList.add("bg-danger");
    } else {
      caloriesProgressNode.classList.remove("bg-danger");
      caloriesProgressNode.classList.add("bg-success");
    }
  }

  _reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    return localStorage.getItem("calorieLimit") === null
      ? defaultLimit
      : +localStorage.getItem("calorieLimit");
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem("calorieLimit", calorieLimit);
  }

  static getTotalCalories(defaultCalories = 0) {
    return localStorage.getItem("totalCalories") === null
      ? defaultCalories
      : +localStorage.getItem("totalCalories");
  }

  static setTotalCalories(calories) {
    localStorage.setItem("totalCalories", calories);
  }

  static getMeals() {
    return localStorage.getItem("meals") === null
      ? []
      : JSON.parse(localStorage.getItem("meals"));
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static removeMeal(id) {
    const meals = Storage.getMeals();
    meals.forEach((item, index) => {
      if (item.id === id) {
        meals.splice(index, 1);
      }
    });

    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static getWorkouts() {
    return localStorage.getItem("workouts") === null
      ? []
      : JSON.parse(localStorage.getItem("workouts"));
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });

    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static clearAll() {
    // localStorage.clear()
    localStorage.removeItem("totalCalories");
    localStorage.removeItem("meals");
    localStorage.removeItem("workouts");
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._setNodes();
    this._setEventListeners();
    this._tracker.loadItems();
  }

  _setNodes() {
    this.mealFormNode = document.querySelector("#meal-form");
    this.workoutFormNode = document.querySelector("#workout-form");
    this.mealsNode = document.querySelector("#meal-items");
    this.workoutsNode = document.querySelector("#workout-items");
    this.mealsFilterNode = document.querySelector("#filter-meals");
    this.workoutsFilterNode = document.querySelector("#filter-workouts");
    this.resetNode = document.querySelector("#reset");
    this.limitFormNode = document.querySelector("#limit-form");
  }

  _setEventListeners() {
    this.mealFormNode.addEventListener(
      "submit",
      this._addNewItem.bind(this, "meal")
    );
    this.workoutFormNode.addEventListener(
      "submit",
      this._addNewItem.bind(this, "workout")
    );
    this.mealsNode.addEventListener(
      "click",
      this._removeItem.bind(this, "meal")
    );
    this.workoutsNode.addEventListener(
      "click",
      this._removeItem.bind(this, "workout")
    );
    this.mealsFilterNode.addEventListener(
      "input",
      this._filterItems.bind(this, "meal")
    );
    this.workoutsFilterNode.addEventListener(
      "input",
      this._filterItems.bind(this, "workout")
    );
    this.resetNode.addEventListener("click", this._reset.bind(this));
    this.limitFormNode.addEventListener("submit", this._setLimit.bind(this));
  }

  _setLimit(evt) {
    evt.preventDefault();

    const limitNode = document.querySelector("#limit");

    if (limitNode.value === "") {
      alert("Please add limit number");
      return;
    }

    this._tracker.setLimit(+limitNode.value);
    limitNode.value = "";

    const modalNode = document.querySelector("#limit-modal");
    bootstrap.Modal.getInstance(modalNode).hide();
  }

  _reset() {
    this._tracker._reset();
    this.mealsNode.innerHTML = "";
    this.workoutsNode.innerHTML = "";
    this.mealsFilterNode.value = "";
    this.workoutsFilterNode.value = "";
  }

  _filterItems(type, evt) {
    const itemNodes = document.querySelectorAll(`#${type}-items .card`);
    const filterText = evt.target.value.trim();

    itemNodes.forEach((item) => {
      const name = item.querySelector("h4");
      if (name.textContent.toLowerCase().includes(filterText)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }

  _addNewItem(type, evt) {
    evt.preventDefault();
    const nameNode = document.querySelector(`#${type}-name`);
    const caloriesNode = document.querySelector(`#${type}-calories`);
    const collapseNode = document.querySelector(`#collapse-${type}`);

    if (nameNode.value === "" || caloriesNode.value === "") {
      alert("Please fill in all fields");
      return;
    }

    if (type === "meal") {
      const meal = new Meal(nameNode.value, +caloriesNode.value);
      this._tracker.addMeal(meal);
    }

    if (type === "workout") {
      const workout = new Workout(nameNode.value, +caloriesNode.value);
      this._tracker.addWorkout(workout);
    }

    nameNode.value = "";
    caloriesNode.value = "";
    new bootstrap.Collapse(collapseNode, { toggle: true });
  }

  _removeItem(type, evt) {
    if (!evt.target.closest(".delete")) {
      return;
    }
    if (confirm("Are you sure you want to delete this item?")) {
      const cardNode = evt.target.closest(".card");
      const cardId = cardNode.getAttribute("data-id");
      cardNode.remove();
      type === "meal"
        ? this._tracker.removeMeal(cardId)
        : this._tracker.removeWorkout(cardId);
    }
  }
}

const app = new App();
