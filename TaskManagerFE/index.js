// Fetch tasks from the API
fetch("http://127.0.0.1:3000/api/v1/tasks")
  .then((response) => response.json())
  .then((data) => {
    const taskList = document.getElementById("task-list");
    console.log(data);
    // Iterate over the tasks and create HTML elements dynamically
    data.data.forEach((task) => {
      const card = document.createElement("div");
      const listItem = document.createElement("p");
      const descItem = document.createElement("span");
      const deleteElement = document.createElement("button");
      const editElement = document.createElement("button");
      const editIcon = document.createElement("i");
      const deleteIcon = document.createElement("i");
      const divButton = document.createElement("div");
      const outerTaskHeader = document.createElement("div");
      outerTaskHeader.classList.add("taskHeader");
      divButton.classList.add("buttonContainer");
      deleteIcon.classList.add("bi-trash");
      deleteIcon.classList.add("deleteIcon");
      deleteIcon.setAttribute("data-taskId", task._id);
      editIcon.classList.add("bi-pencil-square");
      editIcon.classList.add("editButton");
      editIcon.setAttribute("data-taskIdUpdate", task._id);
      editElement.appendChild(editIcon);
      deleteElement.appendChild(deleteIcon);
      deleteElement.classList.add("delete");
      editElement.classList.add("edit");

      card.classList.add("card");
      //coloring task status
      if (task.completed) {
        card.classList.add("completed");
      }
      listItem.textContent = task.name;
      descItem.textContent = task.description;
      taskList.appendChild(card);
      card.appendChild(outerTaskHeader);
      outerTaskHeader.appendChild(listItem);
      outerTaskHeader.appendChild(divButton);
      divButton.appendChild(deleteElement);
      divButton.appendChild(editElement);
      card.appendChild(descItem);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const addTask = async (task) => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  alert("Task added successfully");
};

const addTaskForm = document.getElementById("addTaskForm");

addTaskForm.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  const taskName = addTaskForm.taskName.value;
  const taskDescription = addTaskForm.taskDescription.value;
  const taskCompleted = addTaskForm.taskCompleted.checked;

  const task = {
    name: taskName,
    description: taskDescription,
    completed: taskCompleted,
  };
  await addTask(task);
});

const deleteTask = async (taskId) => {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/tasks/${taskId}`, {
    method: "DELETE",
  });
  const data = await response.json();
};

const editTaskModal = document.querySelector("#editModal");

//taskID stored here
let updatedTaskID = "";
//
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteIcon")) {
    const taskId = e.target.getAttribute("data-taskId");
    deleteTask(taskId);
    alert("Task deleted");
    window.location.reload();
  }

  if (e.target.classList.contains("editButton")) {
    editTaskModal.showModal();
    updatedTaskID = e.target.getAttribute("data-taskIdUpdate");
    fetch(`http://127.0.0.1:3000/api/v1/tasks/${updatedTaskID}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        editTaskModal.querySelector("#editTaskName").value = data.data.name;
        editTaskModal.querySelector("#editTaskDescription").value =
          data.data.description;
        editTaskModal.querySelector("#editTaskCompleted").checked =
          data.data.completed;
      });
  }
});

//edit task

const updateTask = async (task) => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/v1/tasks/${updatedTaskID}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );
  const data = await response.json();
  alert("Task updated successfully");
};
const updateTaskForm = document.getElementById("updateTaskForm");

updateTaskForm.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  const taskName = updateTaskForm.taskName1.value;
  const taskDescription = updateTaskForm.taskDescription1.value;
  const taskCompleted = updateTaskForm.taskCompleted1.checked;

  const task = {
    name: taskName,
    description: taskDescription,
    completed: taskCompleted,
  };
  await updateTask(task);
});
