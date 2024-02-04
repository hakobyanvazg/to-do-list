let input = document.getElementById("input-box");
let listContainer = document.querySelector(".list-container");

function addTask() {
  if (input.value === "") {
    alert("Please enter task name");
  } else {
    let item = document.createElement("div");
    item.className = "item";

    let check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check";

    let label = document.createElement("label");
    label.textContent = input.value;

    let btn = document.createElement("button");
    btn.textContent = "x";
    btn.className = "remove-btn";

    btn.addEventListener("click", function (e) {
      handleRemoveButtonClick(item);
    });

    check.addEventListener("change", function () {
      handleCheckboxChange(check, label);
    });

    item.appendChild(check);
    item.appendChild(label);
    item.appendChild(btn);

    listContainer.appendChild(item);
  }
  input.value = "";
  saveData();
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function handleCheckboxChange(check, label) {
  if (check.checked) {
    label.classList.add("completed");
  } else {
    label.classList.remove("completed");
  }
  saveData();
}

function handleRemoveButtonClick(item) {
  item.remove();
  saveData();
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");

  let checkboxes = document.querySelectorAll(".check");
  checkboxes.forEach(function (check) {
    let label = check.nextElementSibling;
    check.addEventListener("change", function () {
      handleCheckboxChange(check, label);
    });
  });

  let removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(function (btn) {
    let item = btn.parentElement;
    btn.addEventListener("click", function () {
      handleRemoveButtonClick(item);
    });
  });
}

showTask();
