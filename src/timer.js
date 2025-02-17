// This timer must have a mechanism to track which type of timer is currently used (Pomodoro, Short, Long), how long it is until the time is up. The timer object has to have methods to start, stop, reset it and change the type of timer. It also has to have a property that will store the amount of tomatoes that has been done at the moment.

// If you close the site/browser, on your return, the app should count how much time has elapsed since you started the timer, and if it's more than the duration of a tomato, this tomato should be finished automatically. 

// If the user set the timer to start breaks and tomatoes automatically, the app should calculate how many tomatoes the user should've completed at the moment he or she returns to the app and arrange everything dependent on this information properly.

export const timer = {
  tomatoDur: 45,
  set tomatoDuration(newTomatoDuration) {
    this.tomatoDur = newTomatoDuration;
    if (this.current === "tomato") {
      let passed = this.duration - this.minutes;
      if (passed < newTomatoDuration || (passed === newTomatoDuration && this.seconds > 0)) {
        this.duration = newTomatoDuration;  
        this.minutes = newTomatoDuration - passed;
      } else {
        this.current = "tomato";
      }
    }
  },  
  get tomatoDuration() {
    return this.tomatoDur;
  },
  
  shortDur: 5,
  set shortDuration(newShortDuration) {
    this.shortDur = newShortDuration;
    if (this.current === "short") {
      let passed = this.duration - this.minutes;
      if (passed < newShortDuration || (passed === newShortDuration && this.seconds > 0)) {
        this.duration = newShortDuration;
        this.minutes = newShortDuration - passed;
      } else {
        this.current = "short";
      }
    }
  },
  get shortDuration() {
    return this.shortDur;
  },

  longDur: 15,
  set longDuration(newLongDuration) {
    this.longDur = newLongDuration;
    if (this.current === "long") {
      let passed = this.duration - this.minutes;
      if (passed < newLongDuration || (passed === newLongDuration && this.seconds > 0)) {
        this.duration = newLongDuration;
        this.minutes = newLongDuration - passed;
      } else {
        this.current = "long";
      }
    }
  },
  get longDuration() {
    return this.longDur;
  },

  // After how many tomatoes should 
  // - a long break start after you finish a tomato if the autoSwitchTask === true
  // - the next break become long if the User doesn't specifically start a short break
  longInterval: 2,

  autoStartTomatoes: false,
  autoStartBreaks: false,

  current: "tomato",
  tomatoesTotal: 0,

  // As soon as the long break starts, the count resets to null
  tomatoesInCycle: 0,

  duration: 45,
  curr: "tomato",
  set current(string) {
    switch (string) {
      case "tomato":
        this.pause();
        this.duration = this.tomatoDuration;
        this.curr = "tomato";
        this.reset();
        break;
      case "short":
        this.pause();
        this.duration = this.shortDuration;
        this.curr = "short";
        this.reset();
        break;
      case "long":
        this.pause();
        this.duration = this.longDuration;
        this.curr = "long";
        this.reset();
        break;
      default:
        console.error('Type in a correct value ("tomato"/"short"/"long").');
    }
  }, 

  get current() {
    return this.curr;
  },
  
  paused: true,
  timer: undefined,
  minutes: 45,
  seconds: 0, 
  start() {
    this.paused = false;
    this.timer = setInterval(() => this.update(), 1000);
  },
  update() {
    if (this.minutes === 0 && this.seconds === 0) {
      clearInterval(this.timer);  
      this.paused = true;
      if (this.current === "tomato") {
        this.tomatoesTotal++;
        this.tomatoesInCycle++;
        if (this.tomatoesInCycle === this.longInterval) {
          this.tomatoesInCycle === 0;
          this.current = "long";
        } else {
          this.current = "short";
        }
      } else if (this.current === "short" || this.current === "long") {
        this.current = "tomato";
      }
      console.log("Time's up"); 
    } else if (!this.paused) {
      if (this.seconds > 0) {
        this.seconds--;
        console.log(`${this.minutes}:${this.seconds}`);
      } else if (this.seconds === 0) {
        this.minutes--;
        this.seconds = 59;    
        console.log(`${this.minutes}:${this.seconds}`);
      } 
    }
  },
  pause() {
    if (this.paused === false) {
      clearInterval(this.timer);
      this.paused = true;
    }
  },
  reset() {
    this.pause();
    this.minutes = this.duration;
    this.seconds = 0;
  },
};

// The app's logic
// - timer
// - timers duration logic - the timer object shouldn't know about how much time each timer type lasts. It's the responsibility of another object
// - tasks  
// - progress section
// The timer should not bother with knowing the amount of tomatoes left or done. It has to know only about time, nothig else. 