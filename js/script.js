{
  const welcome = () => {
    console.log("Hi all developers! Nice to see you here. Enjoy!");
  };

  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {content: newTaskContent},
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
    ...tasks.slice(0, taskIndex),
    ...tasks.slice(taskIndex + 1),
    ]; 

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;

    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (task of tasks) {
      htmlString += `<li class="js-tasks__list-item">
                        <button class="js-done ${task.done ? "js-done--ticked" : ""}">
                          &#x2713
                        </button>
                        <span class="js-taskContent ${task.done ? "js-taskContent--done" : ""}">
                          ${task.content}
                        </span>
                        <button class="js-remove">
                          &#x1F5D1
                        </button>
                    </li>
    `;
    }

    document.querySelector(".js-tasks__list").innerHTML = htmlString;
  };

  const renderButtons = () => {};

  const render = () => {
    renderTasks();

    renderButtons();

    bindEvents();
  };

  const focusInputField = () => {
    const inputField = document.querySelector(".js-form__input");

    inputField.focus();
  };

  const resetForm = () => {
    const form = document.querySelector(".js-form");

    form.reset();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document
      .querySelector(".js-form__input")
      .value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);

    resetForm();

    focusInputField();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);

    welcome();
  };

  init();
}
