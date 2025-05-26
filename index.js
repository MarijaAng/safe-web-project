import {
  renderCards,
  setFiltersFunctionality,
  informModal,
  setModalInputFunctionality,
} from "./learn-page/index.js";

import {
  eyeIconFunctionality,
  setModalButtonFunctionality,
  setLoginFormFunctionallity,
} from "./login-page/index.js";

import { isUserAuthenticated } from "./sessionHelper.js";

import {
  fillTheInputs,
  setEditInputButtons,
  setLogoutButtonFunctionality,
} from "./profile-page/index.js";

import { renderDiscussionCards } from "./discussion-page/index.js";

import { setAuthenticatedUserProfile } from "./login-page/index.js";

const hamburger = document.querySelector(".hamburger");
const leftMenu = document.querySelector(".left__menu");
const rightMenu = document.querySelector(".right__menu");
const navLinks = document.querySelectorAll(".nav__link");
const bannerPlayButton = document.querySelector(".banner .play__button");
const modalPlayButton = document.querySelector(".modal__media .play__button");

window.addEventListener("DOMContentLoaded", () => {
  adjustPaddingForNavbar();
  hideAllSections();
  handleAuthenticatedUserContent();
  handleHashRouteChange();
  setFiltersFunctionality();
  if (isUserAuthenticated()) {
    setAuthenticatedUserProfile();
  }
});

window.addEventListener("resize", () => {
  adjustPaddingForNavbar();
});

window.addEventListener("hashchange", () => {
  hideAllSections();
  handleHashRouteChange();
  handleAuthenticatedUserContent();
});

window.addEventListener("click", (event) => {
  if (event.target == informModal) {
    informModal.style.display = "none";
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  leftMenu.classList.toggle("active");
  rightMenu.classList.toggle("active");
});

bannerPlayButton.addEventListener("click", () => {
  const bannerVideo = document.querySelector(".banner video");
  const bannerButtonI = document.querySelector(".banner .play__button i");
  playStopVideo(bannerVideo, bannerButtonI);
});

modalPlayButton.addEventListener("click", () => {
  const modalVideo = document.querySelector(".modal__media video");
  const modalButtonI = document.querySelector(".modal__media .play__button i");
  playStopVideo(modalVideo, modalButtonI);
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    leftMenu.classList.remove("active");
    rightMenu.classList.remove("active");
  })
);

function adjustPaddingForNavbar() {
  const header = document.querySelector(".header");
  const main = document.querySelector("main");
  const navbarHeight = header.offsetHeight;
  main.style.paddingTop = `${navbarHeight}px`;
}

export function playStopVideo(video, playButtonI) {
  const isHidden = getComputedStyle(video).display === "none";
  if (isHidden) {
    video.style.display = "block";
    video.play();
    playButtonI.classList.remove("fa-circle-play");
    playButtonI.classList.add("fa-circle-stop");
  } else {
    video.pause();
    video.style.display = "none";
    playButtonI.classList.remove("fa-circle-stop");
    playButtonI.classList.add("fa-circle-play");
  }
}

// ROUTING
export const SUPPORTED_ROUTES_MAP = {
  home: "home",
  inform: "inform",
  discussion: "discussion",
  contact: "contact",
  profile: "profile",
  login: "login",
};

const isRouteSupported = (route) => {
  return Boolean(SUPPORTED_ROUTES_MAP[route]);
};

const getHashRoute = () => {
  return location.hash.slice(1);
};

const hideAllSections = () => {
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });
};

const handleHashRouteChange = () => {
  const hashRoute = getHashRoute();
  if (hashRoute && isRouteSupported(hashRoute)) {
    document.getElementById(hashRoute).style.display = "block";

    switch (hashRoute) {
      case SUPPORTED_ROUTES_MAP.inform:
        renderCards();
        setModalInputFunctionality();
        break;
      case SUPPORTED_ROUTES_MAP.login:
        eyeIconFunctionality();
        setLoginFormFunctionallity();
        setModalButtonFunctionality();
        break;
      case SUPPORTED_ROUTES_MAP.profile:
        fillTheInputs();
        setEditInputButtons();
        setLogoutButtonFunctionality();
        break;
      case SUPPORTED_ROUTES_MAP.discussion:
        renderDiscussionCards();
        break;
      default:
        break;
    }
  } else {
    document.getElementById("home").style.display = "block";
  }
};

export const handleAuthenticatedUserContent = () => {
  const isAuthenticated = isUserAuthenticated();
  const profileLink = document.querySelector("#profile__link");
  const loginLink = document.querySelector("#login__link");
  const loggedInUser = document.querySelector("#loggedInUser");

  if (isAuthenticated) {
    profileLink.style.display = "block";
    loginLink.style.display = "none";
    loggedInUser.style.display = "block";
  } else {
    profileLink.style.display = "none";
    loginLink.style.display = "block";
    loggedInUser.style.display = "none";
  }
};
