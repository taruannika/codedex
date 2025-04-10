const timeDisplay = document.querySelector("#time");
const sessionText = document.querySelector("#session-text");
const bellAudio = new Audio("./assets/bell.wav");

let workTime = 25 * 60;
let timeLeft = localStorage.getItem("timeLeft")
  ? parseInt(localStorage.getItem("timeLeft", 10))
  : workTime;
let timer = null;

sessionText.innerHTML = "Press start to begin";

const updateDisplay = () => {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

const saveTime = () => {
  localStorage.setItem("timeLeft", timeLeft);
};

const startTimer = () => {
  // if session is already started, return early
  if (timer !== null) return;

  timer = setInterval(() => {
    // start timer
    if (timeLeft > 0) {
      timeLeft--;
      sessionText.innerHTML = "Focus";
      updateDisplay();
      saveTime();

      // work session is over
    } else {
      clearInterval(timer);
      timer = null;
      bellAudio.play();
      alert("Work session over. Take a break");
      resetTimer();
    }
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(timer);
  sessionText.innerHTML = "Paused";
  timer = null;
};

const resetTimer = () => {
  pauseTimer();
  timeLeft = workTime;
  saveTime();
  sessionText.innerHTML = "Press start to begin";
  updateDisplay();
};

updateDisplay();
