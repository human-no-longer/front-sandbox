const CHARS_MAX_NUMBER = 150;
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";

const textAreaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const hashtagListEl = document.querySelector(".hashtags");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

const inputHandler = () => {
  const charsMaxNumber = CHARS_MAX_NUMBER;
  const charsTypedNumber = textAreaEl.value.length;
  const charsLeft = charsMaxNumber - charsTypedNumber;
  counterEl.textContent = charsLeft;
};

const showVisualIndicator = (element, className) => {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, 2000);
};

const renderFeddbackItem = (item) => {
  const { upvoteCount, badgeLetter, company, text, daysAgo } = item;
  const feedbackHTML = `
    <li class="feedback">
      <button class="upvote">
          <i class="fa-solid fa-caret-up upvote__icon"></i>
          <span class="upvote__count">${upvoteCount}</span>
      </button>
      <section class="feedback__badge">
          <p class="feedback__letter">${badgeLetter}</p>
      </section>
      <div class="feedback__content">
          <p class="feedback__company">${company}</p>
          <p class="feedback__text">${text}</p>
      </div>
      <p class="feedback__date">${
        daysAgo === 0 ? "new" : `${daysAgo} days ago`
      }</p>
    </li>
  `;
  feedbackListEl.insertAdjacentHTML("beforeend", feedbackHTML);
};

const submitHandler = (evt) => {
  evt.preventDefault();
  const text = textAreaEl.value;
  if (text.length >= 5 && text.includes("#")) {
    showVisualIndicator(formEl, "form--valid");
  } else {
    showVisualIndicator(formEl, "form--invalid");
    textAreaEl.focus();
    return;
  }

  const wordWithHashtag = text.split(/\s+/).find((item) => item.includes("#"));
  const hashtag = wordWithHashtag.slice(wordWithHashtag.indexOf("#"));
  const company = hashtag.slice(1).length
    ? hashtag.slice(1)
    : "unknown company";
  const badgeLetter = company.slice(0, 1).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  const feedbackItemObj = {
    badgeLetter,
    upvoteCount,
    daysAgo,
    company,
    text,
  };

  renderFeddbackItem(feedbackItemObj);

  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackItemObj),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log("Something went wrong:(((");
        return;
      }
      console.log("All good");
    })
    .catch((error) => console.log(error));

  textAreaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = CHARS_MAX_NUMBER;
};

const feedbackListClickHandler = (evt) => {
  const clickedEl = evt.target.closest(".feedback");
  if (!clickedEl) return;

  const upvoteBtnEl = evt.target.closest(".upvote");
  const upvoteCountEl = upvoteBtnEl?.querySelector(".upvote__count");

  if (upvoteBtnEl) {
    upvoteCountEl.textContent = ++upvoteCountEl.textContent;
    upvoteBtnEl.disabled = true;
  } else {
    clickedEl.classList.toggle("feedback--expand");
  }
};

const hashtagListClickHandler = (evt) => {
  const clickedEl = evt.target.closest(".hashtags__item");
  if (!clickedEl) return;
  if (clickedEl.classList.contains("hashtags__item--all")) {
    renderFeedbackItems();
  }
  const company = clickedEl.textContent.trim().toLowerCase().slice(1);
  const filteredList = Array.from(feedbackListEl.children).forEach(
    (item) => !item.textContent.toLowerCase().includes(company) && item.remove()
  );
  console.log(filteredList);
};

const renderFeedbackItems = () => {
  fetch(`${BASE_API_URL}/feedbacks`)
    .then((res) => res.json())
    .then((data) => {
      spinnerEl.remove();
      feedbackListEl.innerHTML = "";
      data.feedbacks.forEach((item) => renderFeddbackItem(item));
    })
    .catch((error) => {
      feedbackListEl.textContent = `
      Failed to fetch feedback items.
      Error message: ${error.message}
    `;
    });
};

renderFeedbackItems();
feedbackListEl.addEventListener("click", feedbackListClickHandler);
hashtagListEl.addEventListener("click", hashtagListClickHandler);
textAreaEl.addEventListener("input", inputHandler);
formEl.addEventListener("submit", submitHandler);
