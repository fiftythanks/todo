import "./style.css";
import "./index.html";
import { settings } from "./settings.js";
import { timer } from "./timer.js"; 

// Switch timer modes
function setTimerToTomato() {
  timer.duration = settings.tomatoDuration;
}
function setTimerToShort() {
  timer.duration = settings.shortDuration;
}
function setTimerToLong() {
  timer.duration = settings.longDuration;
}

// Timer controls
function startTimer() {
  timer.start();
}
function pauseTimer() {
  timer.pause();
}
function resetTimer() {
  timer.reset();
}

window.setTimerToTomato = setTimerToTomato;
window.setTimerToShort = setTimerToShort;
window.setTimerToLong = setTimerToLong; 
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;

