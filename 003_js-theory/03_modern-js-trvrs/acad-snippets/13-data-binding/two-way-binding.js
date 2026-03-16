const input = document.querySelector(".user__name");
const pic = document.querySelector(".user__pic");

const data = {
  _value: "",
  get value() {
    return this._value;
  },
  set value(newValue) {
    this._value = newValue;
    input.value = newValue;
    pic.src = `https://api.dicebear.com/9.x/bottts/svg?seed=${newValue.replace(/\s/g, "")}`;
  },
};

const button = document.querySelector(".user__random-name");

button.addEventListener("click", () => (data.value = `Пользователь ${Math.random().toFixed(3) * 1000}`));

input.addEventListener("input", (evt) => (data.value = evt.target.value));
