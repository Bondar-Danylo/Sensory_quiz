// Toggle Quiz
const mainBtn = document.querySelector(".button");
const mainSection = document.querySelector(".quiz-intro");
mainBtn.addEventListener("click", () => {
  mainSection.style.height = "0vh";
  mainSection.style.padding = "0px";
});

// Questions data
const questions = [
  {
    title: "How are you physically feeling today?",
    icons: [
      "icon1.png",
      "icon2.png",
      "icon3.png",
      "icon4.png",
      "icon5.png",
      "icon6.png",
    ],
    text: ["Tired", "Sad", "Happy", "Bored", "Sleepy", "Excited"],
  },
  {
    title: "Question 2",
    icons: [
      "body1.png",
      "body2.png",
      "body3.png",
      "body4.png",
      "body5.png",
      "body5.png",
    ],
    text: ["Sore", "Relaxed", "Energised", "Stiff", "Light", "Heavy"],
  },
  {
    title: "Question 3",
    icons: [
      "tired.png",
      "tired.png",
      "tired.png",
      "tired.png",
      "tired.png",
      "tired.png",
    ],
    text: ["Calm", "Anxious", "Motivated", "Foggy", "Alert", "Lazy"],
  },
  {
    title: "Question 4",
    icons: [
      "icon1.png",
      "icon2.png",
      "icon3.png",
      "icon4.png",
      "icon5.png",
      "icon6.png",
    ],
    text: ["Detox", "Stretch", "Sculpt", "Unwind", "Energise", "Recover"],
  },
];

const NO_ANSWER = "Not selected";
const userAnswers = new Array(questions.length).fill(null);

const questionTitles = document.querySelectorAll(".questions-item__title");
questionTitles.forEach((el, i) => (el.textContent = questions[i].title));

const questionList = document.querySelectorAll(".questions-item");
const answersContainer = document.querySelector(".answers-list");
const nextBtn = document.querySelector(".questions-next");
const prevBtn = document.querySelector(".questions-prev");

// Render answers
const updateAnswersUI = (index) => {
  const { title, icons, text } = questions[index];
  document.querySelector(".answers__title").textContent = title;

  const imgEls = answersContainer.querySelectorAll(".answers-card__img");
  const textEls = answersContainer.querySelectorAll(".answers-card__text");

  icons.forEach((icon, i) => imgEls[i] && (imgEls[i].src = `./images/${icon}`));
  text.forEach((t, i) => textEls[i] && (textEls[i].textContent = t));

  answersContainer.querySelectorAll(".answers-card").forEach((card) => {
    card.classList.remove("selected");
    if (
      card.querySelector(".answers-card__text").textContent ===
      userAnswers[index]
    ) {
      card.classList.add("selected");
    }
  });
};

const setActiveQuestion = (idx1based) => {
  questionList.forEach((item) => item.classList.remove("active-question"));
  const el = [...questionList].find((i) => +i.dataset.question === idx1based);
  if (el) el.classList.add("active-question");
};

const markAnswered = (sidebarEl, answerText) => {
  sidebarEl.querySelector(".questions-item__answer").textContent = answerText;
  sidebarEl.classList.add("answered");
};

// Navigation: NEXT
nextBtn.addEventListener("click", () => {
  const activeEl = document.querySelector(".active-question");
  const activeID = +activeEl.dataset.question;
  const currIdx = activeID - 1;

  if (userAnswers[currIdx] === null) {
    userAnswers[currIdx] = NO_ANSWER;
    markAnswered(activeEl, NO_ANSWER);
  }

  if (activeID === questionList.length) return;

  setActiveQuestion(activeID + 1);
  updateAnswersUI(activeID);
});

// Navigation: PREV
prevBtn.addEventListener("click", () => {
  const activeEl = document.querySelector(".active-question");
  const activeID = +activeEl.dataset.question;
  if (activeID === 1) return;

  setActiveQuestion(activeID - 1);
  updateAnswersUI(activeID - 2);
});

// Answer selection
answersContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".answers-card");
  if (!card) return;

  answersContainer
    .querySelectorAll(".answers-card")
    .forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");

  const chosen = card.querySelector(".answers-card__text").textContent;
  const activeID = +document.querySelector(".active-question").dataset.question;
  userAnswers[activeID - 1] = chosen;
  markAnswered(document.querySelector(".active-question"), chosen);

  setTimeout(() => nextBtn.click(), 150);
});

// Reset Quiz
const resetQuiz = () => {
  userAnswers.fill(null);

  questionList.forEach((item, idx) => {
    item.classList.remove("answered", "active-question");
    item.querySelector(".questions-item__answer").textContent = "";
  });

  setActiveQuestion(1);
  updateAnswersUI(0);

  answersContainer
    .querySelectorAll(".answers-card")
    .forEach((c) => c.classList.remove("selected"));
};

// Popups
const closeIcon = document.querySelector(".close");
const popupExit = document.querySelector(".popup-exit");
const btnCancel = popupExit?.querySelector(".popup__cancel");
const btnReset = popupExit?.querySelector(".popup__main");

const togglePopup = (p) => p?.classList.toggle("show");

closeIcon?.addEventListener("click", () => togglePopup(popupExit));
btnCancel?.addEventListener("click", () => togglePopup(popupExit));
popupExit?.addEventListener(
  "click",
  (e) => e.target === popupExit && togglePopup(popupExit)
);

btnReset?.addEventListener("click", () => {
  resetQuiz();

  mainSection.style.height = "100vh";
  mainSection.style.padding = "50px 0";

  togglePopup(popupExit);
});

// Page init
setActiveQuestion(1);
updateAnswersUI(0);
