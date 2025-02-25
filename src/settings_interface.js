import { timer } from "./timer.js";
import { settings } from "./settings.js";

const settingsBtn = document.querySelector(".menu-btn");
function openSettings(e) {
  settingsBtn.removeEventListener("click", openSettings);
  settingsBtn.addEventListener("click", closeSettings);
  const settingsUI = document.createElement("section");
  settingsUI.classList.add("settings");

  const settingsTitle = document.createElement("h2");
  settingsTitle.textContent = "Settings";
  settingsUI.appendChild(settingsTitle);

  const form = document.createElement("form");
  
  const setTomatoLabel = document.createElement("label");
  setTomatoLabel.setAttribute("for", "set-tomato");
  setTomatoLabel.textContent = "Tomato:";
  form.appendChild(setTomatoLabel);

  const setTomato = document.createElement("input");
  setTomato.type = "number";
  setTomato.name = "tomato";
  setTomato.id = "set-tomato";
  setTomato.value = timer.tomatoDuration.toString();
  form.appendChild(setTomato);

  const setShortLabel = document.createElement("label");
  setShortLabel.setAttribute("for", "set-short");
  setShortLabel.textContent = "Short:";
  form.appendChild(setShortLabel);

  const setShort = document.createElement("input");
  setShort.type = "number";
  setShort.name = "short";
  setShort.id = "set-short";
  setShort.value = timer.shortDuration.toString();
  form.appendChild(setShort);

  const setLongLabel = document.createElement("label");
  setLongLabel.setAttribute("for", "set-long");
  setLongLabel.textContent = "Long:";
  form.appendChild(setLongLabel);

  const setLong = document.createElement("input");
  setLong.type = "number";
  setLong.name = "long";
  setLong.id = "set-long";
  setLong.value = timer.longDuration.toString();
  form.appendChild(setLong);

  const setLongIntervalLabel = document.createElement("label");
  setLongIntervalLabel.setAttribute("for", "set-long-interval");
  setLongIntervalLabel.textContent = "Long interval:";
  form.appendChild(setLongIntervalLabel);

  const setLongInterval = document.createElement("input");
  setLongInterval.type = "number";
  setLongInterval.name = "long-interval";
  setLongInterval.id = "set-long-interval";
  setLongInterval.value = timer.longInterval.toString();
  form.appendChild(setLongInterval);

  const toggles = document.createElement("ul");

  const switchTasks = document.createElement("li");

  const switchTaskBtn = document.createElement("button");
  switchTaskBtn.type = "button";
  switchTaskBtn.textContent = timer.autoSwitchTasks ? "On" : "Off";
  switchTaskBtn.addEventListener("click", (e) => {
    if (e.button === 0) {
      switchTaskBtn.textContent === "On" ? switchTaskBtn.textContent = "Off" : switchTaskBtn.textContent = "On";
    }
  });

  switchTasks.append("Auto-switch tasks:", switchTaskBtn);
  toggles.appendChild(switchTasks);

  const checkTasks = document.createElement("li");

  const checkBtn = document.createElement("button");
  checkBtn.type = "button";
  checkBtn.textContent = timer.autoCheckTasks ? "On" : "Off";
  checkBtn.addEventListener("click", (e) => {
    if (e.button === 0) {
      checkBtn.textContent === "On" ? checkBtn.textContent = "Off" : checkBtn.textContent = "On";
    }
  });

  checkTasks.append("Auto-check tasks:", checkBtn);
  toggles.appendChild(checkTasks);

  const startTomatoes = document.createElement("li");

  const tomBtn = document.createElement("button");
  tomBtn.type = "button";
  tomBtn.textContent = timer.autoStartTomatoes ? "On" : "Off";
  tomBtn.addEventListener("click", (e) => {
    if (e.button === 0) {
      tomBtn.textContent === "On" ? tomBtn.textContent = "Off" : tomBtn.textContent = "On";
    }
  });

  startTomatoes.append("Auto-start tomatoes:", tomBtn);
  toggles.appendChild(startTomatoes);

  const startBreaks = document.createElement("li");

  const breaksBtn = document.createElement("button");
  breaksBtn.type = "button";
  breaksBtn.textContent = timer.autoStartBreaks ? "On" : "Off";
  breaksBtn.addEventListener("click", (e) => {
    if (e.button === 0) {
      breaksBtn.textContent === "On" ? breaksBtn.textContent = "Off" : breaksBtn.textContent = "On";
    }
  });

  startBreaks.append("Auto-start breaks:", breaksBtn);
  toggles.appendChild(startBreaks);
  form.appendChild(toggles);

  const controls = document.createElement("div");
  controls.classList.add("setting-controls");
  
  const defaults = document.createElement("button");
  defaults.type = "button";
  defaults.textContent = "Reset to Defaults";
  defaults.addEventListener("click", (e) => {
    settings.returnToDefaults();
    setTomato.value = timer.tomatoDuration.toString();
    setShort.value = timer.shortDuration.toString();
    setLong.value = timer.longDuration.toString();
    setLongInterval.value = timer.longInterval.toString();
    switchTaskBtn.textContent = "Off";
    checkBtn.textContent = "Off";
    tomBtn.textContent = "Off";
    breaksBtn.textContent = "Off";
  });
  controls.appendChild(defaults);

  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.textContent = "Cancel";
  cancel.addEventListener("click", closeSettings);
  controls.appendChild(cancel);

  const save = document.createElement("button");
  save.type = "submit";
  save.textContent = "Save";
  save.addEventListener("click", (e) => {
    e.preventDefault();
    let formData = new FormData(form);
    settings.setTomatoDuration(Number.parseInt(formData.get("tomato")));
    settings.setShortDuration(Number.parseInt(formData.get("short")));
    settings.setLongDuration(Number.parseInt(formData.get("long")));
    settings.setWhenLongStarts(Number.parseInt(formData.get("long-interval")));

    let isAutoSwitchTaskOn = switchTaskBtn.textContent === "On" ? true : false;
    if (isAutoSwitchTaskOn !== timer.autoSwitchTasks) settings.toggleAutoSwitchTasks();

    let isAutoCheckTasksOn = checkBtn.textContent === "On" ? true : false;
    if (isAutoCheckTasksOn !== timer.autoCheckTasks) settings.toggleAutoCheckTasks();

    let isAutoStartTomatoes = tomBtn.textContent === "On" ? true : false;
    if (isAutoStartTomatoes !== timer.autoStartTomatoes) settings.toggleAutoStartTomatoes();

    let isAutoStartBreaks = breaksBtn.textContent === "On" ? true : false;
    if (isAutoStartBreaks !== timer.autoStartBreaks) settings.toggleAutoStartBreaks();

    closeSettings(e);
  });
  controls.appendChild(save);

  form.appendChild(controls);

  settingsUI.appendChild(form);
  document.querySelector("main").appendChild(settingsUI);
}

function closeSettings(e) {
  document.querySelector(".settings").remove();
  settingsBtn.removeEventListener("click", closeSettings);
  settingsBtn.addEventListener("click", openSettings);
}


settingsBtn.addEventListener("click", openSettings);