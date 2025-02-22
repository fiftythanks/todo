import { timer } from "./timer.js";
import { parseJSON, format } from "date-fns";

class Task {
  constructor(name, tomatoes) {
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
    // +*?^$\.[]{}()|/
    let nameForTest = name;
    if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
    if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
    if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
    if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
    if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
    if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
    if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
    if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
    if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
    if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
    if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
    if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
    if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
    if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
    if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");

    
    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((key) => {
      if (key.match(test)) return true;
      return false;
    });
    let isThereSuchTask = filteredTasks.length > 0;
    if (!isThereSuchTask) {
      let fullName = `${name}K3AVskU2o28b2MW0`;
      this[fullName] = new Task(fullName, tomatoes);
      this[fullName].name = name;
      localStorage.setItem(`${fullName}Name`, name);
      this[fullName].fullName = fullName;
      localStorage.setItem(`${fullName}FullName`, fullName);
      this.taskList.push(fullName);
      localStorage.taskList = JSON.stringify(this.taskList);
      this[fullName].created = new Date();
      localStorage[`${fullName}Created`] = JSON.stringify(this[fullName].created);
      return fullName;
    } else {
      let identifier = 0;
      let fullName = `${name}K3AVskU2o28b2MW${identifier}`;
      while (this.taskList.includes(fullName)) {
        fullName = `${name}K3AVskU2o28b2MW${++identifier}`;
      }
      this[fullName] = new Task(fullName, tomatoes);
      this[fullName].name = name;
      localStorage.setItem(`${fullName}Name`, name);
      this[fullName].fullName = fullName;
      localStorage.setItem(`${fullName}FullName`, fullName);
      this.taskList.push(fullName);
      localStorage.taskList = JSON.stringify(this.taskList);
      this[fullName].created = new Date();
      localStorage[`${fullName}Created`] = JSON.stringify(this[fullName].created);
      return fullName;
    }
  },

  removeTask(name, position) {
    // +*?^$\.[]{}()|/
    let nameForTest = name;
    if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
    if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
    if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
    if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
    if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
    if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
    if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
    if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
    if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
    if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
    if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
    if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
    if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
    if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
    if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");

    
    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((key) => {
      if (key.match(test)) return true;
      return false;
    });
    let isThereSuchTask = filteredTasks.length > 0;
    let areThereDuplicates = filteredTasks.length > 1;
    if (isThereSuchTask) {
      if (!areThereDuplicates) {
        if (position === 0 || position === undefined) {
          name = filteredTasks[0];
          if (timer.currentTask === this[name]) {
            timer.currentTask = undefined;
            localStorage.removeItem("currentTask");
          }
          delete this[name];
          localStorage.removeItem(`${name}Name`);
          localStorage.removeItem(`${name}FullName`);
          localStorage.removeItem(`${name}TomatoesToDo`);
          localStorage.removeItem(`${name}TomatoesDone`);
          localStorage.removeItem(`${name}Completed`);
          if (localStorage[`${name}Note`]) localStorage.removeItem(`${name}Note`);
          localStorage.removeItem(`${name}Created`)
          this.taskList.splice(this.taskList.indexOf(name), 1);
          localStorage.taskList = JSON.stringify(this.taskList);
        } else {
          console.error("There's only one such task. Either don't provide the second argument or provide 0 as the second argument.");
        }
      } else {
        if (position === undefined) {
          let filteredTasksString = "";
          filteredTasks.forEach((fullName, index) => {
            filteredTasksString += `\n\n${index}: ${name}, tomatoes done: ${this[fullName].tomatoesDone}, tomatoes to do: ${this[fullName].tomatoesToDo}`;
            if (this[fullName].completed === true) {
              filteredTasksString += ", completed";
            } else if (this[fullName].completed === false) {
              filteredTasksString += ", isn't completed";
            }
            if (this[fullName].note && this[fullName].note !== "") {
              filteredTasksString += `, note: ${this[fullName].note}`;
            }
            filteredTasksString += `, created: ${format(this[fullName].created, "HH:mm:ss dd/MM/y")}`
            filteredTasksString += ".";
          });
          position = prompt(`There are several tasks with this name:${filteredTasksString}\n\nWhich one do you want to remove? (Type in the number.)`);
        }
        if (
          Number.parseInt(position) >= 0
          && Number.parseInt(position) < filteredTasks.length
        ) {
          name = filteredTasks[position];
          if (timer.currentTask === this[name]) {
            timer.currentTask = undefined;
            localStorage.removeItem("currentTask");
          }
          delete this[name];
          localStorage.removeItem(`${name}Name`);
          localStorage.removeItem(`${name}FullName`);
          localStorage.removeItem(`${name}TomatoesToDo`);
          localStorage.removeItem(`${name}TomatoesDone`);
          localStorage.removeItem(`${name}Completed`);
          if (localStorage[`${name}Note`]) localStorage.removeItem(`${name}Note`);
          localStorage.removeItem(`${name}Created`)
          this.taskList.splice(this.taskList.indexOf(name), 1);
          localStorage.taskList = JSON.stringify(this.taskList);
        } else {
          console.error("Wrong number. Try again.");
        }
      }
    } else {
      console.error("There's no task with this name.");
    }
  },
  addNoteTo(name, noteText, position) {
    // +*?^$\.[]{}()|/
    let nameForTest = name;
    if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
    if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
    if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
    if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
    if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
    if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
    if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
    if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
    if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
    if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
    if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
    if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
    if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
    if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
    if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");

    
    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((fullName) => {
      if (fullName.match(test)) return true;
      return false;
    });
    let isThereSuchTask = filteredTasks.length > 0;
    let areThereDuplicates = filteredTasks.length > 1;
    if (isThereSuchTask) {
      if (!areThereDuplicates) {
        if (Number.parseInt(position) === 0 || position === undefined) {
          name = filteredTasks[0];
          if (typeof noteText !== "string") noteText.toString();
          this[name].note = noteText;
          localStorage[`${name}Note`] = noteText;
        } else {
          console.error("Provide a valid position. There's only one such element the only valid position is 0. You can omit the third parameter, and the result will be the same as if you passed 0 to the method.");
        }
      } else {
        if (position === undefined) {
          let filteredTasksString = "";
          filteredTasks.forEach((fullName, index) => {
            filteredTasksString += `\n\n${index}: ${name}, tomatoes done: ${this[fullName].tomatoesDone}, tomatoes to do: ${this[fullName].tomatoesToDo}`;
            if (this[fullName].completed === true) {
              filteredTasksString += ", completed";
            } else if (this[fullName].completed === false) {
              filteredTasksString += ", isn't completed";
            }
            if (this[fullName].note && this[fullName].note !== "") {
              filteredTasksString += `, note: ${this[fullName].note}`;
            }
            filteredTasksString += `, created: ${format(this[fullName].created, "HH:mm:ss dd/MM/y")}`
            filteredTasksString += ".";
          });
          position = prompt(`There are several tasks with this name:${filteredTasksString}\n\nWhich one do you want to remove? (Type in the number.)`);
        }
        if (
          Number.parseInt(position) >= 0
          && Number.parseInt(position) < filteredTasks.length
        ) {
          name = filteredTasks[position];
          if (typeof noteText !== "string") noteText.toString();
          this[name].note = noteText;
          localStorage[`${name}Note`] = noteText;
        } else {
          console.error("Wrong number. Try again.");
        }
      }
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },
  removeNoteFrom(name, position) {
    // +*?^$\.[]{}()|/
    let nameForTest = name;
    if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
    if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
    if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
    if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
    if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
    if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
    if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
    if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
    if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
    if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
    if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
    if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
    if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
    if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
    if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");

    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((key) => {
      if (key.match(test)) return true;
      return false;
    });
    let isThereSuchTask = filteredTasks.length > 0;
    let areThereDuplicates = filteredTasks.length > 1;
    if (isThereSuchTask) {
      if (!areThereDuplicates) {
        if (Number.parseInt(position) === 0 || position === undefined) {
          name = filteredTasks[0];
          this[name].note = undefined;
          localStorage.removeItem(`${name}Note`);
        } else {
          console.error("Provide a valid position. There's only one such element the only valid position is 0. You can omit the third parameter, and the result will be the same as if you passed 0 to the method.");
        }
      } else {
        if (position === undefined) {
          let filteredTasksString = "";
          filteredTasks.forEach((fullName, index) => {
            filteredTasksString += `\n\n${index}: ${name}, tomatoes done: ${this[fullName].tomatoesDone}, tomatoes to do: ${this[fullName].tomatoesToDo}`;
            if (this[fullName].completed === true) {
              filteredTasksString += ", completed";
            } else if (this[fullName].completed === false) {
              filteredTasksString += ", isn't completed";
            }
            if (this[fullName].note && this[fullName].note !== "") {
              filteredTasksString += `, note: ${this[fullName].note}`;
            }
            filteredTasksString += `, created: ${format(this[fullName].created, "HH:mm:ss dd/MM/y")}`
            filteredTasksString += ".";
          });
          position = prompt(`There are several tasks with this name:${filteredTasksString}\n\nWhich one do you want to remove? (Type in the number.)`);
        }
        if (
          Number.parseInt(position) >= 0
          && Number.parseInt(position) < filteredTasks.length
        ) {
          name = filteredTasks[position];
          this[name].note = undefined;
          localStorage.removeItem(`${name}Note`);
        } else {
          console.error("Wrong number. Try again.");
        }
      }
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },

  changeNameOf(name, newName, position) {
    // +*?^$\.[]{}()|/
    function returnAppropriate(name) {
      let nameForTest = name;
      if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
      if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
      if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
      if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
      if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
      if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
      if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
      if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
      if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
      if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
      if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
      if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
      if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
      if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
      if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");
      return nameForTest;
    }
    let nameForTest = returnAppropriate(name);
    
    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((key) => {
      if (key.match(test)) return true;
      return false;
    });
    let isThereSuchTask = filteredTasks.length > 0;
    let areThereDuplicates = filteredTasks.length > 1;
    if (isThereSuchTask) {
      if (typeof newName === "string") {
        if (areThereDuplicates) {
          if (position === undefined) {
            let filteredTasksString = "";
            filteredTasks.forEach((fullName, index) => {
              filteredTasksString += `\n\n${index}: ${name}, tomatoes done: ${this[fullName].tomatoesDone}, tomatoes to do: ${this[fullName].tomatoesToDo}`;
              if (this[fullName].completed === true) {
                filteredTasksString += ", completed";
              } else if (this[fullName].completed === false) {
                filteredTasksString += ", isn't completed";
              }
              if (this[fullName].note && this[fullName].note !== "") {
                filteredTasksString += `, note: ${this[fullName].note}`;
              }
              filteredTasksString += `, created: ${format(this[fullName].created, "HH:mm:ss dd/MM/y")}`
              filteredTasksString += ".";
            });
            position = prompt(`There are several tasks with this name:${filteredTasksString}\n\nWhich one's name do you want to change? (Type in the number.)`);
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
        this.createTask(newName, this[fullName].tomatoesToDo);
        let newNameForTest = returnAppropriate(newName);
        let newTest = new RegExp(`^${newNameForTest}K3AVskU2o28b2MW`);
        let newFilteredTasks = this.taskList.filter((key) => {
          if (key.match(newTest)) return true;
          return false;
        });
        let newTaskPosition = newFilteredTasks.length - 1;
        let newFullName = newFilteredTasks[newTaskPosition];
        this.changeTomatoesDone(newName, this[fullName].tomatoesDone, newTaskPosition);
        if (this[fullName].completed) {
          this.checkTask(newName, newTaskPosition);
        }
        if (this[fullName].note !== undefined && this[fullName].note !== "") {
          this.addNoteTo(newName, this[fullName].note, newTaskPosition);
        }
        this[newFullName].created = this[fullName].created;
        localStorage.setItem(`${newFullName}Created`, JSON.stringify(this[newFullName].created));
        if (timer.currentTask === this[fullName]) {
          timer.currentTask = this[newFullName];
          localStorage.setItem("currentTask", newFullName);
        }
        this.removeTask(name, position);
        return this[newFullName];
      } else {
        console.error("Provide a string as a new name for the task.");
      }
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },

  checkTask(name, position) {
    // +*?^$\.[]{}()|/
    let nameForTest = name;
    if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
    if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
    if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
    if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
    if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
    if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
    if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
    if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
    if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
    if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
    if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
    if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
    if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
    if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
    if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");

    
    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((key) => {
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
            filteredTasksString += `\n\n${index}: ${name}, tomatoes done: ${this[fullName].tomatoesDone}, tomatoes to do: ${this[fullName].tomatoesToDo}`;
            if (this[fullName].completed === true) {
              filteredTasksString += ", completed";
            } else if (this[fullName].completed === false) {
              filteredTasksString += ", isn't completed";
            }
            if (this[fullName].note && this[fullName].note !== "") {
              filteredTasksString += `, note: ${this[fullName].note}`;
            }
            filteredTasksString += `, created: ${format(this[fullName].created, "HH:mm:ss dd/MM/y")}`
            filteredTasksString += ".";
          });
          position = prompt(`There are several tasks with this name:${filteredTasksString}\n\nWhich one do you want to check? (Type in the number.)`);
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
      if (this[fullName].completed === false) {
        this[fullName].completed = true;
        localStorage[`${fullName}Completed`] = "true";
      } else {
        this[fullName].completed = false;
        localStorage[`${fullName}Completed`] = "false";
      }
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },
  changeTomatoesToDo(name, newTomatoesToDo, position) {
    // +*?^$\.[]{}()|/
    let nameForTest = name;
    if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
    if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
    if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
    if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
    if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
    if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
    if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
    if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
    if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
    if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
    if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
    if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
    if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
    if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
    if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");

    
    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((key) => {
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
            filteredTasksString += `\n\n${index}: ${name}, tomatoes done: ${this[fullName].tomatoesDone}, tomatoes to do: ${this[fullName].tomatoesToDo}`;
            if (this[fullName].completed === true) {
              filteredTasksString += ", completed";
            } else if (this[fullName].completed === false) {
              filteredTasksString += ", isn't completed";
            }
            if (this[fullName].note && this[fullName].note !== "") {
              filteredTasksString += `, note: ${this[fullName].note}`;
            }
            filteredTasksString += `, created: ${format(this[fullName].created, "HH:mm:ss dd/MM/y")}`
            filteredTasksString += ".";
          });
          position = prompt(`There are several tasks with this name:${filteredTasksString}\n\nWhich one's estimated number of tomatoes to complete do you want to change? (Type in the number.)`);
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
      if (
        typeof newTomatoesToDo === "number" 
        && Number.isInteger(newTomatoesToDo)
        && newTomatoesToDo >= 0
      ) {
        this[fullName].tomatoesToDo = newTomatoesToDo;
        localStorage.setItem(`${fullName}TomatoesToDo`, newTomatoesToDo.toString());
      } else {
        console.error("Provide a valid number of tomatoes. It must be a positive integer.")
      }
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },

  changeTomatoesDone(name, newTomatoesDone, position) {
    // +*?^$\.[]{}()|/
    let nameForTest = name;
    if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
    if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
    if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
    if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
    if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
    if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
    if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
    if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
    if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
    if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
    if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
    if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
    if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
    if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
    if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");

    
    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((key) => {
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
            filteredTasksString += `\n\n${index}: ${name}, tomatoes done: ${this[fullName].tomatoesDone}, tomatoes to do: ${this[fullName].tomatoesToDo}`;
            if (this[fullName].completed === true) {
              filteredTasksString += ", completed";
            } else if (this[fullName].completed === false) {
              filteredTasksString += ", isn't completed";
            }
            if (this[fullName].note && this[fullName].note !== "") {
              filteredTasksString += `, note: ${this[fullName].note}`;
            }
            filteredTasksString += `, created: ${format(this[fullName].created, "HH:mm:ss dd/MM/y")}`
            filteredTasksString += ".";
          });
          position = prompt(`There are several tasks with this name:${filteredTasksString}\n\nWhich one's number of tomatoes done do you want to change? (Type in the number.)`);
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
      if (
        typeof newTomatoesDone === "number" 
        && Number.isInteger(newTomatoesDone)
        && newTomatoesDone >= 0
      ) {
        this[fullName].tomatoesDone = newTomatoesDone;
        localStorage.setItem(`${fullName}TomatoesDone`, newTomatoesDone.toString());
      } else {
        console.error("Provide a valid number of tomatoes. It must be a positive integer.")
      }
    } else {
      console.error("There's no such task. The first parameter has to be the name of the task.");
    }
  },

  clear() {
    /* 
    1. Identify all tasks with similar simplified names as just one task. Create an array of such tasks.
    2. In a loop, for every one of those tasks, filter .taskList and get filteredTasks array.
    3. In a for loop with a decreasing counter-index, call .removeTask() with the task and the counter-index as arguments.
    */
    let tasks = [];
    this.taskList.forEach((fullName) => {
      let name = fullName.replace(/K3AVskU2o28b2MW.*/g, "");
      let wasCounted = tasks.includes(name);
      if (!wasCounted) tasks.push(name);
    });
    for (let name of tasks) {
      // +*?^$\.[]{}()|/
      let nameForTest = name;
      if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
      if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
      if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
      if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
      if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
      if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
      if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
      if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
      if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
      if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
      if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
      if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
      if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
      if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
      if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");
      
      console.log(nameForTest);
      let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
      let filteredTasks = this.taskList.filter((fullName) => {
        if (fullName.match(test)) return true;
        return false;
      });
      for (let i = filteredTasks.length - 1; i >= 0; i--) {
        this.removeTask(name, i);
      }
    }
  },

  doesTaskExist(name) {
    // +*?^$\.[]{}()|/
    let nameForTest = name;
    if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
    if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
    if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
    if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
    if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
    if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
    if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
    if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
    if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
    if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
    if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
    if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
    if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
    if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
    if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");

    let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
    let filteredTasks = this.taskList.filter((fullName) => {
      if (fullName.match(test)) return true;
      return false;
    });
    return filteredTasks.length > 0;
  },

  areThereDuplicates(name) {
    if (this.doesTaskExist(name)) {
      // +*?^$\.[]{}()|/
      let nameForTest = name;
      if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
      if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
      if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
      if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
      if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
      if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
      if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
      if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
      if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
      if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
      if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
      if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
      if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
      if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
      if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");
      
      let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
      
      let filteredTasks = this.taskList.filter((fullName) => {
        if (fullName.match(test)) return true;
        return false;
      });
      return filteredTasks > 1;
    } else {
      return false;
    }
  },

  getTaskPosition(fullName) {
    if (Object.hasOwn(this, fullName)) {
      let nameForTest = this[fullName].name;
      if (nameForTest.includes("\\")) nameForTest = nameForTest.replaceAll("\\", "\\\\");
      if (nameForTest.includes("+")) nameForTest = nameForTest.replaceAll("+", "\\+");
      if (nameForTest.includes("*")) nameForTest = nameForTest.replaceAll("*", "\\*");
      if (nameForTest.includes("?")) nameForTest = nameForTest.replaceAll("?", "\\?");
      if (nameForTest.includes("^")) nameForTest = nameForTest.replaceAll("^", "\\^");
      if (nameForTest.includes("$")) nameForTest = nameForTest.replaceAll("$", "\\$");
      if (nameForTest.includes(".")) nameForTest = nameForTest.replaceAll(".", "\\.");
      if (nameForTest.includes("[")) nameForTest = nameForTest.replaceAll("[", "\\[");
      if (nameForTest.includes("]")) nameForTest = nameForTest.replaceAll("]", "\\]");
      if (nameForTest.includes("{")) nameForTest = nameForTest.replaceAll("{", "\\{");
      if (nameForTest.includes("}")) nameForTest = nameForTest.replaceAll("}", "\\}");
      if (nameForTest.includes("(")) nameForTest = nameForTest.replaceAll("(", "\\(");
      if (nameForTest.includes(")")) nameForTest = nameForTest.replaceAll(")", "\\)");
      if (nameForTest.includes("|")) nameForTest = nameForTest.replaceAll("|", "\\|");
      if (nameForTest.includes("/")) nameForTest = nameForTest.replaceAll("/", "\\/");
      let test = new RegExp(`^${nameForTest}K3AVskU2o28b2MW`);
      let filteredTasks = this.taskList.filter((fullName) => {
        if (fullName.match(test)) return true;
        return false;
      });
      return filteredTasks.indexOf(fullName);
    } else {
      return new Error("There's no such task.");
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
          name: localStorage[`${taskName}Name`],
          fullName: localStorage[`${taskName}FullName`],
          tomatoesToDo: Number.parseInt(localStorage[`${taskName}TomatoesToDo`]),
          tomatoesDone: Number.parseInt(localStorage[`${taskName}TomatoesDone`]),
          completed: JSON.parse(localStorage[`${taskName}Completed`]),
          created: parseJSON(localStorage[`${taskName}Created`]),
        };
      }
    } else {
      // if the property will for some reason be of an incorrect value
      localStorage.taskList = "[]";
    }
  } else {
    taskList.createTask("Read Zorich", 2);
    taskList.createTask("Read Sivukhin", 2);
    taskList.createTask("Move through The Odin Project curriculum", 4);
  }
}