import { timer } from "./timer.js";
import { taskList } from "./todo.js";
import { format } from "date-fns";

export function renderProgressBar() {
  let tomato = timer.tomatoDuration;
  let toDo = taskList.taskList.reduce((total, fullName) => {
    return total += taskList[fullName].tomatoesToDo;
  }, 0);
  let done = taskList.taskList.reduce((total, fullName) => {
    let task = taskList[fullName];
    if (task.tomatoesDone < task.tomatoesToDo) {
      return total += task.tomatoesDone;
    } else {
      return total += task.tomatoesToDo;
    }
  }, 0);
  document.querySelector(".tomatoes-done").textContent = `${done}`;
  document.querySelector(".tomatoes-to-do").textContent = `${toDo}`;
  toDo *= tomato * 60;
  done *= tomato * 60;
  if (timer.current === "tomato") {
    toDo -= (tomato - timer.minutes) * 60 + 60 - timer.seconds;
    done += (tomato - timer.minutes) * 60 + 60 - timer.seconds;
  }
  let width = done / toDo * 100;
  document.querySelector(".progress-bar").style.width = `${width}%`;
  document.querySelector(".done-percent").textContent = `${Math.round(width)}`;
}