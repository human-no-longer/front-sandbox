/* global noUiSlider:readonly */
const sliderElement = document.querySelector(".level-form__slider");
const valueElement = document.querySelector(".level-form__value");
const specialElement = document.querySelector(".level-form__special");

valueElement.value = 80;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: "lower",
  format: {
    to: function (value) {
      // Метод .format.to() нужен для форматирования значения из слайдера и вывода его где-либо.
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      // Метод .format.from() нужен для форматирования значения для слайдера. Этот метод должен строго возвращать число, поэтому используем parseFloat()
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on("update", () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

specialElement.addEventListener("change", (evt) => {
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 10,
      },
      start: 8,
      step: 0.1,
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
    sliderElement.noUiSlider.set(80);
  }
});

/* disable slider */
// sliderElement.setAttribute('disabled', true);
// sliderElement.removeAttribute('disabled');

/* remove slider */
// sliderElement.noUiSlider.destroy();
