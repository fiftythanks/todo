import { taskList } from "./todo.js";
import up from "./img/up.svg";
import down from "./img/down.svg";
import cross from "./img/cross.svg";

const list = document.querySelector("ul.tasks");
export function renderItem(itemName) {
  if (Object.hasOwn(taskList, itemName)) {
    const item = taskList[itemName];

    const task = document.createElement("li");
    task.classList.add("task");

    const header = document.createElement("div");
    header.classList.add("main");

    const checkBox = document.createElement("button");
    checkBox.classList.add("check");
    if (item.completed === false) {
      checkBox.textContent = "[ ]";
    } else {
      checkBox.classList.toggle("checked");
      checkBox.textContent = "[x]";
    }
    checkBox.addEventListener("click", () => {
      taskList.checkTask(itemName);
      checkBox.classList.toggle("checked");
      if (item.completed === false) {
        checkBox.textContent = "[ ]";
      } else {
        checkBox.textContent = "[x]";
      }
    });
    header.appendChild(checkBox);

    const taskName = document.createElement("div");
    taskName.classList.add("name");
    taskName.textContent = itemName;
    header.appendChild(taskName);

    const tomatoes = document.createElement("div");
    tomatoes.classList.add("tomatoes");
    tomatoes.innerHTML = `[<span class="done">${item.tomatoesDone}</span>/<span class="to-do">${item.tomatoesToDo}</span>]`;
    header.appendChild(tomatoes);

    task.appendChild(header);

    if (Object.hasOwn(item, "note") && item.note !== "" && item.note !== undefined) {
      const note = document.createElement("p");
      note.classList.add("note");
      note.innerHTML = item.note.replaceAll("\n", "<br>");
      task.appendChild(note);
    }

    list.appendChild(task);     
  } else {
    console.error("There's no such task.")
  }
}

function createTask(e) {
  const btnCreateTaskCopy = e.target.cloneNode(true);
  btnCreateTaskCopy.addEventListener("click", createTask);
  e.target.remove();

  const newTask = document.createElement("li");
  newTask.classList.add("new-task");

  const form = document.createElement("form");
  form.action = "#";
  form.method = "POST";

  const name = document.createElement("input");
  name.type = "text";
  name.name = "name";
  name.id = "name";
  name.placeholder = "Enter task name";
  name.required = "required";
  form.appendChild(name);
  
  const todoLabel = document.createElement("label");
  todoLabel.setAttribute("for", "est-tomatoes");
  todoLabel.textContent = "Estimated tomatoes:";
  form.appendChild(todoLabel);

  const todoWrapper = document.createElement("div");
  todoWrapper.classList.add("est-tomatoes-wrapper");

  const todo = document.createElement("input");
  todo.type = "tel";
  todo.name = "est-tomatoes";
  todo.id = "est-tomatoes";
  todo.value = "0";
  todo.required = "required";
  todo.addEventListener("beforeinput", (e) => {
    let selectionStart = todo.selectionStart;
    let selectionEnd = todo.selectionEnd;
    let selection = todo.value.substring(selectionStart, selectionEnd);
    let numberSelected = selection !== "";
    let inserted;
    let value = Number.parseInt(todo.value);
    if (typeof Number.parseInt(e.data) === "number") {
      inserted = Number.parseInt(e.data);
    }
    if (
      e.data !== null && !(inserted >= 0 && inserted < 10)
      || (
        inserted >= 0 
        && inserted < 10 
        && value >= 10
        && !numberSelected
      )
    ) {
      e.preventDefault();
    } else if (
        inserted >= 0 
        && inserted < 10 
        && value === 0
        && !numberSelected
    ) {
      e.preventDefault();
      todo.value = e.data;
    }
  });
  todo.addEventListener("blur", () => {
    if (todo.value === "") todo.value = "0";
  });
  todoWrapper.appendChild(todo);

  const todoUp = document.createElement("button");
  todoUp.type = "button";
  todoUp.classList.add("up");
  todoUp.innerHTML = `<img src=${up} alt="Up" width="15px" height="15px">`;
  todoUp.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      let timeout;
      let interval;
      if (Number.parseInt(todo.value) < 99) {
        todo.value = `${Number.parseInt(todo.value) + 1}`;
        timeout = setTimeout(() => {
          interval = setInterval(() => {
            if (Number.parseInt(todo.value) < 99) {
              todo.value = `${Number.parseInt(todo.value) + 1}`;
            } else {
              clearInterval(interval);
            }
          }, 150);
          todoUp.addEventListener("mouseout", () => {
            clearInterval(interval);
          });
          todoUp.addEventListener("mouseup", () => {
            clearInterval(interval);
          });
        }, 1000);
        todoUp.addEventListener("mouseout", () => {
          clearTimeout(timeout);
        });
        todoUp.addEventListener("mouseup", () => {
          clearTimeout(timeout);
        });
      }
    }
  });
  todoWrapper.appendChild(todoUp);

  const todoDown = document.createElement("button");
  todoDown.type = "button";
  todoDown.classList.add("down");
  todoDown.innerHTML = `<img src=${down} alt="Down" width="15px" height="15px">`;
  todoDown.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      let timeout;
      let interval;
      if (Number.parseInt(todo.value) > 0) {
        todo.value = `${Number.parseInt(todo.value) - 1}`;
        timeout = setTimeout(() => {
          interval = setInterval(() => {
            if (Number.parseInt(todo.value) > 0) {
              todo.value = `${Number.parseInt(todo.value) - 1}`;
            } else {
              clearInterval(interval);
            }
          }, 150);
          todoDown.addEventListener("mouseout", () => {
            clearInterval(interval);
          });
          todoDown.addEventListener("mouseup", () => {
            clearInterval(interval);
          });
        }, 1000);
        todoDown.addEventListener("mouseout", () => {
          clearTimeout(timeout);
        });
        todoDown.addEventListener("mouseup", () => {
          clearTimeout(timeout);
        });
      }
    }
  });
  todoWrapper.appendChild(todoDown);

  form.appendChild(todoWrapper);

  const addNote = document.createElement("button");
  addNote.type = "button";
  addNote.classList.add("add-note");
  addNote.textContent = "Add Note";
  function addNoteEventListener(node) {
    const nodeCopy = node.cloneNode(true);
    node.addEventListener("click", () => {
      addNoteEventListener(nodeCopy);
      node.remove();
  
      const noteWrapper = document.createElement("div");
      noteWrapper.classList.add("note-wrapper");
  
      const deleteNoteBtn = document.createElement("div");
      deleteNoteBtn.classList.add("delete");
      deleteNoteBtn.addEventListener("click", () => {
        noteWrapper.remove();
        form.insertBefore(nodeCopy, btns);
      });
      noteWrapper.appendChild(deleteNoteBtn);
  
      const note = document.createElement("div");
      note.classList.add("note");
      
      const noteText = document.createElement("textarea");
      noteText.name = "note";
      noteText.placeholder = "Your note ...";
      note.appendChild(noteText);
  
      noteWrapper.appendChild(note);
      form.insertBefore(noteWrapper, btns);
    });
  }
  addNoteEventListener(addNote);
  form.appendChild(addNote);

  const btns = document.createElement("div");
  btns.classList.add("form-submit-wrapper");

  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.classList.add("cancel");
  cancel.textContent = "Cancel";
  cancel.addEventListener("click", () => {
    newTask.remove();
    document.querySelector("main").appendChild(btnCreateTaskCopy);
  });
  btns.appendChild(cancel);

  const save = document.createElement("button");
  save.type = "submit";
  save.classList.add("save");
  save.textContent = "Save";
  btns.appendChild(save);

  form.appendChild(btns);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const tomatoes = Number.parseInt(formData.get("est-tomatoes"));
    taskList.createTask(name, tomatoes);
    if (formData.get("note") !== null) {
      taskList.addNoteTo(name, formData.get("note"));
    }
    newTask.remove();
    renderItem(name); 
    document.querySelector("main").appendChild(btnCreateTaskCopy);
  });

  newTask.appendChild(form);
  list.appendChild(newTask);

  /* 
  Add an event listener to the document that will listen for clicks outside the task creation interface and close the interface on clicks as if the cancel button was clicked on
  */
}

const btnCreateTask = document.querySelector(".create-task");
btnCreateTask.addEventListener("click", createTask);

////////////////////



    