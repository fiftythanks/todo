// Where time is the value, it's set in minutes
export const settings = {
  tomatoDuration: 45,
  shortDuration: 5,
  longDuration: 15,

  // After how many tomatoes should 
  // - a long break start after you finish a tomato if the autoSwitchTask === true
  // - the next break become long if the User doesn't specifically start a short break
  longInterval: 2,

  // When a task is completed, should the app automatically focus on the next task or stay on the same task and continue counting tomatoes on it until the user switches the task manually
  autoSwitchTask: false,

  // When a task is completed, should the app automatically check it, or should it leave the task unchecked
  autoCheckTask: false,

  // When the timer goes off, should the next break/tomato timer start, according to the Pomodoro technique, or should it wait for the user's decision
  autoStartTaskss: false,
  autoStartBreakss: false,

  setTomatoDuration(minutes) {
    this.tomatoDuration = minutes;
  },
  
  setShortDuration(minutes) {
    this.shortDuration = minutes;
  },
  
  setLongDuration(minutes) {
    this.longDuration = minutes;
  },
  
  // Provide the function with an amount of tomatoes after which you want the long break to start
  setWhenLongStarts(tomatoes) {
    this.longInterval = tomatoes;
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

  toggleAutoStartTasks() {
    if (this.autoStartTasks === false) {
      this.autoStartTasks = true;
    } else {
      this.autoStartTasks = false;
    }
  },

  toggleAutoStartBreaks() {
    if (this.autoStartBreaks === false) {
      this.autoStartBreaks = true;
    } else {
      this.autoStartBreaks = false;
    }
  },
};