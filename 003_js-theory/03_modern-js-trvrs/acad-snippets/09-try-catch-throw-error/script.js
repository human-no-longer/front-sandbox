const seasons = ["Лето", "Осень", "Весна", "Зима", "Дождь"];

const getCloth = (season) => {
  switch (season) {
    case "Осень":
      return "Зонт";
    case "Зима":
      return "Варежки";
    case "Лето":
      return "Майку";
    case "Весна":
      return "Плащ";
    default:
      throw new Error(`Неизвестное время года: «${season}»`);
  }
};

const questionsContainer = document.querySelector(".questions");

seasons.forEach((season) => {
  questionsContainer.insertAdjacentHTML(
    "beforeend",
    `— Что надеть, если сейчас ${season}?<br>`
  );
  try {
    questionsContainer.insertAdjacentHTML(
      "beforeend",
      `— ${getCloth(season)}<br>`
    );
  } catch (error) {
    questionsContainer.insertAdjacentHTML("beforeend", "— Непонятно :-(<br>");
  }
});

questionsContainer.insertAdjacentHTML("beforeend", "— А что в Муссон?<br>");

try {
  questionsContainer.insertAdjacentHTML(
    "beforeend",
    `${getCloth("Муссон")}<br>`
  );
} catch (error) {
  questionsContainer.insertAdjacentHTML("beforeend", "— Непонятно :-(<br>");
}
