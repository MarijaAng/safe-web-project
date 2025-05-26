import {
  setAuthenticatedUser,
  getAuthenticatedUser,
} from "../sessionHelper.js";
import { SUPPORTED_ROUTES_MAP } from "../index.js";

export const eyeIconFunctionality = () => {
  const passwordInput = document.querySelector("#password");
  const passwordEyeIcon = document.querySelector(".password__icon i");
  passwordEyeIcon.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordEyeIcon.classList.remove("fa-eye-slash");
      passwordEyeIcon.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      passwordEyeIcon.classList.remove("fa-eye");
      passwordEyeIcon.classList.add("fa-eye-slash");
    }
  });
};

export const setModalButtonFunctionality = () => {
  const modalBtn = document.querySelector("#login__modal--btn");
  const welcomeModal = document.querySelector(".welcome__modal");

  if (welcomeModal) {
    if (modalBtn) {
      modalBtn.addEventListener("click", () => {
        location.hash = SUPPORTED_ROUTES_MAP.inform;
        welcomeModal.style.display = "none";
        setAuthenticatedUserProfile();
      });
    }
  }
};

export const setLoginFormFunctionallity = () => {
  const loginForm = document.querySelector("#login__form");
  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#password");
  const welcomeModal = document.querySelector(".welcome__modal");
  const usernameValidationMessage = document.querySelector(
    "#username__validation"
  );
  const passwordValidationMessage = document.querySelector(
    "#password__validation"
  );

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    usernameValidationMessage.innerText = "";
    passwordValidationMessage.innerText = "";

    if (username.trim() === "") {
      usernameValidationMessage.innerText = "Username is required.";
      return;
    }
    if (password.trim() === "") {
      passwordValidationMessage.innerText = "Password is required.";
      return;
    }

    const credentials = { username, password };
    const jsonCredentials = JSON.stringify(credentials);

    fetch("http://localhost:5000/api/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonCredentials,
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Incorect credentials");
        }
        const data = await res.json();
        setAuthenticatedUser(data.username || username);
        welcomeModal.style.display = "flex";
      })
      .catch(() => {
        passwordValidationMessage.innerText = "Incorrect username or password.";
      })
      .finally(() => {
        usernameInput.value = "";
        passwordInput.value = "";
      });
  });
};

export const setAuthenticatedUserProfile = () => {
  const authenticatedUserProfilePictures =
    document.querySelectorAll(".user__image img");
  const authenticatedUserUsername =
    document.querySelectorAll(".user__username");
  const authenticatedUser = getAuthenticatedUser();

  authenticatedUserProfilePictures.forEach((picture) => {
    picture.setAttribute("src", `${authenticatedUser.profileImg}`);
  });

  authenticatedUserUsername.forEach((username) => {
    username.innerHTML = `${authenticatedUser.fullname}`;
  });
};
