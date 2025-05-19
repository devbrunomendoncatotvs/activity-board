const formTask = document.getElementById("form-task");
const inputTitleTask = document.getElementById("title-task");
const inputDescriptionTask = document.getElementById("description-task");

const contentListOne = document.getElementById("content-list-one");
const contentListTwo = document.getElementById("content-list-two");
const contentListThree = document.getElementById("content-list-three");

formTask.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleTask = inputTitleTask.value;
  const descriptionTask = inputDescriptionTask.value;

  const itemListTask = document.createElement("li");

  const containerTitleList = document.createElement("div");
  const titleList = document.createElement("h4");

  const containerDescriptionList = document.createElement("div");
  const descriptionList = document.createElement("p");
  const descriptionDateList = document.createElement("span");

  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("task-actions");

  const btnNotStarted = document.createElement("button");
  btnNotStarted.classList.add("btnNotStarted");
  btnNotStarted.textContent = "Não iniciada";

  const btnStart = document.createElement("button");
  btnStart.classList.add("btnStart");
  btnStart.textContent = "Iniciada";

  const btnFinish = document.createElement("button");
  btnFinish.classList.add("btnFinish");
  btnFinish.textContent = "Finalizada";

  itemListTask.setAttribute("draggable", "true");
  itemListTask.classList.add("item-list-task");
  containerTitleList.classList.add("container-title-list");
  containerDescriptionList.classList.add("container-description-list");

  titleList.textContent = titleTask;

  descriptionList.textContent = descriptionTask;
  const now = new Date();
  const formattedDate = `Atividade criada em: ${now.toLocaleDateString()} às ${now.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  )}`;
  descriptionDateList.textContent = formattedDate;

  containerTitleList.appendChild(titleList);

  containerDescriptionList.appendChild(descriptionList);
  containerDescriptionList.appendChild(descriptionDateList);

  actionsContainer.appendChild(btnNotStarted);
  actionsContainer.appendChild(btnStart);
  actionsContainer.appendChild(btnFinish);

  itemListTask.appendChild(containerTitleList);
  itemListTask.appendChild(containerDescriptionList);
  itemListTask.appendChild(actionsContainer);

  contentListOne.appendChild(itemListTask);

  inputTitleTask.value = "";
  inputDescriptionTask.value = "";
  inputTitleTask.focus();

  btnNotStarted.addEventListener("click", () => {
    contentListOne.appendChild(itemListTask);
  });

  btnStart.addEventListener("click", () => {
    contentListTwo.appendChild(itemListTask);
  });

  btnFinish.addEventListener("click", () => {
    contentListThree.appendChild(itemListTask);
  });

  const allColumns = document.querySelectorAll(".container-resume-task ul");

  allColumns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      const applyAfter = getNewPosition(column, e.clientY);

      if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", dragging);
      } else {
        column.appendChild(dragging);
      }
    });
  });

  function getNewPosition(column, posY) {
    const cards = [
      ...column.querySelectorAll(".item-list-task:not(.dragging)"),
    ];
    let result;

    for (let refer_card of cards) {
      const box = refer_card.getBoundingClientRect();
      const boxCenterY = box.y + box.height / 2;

      if (posY >= boxCenterY) result = refer_card;
    }

    return result;
  }
});

document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("item-list-task")) {
    e.target.classList.add("dragging");
  }
});

document.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("item-list-task")) {
    e.target.classList.remove("dragging");
  }
});
