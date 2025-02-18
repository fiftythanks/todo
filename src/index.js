import "./style.css";
import "./index.html";
import { settings } from "./settings.js";
import { timer, initializeTimer } from "./timer.js";
import { taskList, initializeTaskList } from "./todo.js";

function initializeApp() {
  initializeTaskList();
  initializeTimer();
}
initializeApp();
window.timer = timer;
window.settings = settings;
console.log("To control the timer, you must type timer.[command]. To access settings, you must type settings.[command]. The timer has the following commands: \n•.start() \n•.pause() \n•.reset() \n•.clearCount() \n•.finishInterval() (do not use unless the timer is currently active) \n\nThe menu has the following commands: \n•.setTomatoDuration(mins) \n•.setShortDuration(mins) \n•.setLongDuration(mins) \n•.setWhenLongStarts(tomatoes before a long break) \n•.toggleAutoStartTomatoes() \n•.toggleAutoStartBreaks() \n\nThe app uses local storage of your computer. When you open the app, it uses the information from the previous session. If you wish to set default settings, you can type settings.returnToDefaults().");

window.taskList = taskList;
console.log("Also, you can control the task list. \n\nTo add a new task, type \"taskList.createTask(name, tomatoes)\", where name is the name of the task in the string format and tomatoes is the number of tomatoes to do to complete the task, the number should be provided in the number format as a positive integer. \n\nTo remove a task from the task list, type \"taskList.removeTask(name)\", where name is the name of a new task in the string format. \n\nTo add a note to a task, type \"taskList.addNoteTo(name, noteText)\", where name is the name of the task you want to add the note to, and noteText is the note itself, both must be provided in the string format. \n\nTo change the name of a task, type \"changeNameOf(name, newName)\", where name is the name of the task whose name you want to change and newName is the name you want to change it to, both in the string format. \n\nTo complete a task, type \"taskList.completeTask(name)\", where name is the name of the task in the string format. \n\nTo change how many tomatoes a task should require to be completed, type \"taskList.changeTomatoesToDo(name, newTomatoesToDo)\", where name is the name of the task in the string format and newTomatoesToDo is the new positive integer number of tomatoes to accomplish the task, in the number format. \n\nTo change the amount of tomatoes you have already done doing a particular task, type \"taskList.changeTomatoesDone(name, newTomatoesDone)\", where name is the name of the task in the string format and newTomatoesDone is the new positive integer number of tomatoes done doing the task, in the number format. \n\nTo clear the task list, type \"taskList.clear()\".");