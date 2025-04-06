document.addEventListener("DOMContentLoaded", () => {
  initTodos();

  // add event listeners
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      filterTodos(filter);
    });
  });

  const addTodoButton = document.querySelector("#add-todo-btn");
  addTodoButton.addEventListener("click", () => addTodo(loadTodos()));
});

// filter todos based on filter
const filterTodos = (filter) => {
  const todos = loadTodos();
  let filteredTodos;

  switch (filter) {
    case "all":
      filteredTodos = todos;
      break;
    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed);
      break;
    case "pending":
      filteredTodos = todos.filter((todo) => !todo.completed);
      break;
    default:
      filteredTodos = todos;
      break;
  }

  // re render todos
  const todosContainer = document.querySelector("#todos");
  const todoSection = document.querySelector("#todos-section");
  renderTodos(filteredTodos, todosContainer, todoSection);
  todoSection.style.display = "block";
};

// helper function to get todos from localstorage
const loadTodos = () => JSON.parse(localStorage.getItem("todos")) || [];

// helper function to save todos to localstorage
const saveTodos = (todos) =>
  localStorage.setItem("todos", JSON.stringify(todos));

// function to render todos on screen
const renderTodos = (todos, container, section) => {
  container.innerHTML = "";

  if (todos.length === 0) {
    section.style.display = "none";
    return;
  }

  for (const [index, todo] of todos.entries()) {
    const content = `
     <div class="todo-card">
        <div>
            <input type="checkbox" ${
              todo.completed ? "checked" : ""
            } onclick="updateTodo(${index})" />
            <h4 class=${todo.completed ? "completed" : ""}>${todo.title}</h4>
        </div>
        <i class="fa-solid fa-trash" onclick='deleteTodo(${index})'></i>
    </div>
    `;

    container.insertAdjacentHTML("beforeend", content);
  }

  section.style.display = "block";
};

const addTodo = (todos) => {
  const todoTitle = document.querySelector("#user-input");

  // add new todo
  const newTodo = { title: todoTitle.value, completed: false };
  todos.push(newTodo);

  // save todos
  saveTodos(todos);

  // re render todos
  const todosContainer = document.querySelector("#todos");
  const todoSection = document.querySelector("#todos-section");
  renderTodos(todos, todosContainer, todoSection);

  // clear input value
  todoTitle.value = "";
};

const deleteTodo = (index) => {
  // load todos
  const todos = loadTodos();

  // remove todo at index
  todos.splice(index, 1);

  // save todos
  saveTodos(todos);

  // re render todos
  const todosContainer = document.querySelector("#todos");
  const todoSection = document.querySelector("#todos-section");
  renderTodos(todos, todosContainer, todoSection);
};

const updateTodo = (index) => {
  const todos = loadTodos();
  todos[index].completed = !todos[index].completed;

  saveTodos(todos);

  // re render todos
  const todosContainer = document.querySelector("#todos");
  const todoSection = document.querySelector("#todos-section");
  renderTodos(todos, todosContainer, todoSection);
};

// initialize todos at start
const initTodos = () => {
  const todoSection = document.querySelector("#todos-section");
  const todosContainer = document.querySelector("#todos");

  todoSection.style.display = "none";

  const todos = loadTodos();
  renderTodos(todos, todosContainer, todoSection);
};
