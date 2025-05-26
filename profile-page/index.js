import {
  getAuthenticatedUser,
  updateAuthenticatedUserInfo,
  removeAuthenticatedUser,
} from "../sessionHelper.js";

import {
  handleAuthenticatedUserContent,
  SUPPORTED_ROUTES_MAP,
} from "../index.js";

const editButtonAllInputs = document.querySelector(".edit__all");

editButtonAllInputs.addEventListener("click", (e) => {
  e.preventDefault();
  const profileInputs = document.querySelectorAll(
    ".profile__form--group .profile__form--input"
  );

  profileInputs.forEach((input) => {
    if (input.querySelector(".edit__buttons")) return;
    const currentUser = getAuthenticatedUser();
    const inputFiled = input.querySelector("input");
    inputFiled.removeAttribute("disabled");
    inputFiled.style.color = "black";
    input.classList.add("edit__button--active");
    const buttons = updateOrRejectEdits(inputFiled, currentUser);
    input.appendChild(buttons);
  });
});

export const fillTheInputs = () => {
  const userDetails = getAuthenticatedUser();
  const profilePicture = document.querySelector(".profile__image img");
  profilePicture.src = `${userDetails.profileImg}`;
  const userInputs = document.querySelectorAll(".profile__form--group input");
  userInputs.forEach((input) => {
    const inputId = input.getAttribute("id").split("-")[1];
    input.value = userDetails[inputId];
  });
};

export const setEditInputButtons = () => {
  const profileInputs = document.querySelectorAll(
    ".profile__form--group .profile__form--input"
  );

  profileInputs.forEach((input) => {
    if (input.querySelector(".edit__button")) return;

    const editButton = document.createElement("button");
    editButton.innerText = "Промени";
    editButton.classList.add("edit__button");
    input.appendChild(editButton);

    editButton.addEventListener("click", (e) => {
      e.preventDefault();
      const currentUser = getAuthenticatedUser();
      const inputFiled = input.querySelector("input");
      inputFiled.removeAttribute("disabled");
      inputFiled.style.color = "black";
      input.classList.add("edit__button--active");
      editButton.style.display = "none";
      const buttons = updateOrRejectEdits(inputFiled, currentUser);
      input.appendChild(buttons);
    });
  });
};

function updateOrRejectEdits(inputField, user) {
  const userInfo = inputField.getAttribute("id").split("-")[1];
  const editButtons = document.createElement("div");
  editButtons.classList.add("edit__buttons");
  const update = document.createElement("i");
  update.classList.add("fa-solid", "fa-check", "update__button");
  update.addEventListener("click", () => {
    const inputValue = inputField.value;

    if (!inputValue) {
      console.log("Fill the input");
      return;
    } else {
      user[userInfo] = inputValue;
      updateAuthenticatedUserInfo(user);
      returnPrimaryStyle(inputField);
      editButtons.remove();
    }
  });
  const reject = document.createElement("i");
  reject.classList.add("fa-solid", "fa-xmark", "reject__button");
  reject.addEventListener("click", () => {
    inputField.value = user[userInfo];
    returnPrimaryStyle(inputField);
    editButtons.remove();
  });
  editButtons.append(update, reject);
  return editButtons;
}

function returnPrimaryStyle(input) {
  input.setAttribute("disabled", "true");
  input.style.color = "white";
  input.parentElement.classList.remove("edit__button--active");

  const editButton = input.parentElement.querySelector(".edit__button");
  if (editButton) editButton.style.display = "";
}

export const setLogoutButtonFunctionality = () => {
  const logoutButton = document.querySelector("#logout__button");
  logoutButton.addEventListener("click", () => {
    removeAuthenticatedUser();
    handleAuthenticatedUserContent();
    location.hash = SUPPORTED_ROUTES_MAP.inform;
  });
};
