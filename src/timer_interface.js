import { timer } from "./timer.js";

const clock = document.querySelector(".timer");
const btns = clock.querySelector(".controls");
const tomato = btns.querySelector(".tomato");
const short = btns.querySelector(".short");
const long = btns.querySelector(".long");
const next = btns.querySelector(".next");
const startWrapper = clock.lastElementChild;
const start = startWrapper.querySelector("button");

tomato.addEventListener("click", (e) => {
  if (e.button === 0) {
    timer.current = "tomato";
  }
});

short.addEventListener("click", (e) => {
  if (e.button === 0) {
    timer.current = "short";
  }
});

long.addEventListener("click", (e) => {
  if (e.button === 0) {
    timer.current = "long";
  }
});

next.addEventListener("click", (e) => {
  if (e.button === 0) {
    timer.finishInterval();
  }
});

start.addEventListener("click", (e) => {
  if (e.button === 0) {
    if (timer.paused) {
      timer.start();
      start.textContent = "Pause";
    } else {
      timer.pause();
      start.textContent = "Start";
    }
  }
});