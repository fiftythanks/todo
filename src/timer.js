// This timer must have a mechanism to track which type of timer is currently used (Pomodoro, Short, Long), how long it is until the time is up. The timer object has to have methods to start, stop, reset it and change the type of timer. It also has to have a property that will store the amount of tomatoes that has been done at the moment.

// If you close the site/browser, on your return, the app should count how much time has elapsed since you started the timer, and if it's more than the duration of a tomato, this tomato should be finished automatically. 

// If the user set the timer to start breaks and tomatoes automatically, the app should calculate how many tomatoes the user should've completed at the moment he or she returns to the app and arrange everything dependent on this information properly.

// a simple timer
export const timer = {
  dur: 45,
  set duration(value) {
    this.pause();
    this.dur = value;
    this.minutes = value;
    this.reset();
  },
  get duration() {
    return this.dur;
  },  
  paused: true,
  time: undefined,
  minutes: 45,
  seconds: 0,
  start() {
    this.paused = false;
    this.time = setInterval(() => this.update(), 1000);
  },
  update() {
    if (this.minutes === 0 && this.seconds === 0) {
      clearInterval(this.time);  
      return "Time's up"; 
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
    clearInterval(this.time);
    this.paused = true;
  },
  reset() {
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