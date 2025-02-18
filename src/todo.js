import { timer } from "./timer.js";

class Task {
  constructor(name, tomatoes) {
    this.name = name;
    this.tomatoesToDo = tomatoes;
    this.tomatoesDone = 0;
    this.completed = false;
    this.note = undefined;
    localStorage.setItem(`${name}TomatoesToDo`, tomatoes.toString());
    localStorage.setItem(`${name}TomatoesDone`, "0");
    localStorage.setItem(`${name}Completed`, "false");
  }
}

export const taskList = {
  taskList: [],
  createTask(name, tomatoes) {
    if (!Object.hasOwn(this, name)) {
      this[name] = new Task(name, tomatoes);
      this.taskList.push(name);
      localStorage.taskList = JSON.stringify(this.taskList);
    } else {
      console.error("A task with this name already exists. Each task has to have a unique name.");
    }
  },
  removeTask(name) {
    if (Object.hasOwn(this, name)) {
      if (timer.currentTask === this[name]) {
        timer.currentTask = undefined;
        localStorage.removeItem("currentTask");
      }
      delete this[name];
      localStorage.removeItem(`${name}TomatoesToDo`);
      localStorage.removeItem(`${name}TomatoesDone`);
      localStorage.removeItem(`${name}Completed`);
      if (localStorage[`${name}Note`]) localStorage.removeItem(`${name}Note`);
      this.taskList.splice(this.taskList.indexOf(name), 1);
      localStorage.taskList = JSON.stringify(this.taskList);
    } else {
      console.error("There's no task with this name.");
    }
  },
  addNoteTo(name, noteText) {
    if (Object.hasOwn(this, name)) {
      if (typeof noteText !== "string") noteText.toString();
      this[name].note = noteText;
      localStorage[`${name}Note`] = noteText;
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },
  removeNoteFrom(name) {
    if (Object.hasOwn(this, name)) {
      this[name].note = undefined;
      localStorage.removeItem(`${name}Note`);
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },

  changeNameOf(name, newName) {
    if (Object.hasOwn(this, name)) {
      if (typeof newName === "string") {
        this.createTask(newName, this[name].tomatoesToDo);
        this[newName].tomatoesDone = this[name].tomatoesDone;
        this[newName].completed = this[name].completed;
        this[newName].note = this[name].note;
        if (timer.currentTask === this[name]) {
          timer.currentTask = this[newName];
          localStorage.currentTask = newName;
        }
        this.removeTask(name);
        localStorage.setItem(
          `${newName}TomatoesToDo`,
          this[newName].tomatoesToDo,
        );
        localStorage.setItem(
          `${newName}TomatoesDone`,
          this[newName].tomatoesDone,
        );
        localStorage.setItem(
          `${newName}Completed`,
          this[newName].completed,
        );
        if (!this[newName].note) {
          localStorage.setItem(`${newName}Note`, this[newName].note);
        }
      } else {
        console.error("Provide a string as a new name for the task.");
      }
    } else {
      console.error("There's no task with the provided name.");
    }
  },
  completeTask(name) {
    this[name].completed = true;
    localStorage[`${name}Completed`] = "true";
  },
  changeTomatoesToDo(name, newTomatoesToDo) {
    if (Object.hasOwn(this, name)) {
      if (
        typeof newTomatoesToDo === "number" 
        && Number.isInteger(newTomatoesToDo)
        && newTomatoesToDo >= 0
      ) {
        this[name].tomatoesToDo = newTomatoesToDo;
        localStorage[`${name}TomatoesToDo`] = newTomatoesToDo.toString();
      } else {
        console.error("Provide a valid number of tomatoes. It must be a positive integer.")
      }
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },
  changeTomatoesDone(name, newTomatoesDone) {
    if (Object.hasOwn(this, name)) {
      if (
        typeof newTomatoesDone === "number" 
        && Number.isInteger(newTomatoesDone)
        && newTomatoesDone >= 0
      ) {
        this[name].tomatoesDone = newTomatoesDone;
        localStorage[`${name}TomatoesDone`] = newTomatoesDone.toString();
      } else {
        console.error("Provide a valid number of tomatoes. It must be a positive integer.")
      }
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },
  clear() {
    for (let taskName of this.taskList) {
      this.removeTask(taskName);
    }
  }
}

export function initializeTaskList() {
  if (localStorage.taskList) {
    if (localStorage.taskList !== "[]") {
      taskList.taskList = JSON.parse(localStorage.taskList);
      for (let taskName of taskList.taskList) {
        let note;
        if (localStorage[`${taskName}Note`]) {
          note = localStorage[`${taskName}Note`];
        } else {
          note = undefined;
        }
        taskList[taskName] = {
          note,
          name: taskName,
          tomatoesToDo: Number.parseInt(localStorage[`${taskName}TomatoesToDo`]),
          tomatoesDone: Number.parseInt(localStorage[`${taskName}TomatoesDone`]),
          completed: JSON.parse(localStorage[`${taskName}Completed`]),
        };
      }
    } else {
      localStorage.taskList = "[]";
    }
  } else {
    taskList.createTask("Read Zorich", 2);
    taskList.createTask("Read Sivukhin", 2);
    taskList.createTask("Move through The Odin Project curriculum", 4);
  }
}