import { timer } from "./timer.js";

const btns = document.querySelector(".controls");
const tomato = btns.querySelector(".tomato");
const short = btns.querySelector(".short");
const long = btns.querySelector(".long");
const next = btns.querySelector(".next");

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