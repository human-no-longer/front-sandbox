const userEmotions = ["smile", "crying"];

/* Способ 1 */
const emojiContainer = document.querySelector(".emojis");
const emojiList = emojiContainer.querySelectorAll(".emoji");

emojiList.forEach((emojiListItem) => {
  const isNecessary = userEmotions.some((userEmotion) =>
    emojiListItem.classList.contains("emoji--" + userEmotion)
  );

  if (!isNecessary) {
    emojiListItem.remove();
  }
});

/* Способ 2 */
const emojiContainer2 = document.querySelector(".emojis-2");
const emojiList2 = emojiContainer2.querySelectorAll(".emoji");
const modifiers = userEmotions.map((userEmotion) => "emoji--" + userEmotion);

emojiList2.forEach((emojiListItem) => {
  const modifier = emojiListItem.classList[1]; // 1 - это индекс нужного класса в атрибуте class

  if (!modifiers.includes(modifier)) {
    console.log(emojiListItem);

    emojiListItem.remove();
  }
});
