import { timer } from "./timer.js";
import { taskList } from "./todo.js";

// Where time is the value, it's set in minutes
export const settings = {

  setTomatoDuration(minutes) {
    timer.tomatoDuration = minutes;
  },
  
  setShortDuration(minutes) {
    timer.shortDuration = minutes;
  },
  
  setLongDuration(minutes) {
    timer.longDuration = minutes;
  },
  
  // Provide the function with an amount of tomatoes after which you want the long break to start
  setWhenLongStarts(tomatoes) {
    timer.longInterval = tomatoes;
    localStorage.longInterval = tomatoes;
  },

  toggleAutoSwitchTasks() {
    if (timer.autoSwitchTasks === false) {
      timer.autoSwitchTasks = true;
    } else {
      timer.autoSwitchTasks = false;
    }
    localStorage.autoSwitchTasks = timer.autoSwitchTasks.toString();
  },

  toggleAutoCheckTasks() {
    if (timer.autoCheckTasks === false) {
      timer.autoCheckTasks = true;
    } else {
      timer.autoCheckTasks = false;
    }
    localStorage.autoCheckTasks = timer.autoCheckTasks.toString();
  },

  toggleAutoStartTomatoes() {
    if (timer.autoStartTomatoes === false) {
      timer.autoStartTomatoes = true;
    } else {
      timer.autoStartTomatoes = false;
    }
    localStorage.autoStartTomatoes = timer.autoStartTomatoes.toString();
  },

  toggleAutoStartBreaks() {
    if (timer.autoStartBreaks === false) {
      timer.autoStartBreaks = true;
    } else {
      timer.autoStartBreaks = false;
    }
    localStorage.autoStartBreaks = timer.autoStartBreaks.toString();
  },

  returnToDefaults() {
    this.setTomatoDuration(45);
    this.setShortDuration(5);
    this.setLongDuration(15);
    this.setWhenLongStarts(2);
    timer.autoStartBreaks = false;
    localStorage.autoStartBreaks = "false";
    timer.autoStartTomatoes = false;
    localStorage.autoStartTomatoes = "false";
    timer.autoSwitchTasks = false;
    localStorage.autoSwitchTasks = "false";
    timer.autoCheckTasks = false;
    localStorage.autoCheckTasks = "false";
  } 
};