import { timer } from "./timer.js";

// Where time is the value, it's set in minutes
export const settings = {
  // When a task is completed, should the app automatically focus on the next task or stay on the same task and continue counting tomatoes on it until the user switches the task manually
  autoSwitchTask: false,

  // When a task is completed, should the app automatically check it, or should it leave the task unchecked
  autoCheckTask: false,

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

  toggleAutoSwitchTask() {
    if (this.autoSwitchTask === false) {
      this.autoSwitchTask = true;
    } else {
      this.autoSwitchTask = false;
    }
  },

  toggleAutoCheckTask() {
    if (this.autoCheckTask === false) {
      this.autoCheckTask = true;
    } else {
      this.autoCheckTask = false;
    }
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
};