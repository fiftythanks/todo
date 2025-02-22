import { taskList } from "./todo.js";
import up from "./img/up.svg";
import down from "./img/down.svg";
import cross from "./img/cross.svg";

const list = document.querySelector("ul.tasks");
export function renderItem(fullName) {
  if (Object.hasOwn(taskList, fullName)) {
    let item = taskList[fullName];

    const task = document.createElement("li");
    task.classList.add("task");
    task.id = fullName;

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
      taskList.checkTask(item.name, taskList.getTaskPosition(fullName));
      checkBox.classList.toggle("checked");
      if (item.completed === false) {
        checkBox.textContent = "[ ]";
      } else {
        checkBox.textContent = "[x]";
      }
    });
    header.appendChild(checkBox);

    function openEditUI(e) {
      Array.from(task.children).forEach((child) => child.remove());
      task.classList.replace("task", "task-edit");
      
      const form = document.createElement("form");
      form.action = "#";
      form.method = "POST";

      const nameField = document.createElement("input");
      nameField.type = "text";
      nameField.name = "name";
      nameField.id = "name";
      nameField.placeholder = "Enter task name";
      nameField.value = item.name;
      nameField.required = "required";
      form.appendChild(nameField);

      const labelWrapper = document.createElement("div");
      labelWrapper.classList.add("label-wrapper");
      labelWrapper.innerHTML = `<label for="tomatoes-done">Done</label> / <label for="tomatoes-to-do">To do</label>`;
      form.appendChild(labelWrapper);

      const tomatoesWrapper = document.createElement("div");
      tomatoesWrapper.classList.add("tomatoes-wrapper");

      const tomatoesDoneWrapper = document.createElement("div");
      tomatoesDoneWrapper.classList.add("tomatoes-done-wrapper");

      const tomatoesDoneField = document.createElement("input");
      tomatoesDoneField.type = "tel";
      tomatoesDoneField.name = "tomatoes-done";
      tomatoesDoneField.id = "tomatoes-done";
      tomatoesDoneField.value = item.tomatoesDone.toString();
      tomatoesDoneField.addEventListener("beforeinput", (e) => {
        let selectionStart = tomatoesDoneField.selectionStart;
        let selectionEnd = tomatoesDoneField.selectionEnd;
        let selection = tomatoesDoneField.value.substring(selectionStart, selectionEnd);
        let numberSelected = selection !== "";
        let inserted;
        let value = Number.parseInt(tomatoesDoneField.value);
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
          tomatoesDoneField.value = e.data;
        }
      });
      tomatoesDoneField.addEventListener("blur", () => {
        if (tomatoesDoneField.value === "") tomatoesDoneField.value = "0";
      });
      tomatoesDoneWrapper.appendChild(tomatoesDoneField);

      const tomatoesDoneUp = document.createElement("button");
      tomatoesDoneUp.type = "button";
      tomatoesDoneUp.classList.add("up");
      tomatoesDoneUp.innerHTML = `<img src=${up} alt="Up" width="15px" height="15px">`;
      tomatoesDoneUp.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          let timeout;
          let interval;
          if (Number.parseInt(tomatoesDoneField.value) < 99) {
            tomatoesDoneField.value = `${Number.parseInt(tomatoesDoneField.value) + 1}`;
            timeout = setTimeout(() => {
              interval = setInterval(() => {
                if (Number.parseInt(tomatoesDoneField.value) < 99) {
                  tomatoesDoneField.value = `${Number.parseInt(tomatoesDoneField.value) + 1}`;
                } else {
                  clearInterval(interval);
                }
              }, 150);
              tomatoesDoneUp.addEventListener("mouseout", () => {
                clearInterval(interval);
              });
              tomatoesDoneUp.addEventListener("mouseup", () => {
                clearInterval(interval);
              });
            }, 1000);
            tomatoesDoneUp.addEventListener("mouseout", () => {
              clearTimeout(timeout);
            });
            tomatoesDoneUp.addEventListener("mouseup", () => {
              clearTimeout(timeout);
            });
          }
        }
      });
      tomatoesDoneWrapper.appendChild(tomatoesDoneUp);

      const tomatoesDoneDown = document.createElement("button");
      tomatoesDoneDown.type = "button";
      tomatoesDoneDown.classList.add("down");
      tomatoesDoneDown.innerHTML = `<img src=${down} alt="Down" width="15px" height="15px">`;
      tomatoesDoneDown.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          let timeout;
          let interval;
          if (Number.parseInt(tomatoesDoneField.value) > 0) {
            tomatoesDoneField.value = `${Number.parseInt(tomatoesDoneField.value) - 1}`;
            timeout = setTimeout(() => {
              interval = setInterval(() => {
                if (Number.parseInt(tomatoesDoneField.value) > 0) {
                  tomatoesDoneField.value = `${Number.parseInt(tomatoesDoneField.value) - 1}`;
                } else {
                  clearInterval(interval);
                }
              }, 150);
              tomatoesDoneDown.addEventListener("mouseout", () => {
                clearInterval(interval);
              });
              tomatoesDoneDown.addEventListener("mouseup", () => {
                clearInterval(interval);
              });
            }, 1000);
            tomatoesDoneDown.addEventListener("mouseout", () => {
              clearTimeout(timeout);
            });
            tomatoesDoneDown.addEventListener("mouseup", () => {
              clearTimeout(timeout);
            });
          }
        }
      });
      tomatoesDoneWrapper.appendChild(tomatoesDoneDown);

      tomatoesWrapper.appendChild(tomatoesDoneWrapper);

      const tomatoesToDoWrapper = document.createElement("div");
      tomatoesToDoWrapper.classList.add("tomatoes-to-do-wrapper");

      const tomatoesToDoField = document.createElement("input");
      tomatoesToDoField.type = "tel";
      tomatoesToDoField.name = "tomatoes-to-do";
      tomatoesToDoField.id = "tomatoes-to-do";
      tomatoesToDoField.value = item.tomatoesToDo.toString();
      tomatoesToDoField.addEventListener("beforeinput", (e) => {
        let selectionStart = tomatoesToDoField.selectionStart;
        let selectionEnd = tomatoesToDoField.selectionEnd;
        let selection = tomatoesToDoField.value.substring(selectionStart, selectionEnd);
        let numberSelected = selection !== "";
        let inserted;
        let value = Number.parseInt(tomatoesToDoField.value);
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
          tomatoesToDoField.value = e.data;
        }
      });
      tomatoesToDoField.addEventListener("blur", () => {
        if (tomatoesToDoField.value === "") tomatoesToDoField.value = "0";
      });
      tomatoesToDoWrapper.appendChild(tomatoesToDoField);

      const tomatoesToDoUp = document.createElement("button");
      tomatoesToDoUp.type = "button";
      tomatoesToDoUp.classList.add("up");
      tomatoesToDoUp.innerHTML = `<img src=${up} alt="Up" width="15px" height="15px">`;
      tomatoesToDoUp.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          let timeout;
          let interval;
          if (Number.parseInt(tomatoesToDoField.value) < 99) {
            tomatoesToDoField.value = `${Number.parseInt(tomatoesToDoField.value) + 1}`;
            timeout = setTimeout(() => {
              interval = setInterval(() => {
                if (Number.parseInt(tomatoesToDoField.value) < 99) {
                  tomatoesToDoField.value = `${Number.parseInt(tomatoesToDoField.value) + 1}`;
                } else {
                  clearInterval(interval);
                }
              }, 150);
              tomatoesToDoUp.addEventListener("mouseout", () => {
                clearInterval(interval);
              });
              tomatoesToDoUp.addEventListener("mouseup", () => {
                clearInterval(interval);
              });
            }, 1000);
            tomatoesToDoUp.addEventListener("mouseout", () => {
              clearTimeout(timeout);
            });
            tomatoesToDoUp.addEventListener("mouseup", () => {
              clearTimeout(timeout);
            });
          }
        }
      });
      tomatoesToDoWrapper.appendChild(tomatoesToDoUp);

      const tomatoesToDoDown = document.createElement("button");
      tomatoesToDoDown.type = "button";
      tomatoesToDoDown.classList.add("down");
      tomatoesToDoDown.innerHTML = `<img src=${down} alt="Down" width="15px" height="15px">`;
      tomatoesToDoDown.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          let timeout;
          let interval;
          if (Number.parseInt(tomatoesToDoField.value) > 0) {
            tomatoesToDoField.value = `${Number.parseInt(tomatoesToDoField.value) - 1}`;
            timeout = setTimeout(() => {
              interval = setInterval(() => {
                if (Number.parseInt(tomatoesToDoField.value) > 0) {
                  tomatoesToDoField.value = `${Number.parseInt(tomatoesToDoField.value) - 1}`;
                } else {
                  clearInterval(interval);
                }
              }, 150);
              tomatoesToDoDown.addEventListener("mouseout", () => {
                clearInterval(interval);
              });
              tomatoesToDoDown.addEventListener("mouseup", () => {
                clearInterval(interval);
              });
            }, 1000);
            tomatoesToDoDown.addEventListener("mouseout", () => {
              clearTimeout(timeout);
            });
            tomatoesToDoDown.addEventListener("mouseup", () => {
              clearTimeout(timeout);
            });
          }
        }
      });
      tomatoesToDoWrapper.appendChild(tomatoesToDoDown);

      tomatoesWrapper.appendChild(tomatoesToDoWrapper);
      form.appendChild(tomatoesWrapper);

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

      if (item.note === undefined || item.note === "") {
        const addNote = document.createElement("button");
        addNote.type = "button";
        addNote.classList.add("add-note");
        addNote.textContent = "Add Note";
        addNoteEventListener(addNote);
        form.appendChild(addNote);
      } else {
        const addNote = document.createElement("button");
        addNote.type = "button";
        addNote.classList.add("add-note");
        addNote.textContent = "Add Note";
        addNoteEventListener(addNote);

        const noteWrapper = document.createElement("div");
        noteWrapper.classList.add("note-wrapper");
    
        const deleteNoteBtn = document.createElement("div");
        deleteNoteBtn.classList.add("delete");
        deleteNoteBtn.addEventListener("click", () => {
          noteWrapper.remove();
          form.insertBefore(addNote, btns);
        });
        noteWrapper.appendChild(deleteNoteBtn);
    
        const note = document.createElement("div");
        note.classList.add("note");
        
        const noteText = document.createElement("textarea");
        noteText.name = "note";
        noteText.placeholder = "Your note ...";
        noteText.innerText = item.note;
        note.appendChild(noteText);
    
        noteWrapper.appendChild(note);
        form.appendChild(noteWrapper)
      }

      const btns = document.createElement("div");
      btns.classList.add("form-submit-wrapper");

      const deleteTask = document.createElement("button");
      deleteTask.type = "button";
      deleteTask.classList.add("delete-task");
      deleteTask.textContent = "Delete";
      deleteTask.addEventListener("click", (e) => {
        if (e.button === 0) {
          taskList.removeTask(item.name, taskList.getTaskPosition(item.fullName));
          task.remove();
        }
      });
      btns.appendChild(deleteTask);

      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.classList.add("cancel");
      cancel.textContent = "Cancel";
      cancel.addEventListener("click", () => {
        if (list.children.length > 1) {
          let index = Array.from(list.children).indexOf(task);
          if (index < list.children.length - 1) {
            const nextTask = list.children[index + 1];
            task.remove();
            renderItem(fullName);
            const newTask = list.lastElementChild;
            list.insertBefore(newTask, nextTask);
          } else {
            task.remove();
            renderItem(fullName);
          }
        } else {
          task.remove();
          renderItem(fullName);
        }
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
        const isItNewName = name !== item.name;
        if (isItNewName) {
          item = taskList.changeNameOf(item.name, name, taskList.getTaskPosition(fullName));
          fullName = item.fullName;
          console.log(item, item.fullName, fullName);
        }

        const tomatoesDone = Number.parseInt(formData.get("tomatoes-done"));
        const didTomatoesDoneChange = tomatoesDone !== item.tomatoesDone;
        if (didTomatoesDoneChange) {
          taskList.changeTomatoesDone(name, tomatoesDone, taskList.getTaskPosition(fullName));
        }

        const tomatoesToDo = Number.parseInt(formData.get("tomatoes-to-do"));
        const didTomatoesToDoChange = tomatoesToDo !== item.tomatoesToDo;
        if (didTomatoesToDoChange) {
          taskList.changeTomatoesToDo(name, tomatoesToDo, taskList.getTaskPosition(fullName));
        }

        const isThereNote = formData.get("note") !== null || formData.get("note") === "";
        if (!isThereNote) {
          if (item.note !== undefined && item.note !== "") {
            taskList.removeNoteFrom(name, taskList.getTaskPosition(fullName));
          }
        } else {
          const note = formData.get("note");
          taskList.addNoteTo(name, note, taskList.getTaskPosition(fullName));
        }

        if (list.children.length > 1) {
          let index = Array.from(list.children).indexOf(task);
          if (index < list.children.length - 1) {
            const nextTask = list.children[index + 1];
            task.remove();
            renderItem(fullName);
            const newTask = list.lastElementChild;
            list.insertBefore(newTask, nextTask);
          } else {
            task.remove();
            renderItem(fullName);
          }
        } else {
          task.remove();
          renderItem(fullName);
        }
      });
      task.appendChild(form);
    }

    const taskName = document.createElement("div");
    taskName.classList.add("name");
    taskName.textContent = item.name;
    taskName.addEventListener("click", openEditUI);
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
    let fullName = taskList.createTask(name, tomatoes);
    if (formData.get("note") !== null) {
      taskList.addNoteTo(name, formData.get("note"), taskList.getTaskPosition(fullName));
    }
    newTask.remove();
    renderItem(fullName);
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

export function initializeUIList() {
  for (let task of taskList.taskList) {
    renderItem(task);
  }
}
