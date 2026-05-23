// renderer.js

let duration = 25 * 60; // 25 Minuten
let remaining = duration;
let timerId = null;

const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  // immer zweistellig
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  timeEl.textContent = formatTime(remaining);
}

function startTimer() {
  if (timerId) return; // nicht doppelt starten
  timerId = setInterval(() => {
    remaining--;
    updateDisplay();

    if (remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      timeEl.textContent = "FERTIG 💗";
      startBtn.textContent = "NOCHMAL";
      remaining = duration;
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  // wenn fertig war, reset
  if (!timerId && timeEl.textContent === "FERTIG 💗") {
    remaining = duration;
    updateDisplay();
    startBtn.textContent = "START";
    return;
  }

  startTimer();
});

// initial
updateDisplay();
