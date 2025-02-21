import { taskList } from "./todo.js";

export const timer = {
  tomatoDur: 45,
  set tomatoDuration(newTomatoDuration) {
    this.tomatoDur = newTomatoDuration;
    localStorage.tomatoDuration = newTomatoDuration;
    if (this.current === "tomato") {
      let passed = this.duration - this.minutes;
      if (passed < newTomatoDuration || (passed === newTomatoDuration && this.seconds >= 0)) {
        this.duration = newTomatoDuration;  
        localStorage.duration = newTomatoDuration;
        this.minutes = newTomatoDuration - passed;
        localStorage.minutes = this.minutes;
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
    localStorage.shortDuration = newShortDuration;
    if (this.current === "short") {
      let passed = this.duration - this.minutes;
      if (passed < newShortDuration || (passed === newShortDuration && this.seconds > 0)) {
        this.duration = newShortDuration;
        localStorage.duration = newShortDuration;
        this.minutes = newShortDuration - passed;
        localStorage.minutes = this.minutes;
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
    localStorage.longDuration = newLongDuration;
    if (this.current === "long") {
      let passed = this.duration - this.minutes;
      if (passed < newLongDuration || (passed === newLongDuration && this.seconds > 0)) {
        this.duration = newLongDuration;
        localStorage.duration = newLongDuration;
        this.minutes = newLongDuration - passed;
        localStorage.minutes = this.minutes;
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
  autoSwitchTasks: false,
  autoCheckTasks: false,

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
        localStorage.duration = this.duration;
        this.curr = "tomato";
        localStorage.current = "tomato";
        this.reset();
        break;
      case "short":
        this.pause();
        this.duration = this.shortDuration;
        this.curr = "short";
        localStorage.current = "short";
        this.reset();
        break;
      case "long":
        this.pause();
        this.duration = this.longDuration;
        this.curr = "long";
        localStorage.current = "long";
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
    localStorage.paused = "false";
    this.timer = setInterval(() => this.update(), 1000);
  },

  update() {
    if (this.minutes === 0 && this.seconds === 0) {
      this.finishInterval();
    } else if (!this.paused) {
      if (this.seconds > 0) {
        this.seconds--;
        localStorage.seconds = this.seconds.toString();
        console.log(`${this.minutes}:${this.seconds}`);   
      } else if (this.seconds === 0) {
        this.minutes--;
        localStorage.minutes = this.minutes;
        this.seconds = 59;    
        localStorage.seconds = this.seconds;
        console.log(`${this.minutes}:${this.seconds}`);
      } 
    }
  },

  pause() {
    if (this.paused === false) {
      clearInterval(this.timer);
      this.paused = true;
      localStorage.paused = true;
    }
  },

  reset() {
    this.pause();
    this.minutes = this.duration;
    localStorage.minutes = this.minutes;
    this.seconds = 0;
    localStorage.seconds = 0;
  },

  finishInterval() {
    if (!this.paused) {
      this.pause();
      if (this.current === "tomato") {
        this.tomatoesTotal++;   
        localStorage.tomatoesTotal = this.tomatoesTotal;
        this.tomatoesInCycle++;
        localStorage.tomatoesInCycle = this.tomatoesInCycle;
        if (this.tomatoesInCycle === this.longInterval) {
          this.tomatoesInCycle = 0;
          localStorage.tomatoesInCycle = 0;
          this.current = "long";
        } else {
          this.current = "short";
        }
        if (this.currentTask) {
          let test = new RegExp(`^${this.currentTask.name}K3AVskU2o28b2MW`);
          let filteredTasks = taskList.taskList.filter((key) => {
            if (key.match(test)) return true;
            return false;
          });
          let position = filteredTasks.indexOf(this.currentTask.fullName);
          taskList.changeTomatoesDone(this.currentTask.name, this.currentTask.tomatoesDone + 1, position);
          if (
            this.currentTask.tomatoesDone === this.currentTask.tomatoesToDo
            && this.autoCheckTasks === true
          ) {
            taskList.checkTask(this.currentTask.name, position);
            if (
              this.autoSwitchTasks === true
              && taskList.taskList.indexOf(this.currentTask.fullName) < taskList.taskList.length - 1
            ) {
              let nextTaskFullName = taskList.taskList[taskList.taskList.indexOf(this.currentTask.fullName) + 1];
              let nextTask = taskList[nextTaskFullName].name; 
              let test = new RegExp(`^${nextTask}K3AVskU2o28b2MW`);
              let filteredTasks = taskList.taskList.filter((key) => {
                if (key.match(test)) return true;
                return false;
              });
              let nextPosition = filteredTasks.indexOf(nextTaskFullName);
              this.switchTask(nextTask, nextPosition);
            }
          }
        }
        console.log(`It's time for a break. You have ${this.duration} minutes.`); 
        if (this.autoStartBreaks === true) this.start();
      } else if (this.current === "short" || this.current === "long") {
        this.current = "tomato";
        console.log("Your break is over. Get to work!"); 
        if (this.autoStartTomatoes === true) this.start();
      }
    } else {
      console.error("Can't use this method when the timer isn't active.");
    }
  },

  clearCount() {
    this.tomatoesInCycle = 0;
    this.tomatoesTotal = 0;
    localStorage.tomatoesInCycle = "0";
    localStorage.tomatoesInCycle = "0";
    this.current = "tomato";
  },

  currentTask: undefined,
  switchTask(name, position) {
    let test = new RegExp(`^${name}K3AVskU2o28b2MW`);
    let filteredTasks = taskList.taskList.filter((key) => {
      if (key.match(test)) return true;
      return false;
    });
    let isThereSuchTask = filteredTasks.length > 0;
    let areThereDuplicates = filteredTasks.length > 1;
    if (isThereSuchTask) {
      if (areThereDuplicates) {
        if (position === undefined) {
          let filteredTasksString = "";
          filteredTasks.forEach((fullName, index) => {
            filteredTasksString += `\n\n${index}: ${name}, tomatoes done: ${taskList[fullName].tomatoesDone}, tomatoes to do: ${taskList[fullName].tomatoesToDo}`;
            if (taskList[fullName].completed === true) {
              filteredTasksString += ", completed";
            } else if (taskList[fullName].completed === false) {
              filteredTasksString += ", isn't completed";
            }
            if (taskList[fullName].note && taskList[fullName].note !== "") {
              filteredTasksString += `, note: ${taskList[fullName].note}`;
            }
            filteredTasksString += `, created: ${format(taskList[fullName].created, "HH:mm:ss dd/MM/y")}`
            filteredTasksString += ".";
          });
          position = prompt(`There are several tasks with this name:${filteredTasksString}\n\nWhich one do you wish to focus on at the moment? (Type in the number.)`);
        }
        if (
          Number.parseInt(position) < 0
          || Number.parseInt(position) >= filteredTasks.length
        ) {
          return new Error("Wrong number. Try again.");
        }
      } else {
        position = 0;
      }
      let fullName = filteredTasks[position];
      this.currentTask = taskList[fullName];
      localStorage.setItem("currentTask", `${fullName}`);
    } else {
      console.error("There's no such task. Provide a valid task name in the string format.");
    }
  }
};

export function initializeTimer() {
  if (!localStorage.tomatoDuration) {
    localStorage.tomatoDuration = timer.tomatoDuration.toString();
  } else {
    timer.tomatoDur = Number.parseInt(localStorage.tomatoDuration);
  }

  if (!localStorage.shortDuration) {
    localStorage.shortDuration = timer.shortDuration.toString();
  } else {
    timer.shortDur = Number.parseInt(localStorage.shortDuration);
  }

  if (!localStorage.longDuration) {
    localStorage.longDuration = timer.longDuration.toString();
  } else {
    timer.longDur = Number.parseInt(localStorage.longDuration);
  }

  if (!localStorage.longInterval) {
    localStorage.longInterval = timer.longInterval.toString();
  } else {
    timer.longInterval = Number.parseInt(localStorage.longInterval);
  }

  if (!localStorage.autoStartTomatoes) {
    localStorage.autoStartTomatoes = timer.autoStartTomatoes.toString();
  } else if (localStorage.autoStartTomatoes === "true") {
    timer.autoStartTomatoes = true;
  } else if (localStorage.autoStartTomatoes === "false") {
    timer.autoStartTomatoes = false;
  }

  if (!localStorage.autoStartBreaks) {
    localStorage.autoStartBreaks = timer.autoStartBreaks.toString();
  } else if (localStorage.autoStartBreaks === "true") {
    timer.autoStartBreaks = true;
  } else if (localStorage.autoStartBreaks === "false") {
    timer.autoStartBreaks = false;
  }

  if (!localStorage.autoSwitchTasks) {
    localStorage.autoSwitchTasks = timer.autoSwitchTasks.toString();
  } else if (localStorage.autoSwitchTasks === "true") {
    timer.autoSwitchTasks = true;
  } else if (localStorage.autoCheckTasks === "false") {
    timer.autoCheckTasks = false;
  }

  if (!localStorage.autoCheckTasks) {
    localStorage.autoCheckTasks = timer.autoCheckTasks.toString();
  } else if (localStorage.autoCheckTasks === "true") {
    timer.autoCheckTasks = true;
  } else if (localStorage.autoCheckTasks === "false") {
    timer.autoCheckTasks = false;
  }

  if (!localStorage.current) {
    localStorage.current = timer.current;
  } else {
    timer.curr = localStorage.current;
  }

  if (!localStorage.tomatoesTotal) {
    localStorage.tomatoesTotal = timer.tomatoesTotal.toString();
  } else {
    timer.tomatoesTotal = Number.parseInt(localStorage.tomatoesTotal);
  }

  if (!localStorage.duration) {
    localStorage.duration = timer.duration.toString();
  } else {
    timer.duration = Number.parseInt(localStorage.duration);
  }

  if (localStorage.minutes === undefined) {
    localStorage.minutes = timer.minutes.toString();
  } else {
    timer.minutes = Number.parseInt(localStorage.minutes);
  }

  if (localStorage.seconds === undefined) {
    localStorage.seconds = timer.seconds.toString();
  } else {
    timer.seconds = Number.parseInt(localStorage.seconds);
  }

  if (localStorage.paused === undefined) {
    localStorage.paused = "true";
  } else if (localStorage.paused === "false") {
    timer.start();
  }

  if (localStorage.currentTask) {
    timer.currentTask = taskList[localStorage.currentTask];
  }
}