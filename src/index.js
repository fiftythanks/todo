import "./style.css";
import "./index.html";
import { settings } from "./settings.js";
import { timer, initializeTimer } from "./timer.js"; 

initializeTimer();
window.timer = timer;
window.settings = settings;

// 