import { taskList } from "./todo.js";
import { renderProgressBar } from "./progress.js";

function setTimer(m, s) {
  const clock = document.querySelector(".clock");
  const clockMins = clock.querySelector(".minutes");
  const clockSec = clock.querySelector(".seconds");
  function convertTime(number) {
    if (Number.parseInt(number) < 10) {
      number = `0${number}`;
    }
    return number.toString();
  }
  if (m !== undefined) {
    m = convertTime(m);
    clockMins.textContent = m;
  }

  if (s !== undefined) {
    s = convertTime(s);
    clockSec.textContent = s;
  }
}
function changeCurrentInterval(name) {
  const btns = document.querySelector(".controls");
  const short = btns.querySelector(".short");
  const long = btns.querySelector(".long");
  const tomato = btns.querySelector(".tomato");
  switch (name) {
    case "short":
      if (!Array.from(short.classList).includes("active")) {
        short.classList.add("active");
        long.classList.remove("active");
        tomato.classList.remove("active");
      }
      break;
    case "long":
      if (!Array.from(long.classList).includes("active")) {
        short.classList.remove("active");
        long.classList.add("active");
        tomato.classList.remove("active");
      }
      break;
    case "tomato":
      if (!Array.from(tomato.classList).includes("active")) {
        short.classList.remove("active");
        long.classList.remove("active");
        tomato.classList.add("active");
      }
      break;
    default:
      return new Error("Incorrect interval");
  }
}

export const timer = {
  tomatoDur: 45,
  set tomatoDuration(newTomatoDuration) {
    this.tomatoDur = newTomatoDuration;
    localStorage.setItem("tomatoDuration", newTomatoDuration.toString());
    if (this.current === "tomato") {
      let passed = this.duration - this.minutes;
      if (passed < newTomatoDuration || (passed === newTomatoDuration && this.seconds >= 0)) {
        this.duration = newTomatoDuration;  
        localStorage.duration = newTomatoDuration;
        this.minutes = newTomatoDuration - passed;
        localStorage.minutes = this.minutes;
        setTimer(this.minutes);
      } else {  
        this.finishInterval();
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
        setTimer(this.minutes);
      } else {
        this.finishInterval();
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
        setTimer(this.minutes);
      } else {
        this.finishInterval();
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
        changeCurrentInterval("tomato");
        localStorage.current = "tomato";
        this.reset();
        setTimer(this.minutes, this.seconds);
        break;
      case "short":
        this.pause();
        this.duration = this.shortDuration;
        this.curr = "short";
        changeCurrentInterval("short");
        localStorage.current = "short";
        this.reset();
        setTimer(this.minutes, this.seconds);
        break;
      case "long":
        this.pause();
        this.duration = this.longDuration;
        this.curr = "long";
        changeCurrentInterval("long");
        localStorage.current = "long";
        this.reset();
        setTimer(this.minutes, this.seconds);
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
    if (this.paused === true) {
      this.paused = false;
      localStorage.paused = "false";
      this.timer = setInterval(() => this.update(), 1000);
      document.querySelector(".timer").querySelector(".start").querySelector("button").textContent = "Pause";
    }
  },

  update() {
    if (this.minutes === 0 && this.seconds === 0) {
      this.finishInterval();
    } else if (!this.paused) {
      if (this.seconds > 0) {
        this.seconds--;
        localStorage.seconds = this.seconds.toString(); 
        setTimer(undefined, this.seconds); 
      } else if (this.seconds === 0) {
        this.minutes--;
        localStorage.minutes = this.minutes;
        this.seconds = 59;    
        localStorage.seconds = this.seconds;
        setTimer(this.minutes, this.seconds);
      }
    }
    renderProgressBar();
  },

    pause() {
    if (this.paused === false) {
      clearInterval(this.timer);
      this.paused = true;
      localStorage.paused = true;
      document.querySelector(".timer").querySelector(".start").querySelector("button").textContent = "Start"; 
    }
  },

  reset() {
    this.pause();
    this.minutes = this.duration;
    localStorage.minutes = this.minutes;
    this.seconds = 0;
    localStorage.seconds = 0;
    setTimer(this.minutes, this.seconds);
  },

  finishInterval() {
    let wasInitiallyPaused = true;
    if (!this.paused) {
      this.pause();
      wasInitiallyPaused = false;
    }
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
        let position = taskList.getTaskPosition(this.currentTask.fullName);
        taskList.changeTomatoesDone(this.currentTask.name, this.currentTask.tomatoesDone + 1, position);
        if (
          this.currentTask.tomatoesDone === this.currentTask.tomatoesToDo
          && this.currentTask.completed === false
          && this.autoCheckTasks === true
        ) {
          taskList.checkTask(this.currentTask.name, position);
          if (
            this.autoSwitchTasks === true
          ) {
            let unfinishedTasks = taskList.taskList.filter((fullName) => {
              let task = taskList[fullName];
              return task.tomatoesDone < task.tomatoesToDo ? true : false;
            });
            if (unfinishedTasks.length > 0) {
              let inFront = unfinishedTasks.filter((fullName) => {
                let currentIndex = taskList.taskList.indexOf(this.currentTask.fullName);
                return taskList.taskList.indexOf(fullName) > currentIndex ? true : false;
              });
              if (inFront.length > 0) {
                let nextTaskName = taskList[inFront[0]].name;
                let nextTaskFullName = inFront[0];
                let nextPosition = taskList.getTaskPosition(nextTaskFullName);
                this.switchTask(nextTaskName, nextPosition);
              } else {
                let currentIndex = taskList.taskList.indexOf(this.currentTask.fullName);
                let beforeCurrent = unfinishedTasks.filter((fullName) => {
                  return taskList.taskList.indexOf(fullName) < currentIndex ? true : false;
                });
                if (beforeCurrent.length > 0) {
                  let nextTaskFullName = beforeCurrent.at(-1);
                  let nextTaskName = taskList[nextTaskFullName].name;
                  let nextPosition = taskList.getTaskPosition(nextTaskFullName);
                  this.switchTask(nextTaskName, nextPosition);
                }
              }
            }
          }
        }
      }
      if (this.autoStartBreaks === true && !wasInitiallyPaused) this.start();
    } else if (this.current === "short" || this.current === "long") {
      this.current = "tomato"; 
      if (this.autoStartTomatoes === true && !wasInitiallyPaused) this.start();
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
    if (taskList.doesTaskExist(name)) {
      if (taskList.areThereDuplicates(name)) {
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
          || Number.parseInt(position) >= taskList.areThereDuplicates(name)
        ) {
          return new Error("Wrong number. Try again.");
        }
      } else {
        position = 0;
      }
      let fullName = taskList.getFullName(name, position);
      this.currentTask = taskList[fullName];
      localStorage.setItem("currentTask", `${fullName}`);
      let previousCurrentTask = document.querySelector(".current-task");
      if (previousCurrentTask !== null) {
        previousCurrentTask.classList.toggle("current-task");
      }
      let newCurrentTask = document.querySelector(`#${this.currentTask.fullName.replaceAll(" ", "")}`);
      newCurrentTask.classList.toggle("current-task");
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
    changeCurrentInterval(timer.current);
  } else {
    timer.curr = localStorage.current;
    changeCurrentInterval(timer.current);
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
    setTimer(timer.minutes);
  } else {
    timer.minutes = Number.parseInt(localStorage.minutes);
    setTimer(timer.minutes);
  }

  if (localStorage.seconds === undefined) {
    localStorage.seconds = timer.seconds.toString();
    setTimer(undefined, timer.seconds);
  } else {
    timer.seconds = Number.parseInt(localStorage.seconds);
    setTimer(undefined, timer.seconds);
  }

  if (localStorage.paused === undefined) {
    localStorage.paused = "true";
  } else if (localStorage.paused === "false") {
    timer.start();
    document.querySelector(".timer").querySelector(".start").querySelector("button").textContent = "Pause";
  }

  if (localStorage.currentTask) {
    if (Object.hasOwn(taskList, localStorage.currentTask)) {
      timer.currentTask = taskList[localStorage.currentTask];
      // document.querySelector(`#${timer.currentTask.fullName.replaceAll(" ", "")}`).classList.toggle("current-task");
    } else {
      localStorage.removeItem("currentTask");
    }
  }
}