import "./style.css";
import "./index.html";
import { settings } from "./settings.js";
import { timer, initializeTimer } from "./timer.js"; 

initializeTimer();
window.timer = timer;
window.settings = settings;
console.log("To control the timer, you must type timer.[command]. To access settings, you must type settings.[command]. The timer has the following commands: \n•.start() \n•.pause() \n•.reset() \n•.clearCount() \n•.finishInterval() (do not use unless the timer is currently active) \n\nThe menu has the following commands: \n•.setTomatoDuration(mins) \n•.setShortDuration(mins) \n•.setLongDuration(mins) \n•.setWhenLongStarts(tomatoes before a long break) \n•.toggleAutoStartTomatoes() \n•.toggleAutoStartBreaks() \n\nThe app uses local storage of your computer. When you open the app, it uses the information from the previous session. If you wish to set default settings, you can type settings.returnToDefaults().");

// 