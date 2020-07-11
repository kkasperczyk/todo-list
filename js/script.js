{
  const welcome = () => {
    console.log("Hi all developers! Nice to see you here. Enjoy!");
  };

  let tasks = [];
  let hideDoneTasks = false;
  
  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex), 
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };
  
  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { 
        ...tasks[taskIndex], 
        done: !tasks[taskIndex].done, 
      },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };
  
  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];

    render();
  };

  const setAllDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };
  
  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    const taskToHtml = (task) => `
      <li class="js-tasks__list-item ${
        task.done && hideDoneTasks ? "tasks__list-item--hidden" : ""
      }">
          <button class="js-done ${
            task.done ? "js-done--ticked" : ""
          }">
              &#x2713
          </button>
          <span class="js-taskContent ${
            task.done ? "js-taskContent--done" : ""
          }">
              ${task.content}
          </span>
          <button class="js-remove">
              &#x1F5D1
          </button>
      </li>
    `;
    
    const tasksElement = document.querySelector(".js-tasks__list");
    tasksElement.innerHTML = tasks.map(taskToHtml).join("");
  };

  const renderButtons = () => {
    const buttonContainer = document.querySelector(".js-buttonContainer");

    let buttonContainerContent = "";

    if (tasks.length) {
      buttonContainerContent += `
        <button class="tasks__button js-hideDoneButton">
          ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button class="tasks__button js-toggleAllDoneButton" ${
          tasks.every(({ done }) => done) ? "disabled" : ""
        }>
          Ukończ wszystkie
        </button>
      `;
    }

    buttonContainer.innerHTML = buttonContainerContent;
  };

  const bindButtonsEvents = () => {
    const hideDoneButton = document.querySelector(".js-hideDoneButton");
    hideDoneButton.addEventListener("click", toggleHideDoneTasks);

    const toggleAllDoneButton = document.querySelector(".js-toggleAllDoneButton");
    toggleAllDoneButton.addEventListener("click", setAllDone);
  };
  
  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();

    renderButtons();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-form__input");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }
    
    newTaskElement.focus();
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);

    render();

    welcome();
  };

  init();
}
