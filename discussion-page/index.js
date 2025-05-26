import { discussionsData } from "./discussionsData.js";
import {
  addNewDiscussion,
  getAuthenticatedUser,
  getStoredDiscussions,
  isUserAuthenticated,
} from "../sessionHelper.js";

export const renderDiscussionCards = () => {
  const isAuthenticated = isUserAuthenticated();
  const newDiscussionForm = document.querySelector("#discussion__form");
  const discussionContainer = document.querySelector("#discussion__container");
  const textarea = document.querySelector("#discussion-content");

  if (!isAuthenticated) {
    newDiscussionForm.style.display = "none";
  } else {
    newDiscussionForm.style.display = "inline-block";
  }

  [...discussionContainer.children].forEach((child, index) => {
    if (index !== 0) discussionContainer.removeChild(child);
  });

  const storedDiscussions = getStoredDiscussions().reverse();

  [...storedDiscussions, ...discussionsData].forEach((data) => {
    const newDiscussionCard = generateDiscussionCard(data);
    discussionContainer.append(newDiscussionCard);
  });

  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && textarea.value != "" && !event.shiftKey) {
      event.preventDefault();
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const currentDate = date.toLocaleDateString("en-GB");

      const newDiscussionContent = document.querySelector(
        "#discussion-content"
      ).value;
      const currentUser = getAuthenticatedUser();
      const newDiscussion = {
        comment: newDiscussionContent,
        publishDate: `${currentDate}, ${hours}:${minutes}`,
        authorUsername: currentUser.fullname,
        authorImage: currentUser.profileImg,
      };
      addNewDiscussion(newDiscussion);
      renderDiscussionCards();
      setupDiscussionLoadMoreBtn();
    }
  });

  textarea.value = "";
};

const generateDiscussionCard = (data) => {
  const RandomBackgroundColor = getRandomBackgroundColor();
  const card = document.createElement("div");
  card.classList.add("discussion__card");
  const cardInner = document.createElement("div");
  cardInner.classList.add("discussion__card--inner");
  cardInner.classList.add(RandomBackgroundColor);
  const comment = document.createElement("p");
  comment.innerHTML = data.comment;
  comment.classList.add("comment");
  const userInfo = document.createElement("div");
  userInfo.classList.add("user__info");
  const userProfile = document.createElement("div");
  userProfile.classList.add("user__profile");
  const userImage = document.createElement("div");
  userImage.classList.add("user__image");
  const userImageTag = document.createElement("img");
  userImageTag.src = `${data.authorImage}`;
  const userName = document.createElement("p");
  userName.innerHTML = data.authorUsername;
  const publishDate = document.createElement("span");
  publishDate.innerHTML = data.publishDate;
  const input = document.createElement("input");
  input.placeholder = "Пиши коментар...";
  input.setAttribute("disabled", "true");
  const reactionsDiv = document.createElement("div");
  reactionsDiv.classList.add("comment__reactions");
  const fontAwsolePlus = document.createElement("i");
  fontAwsolePlus.classList.add("fa-solid", "fa-plus");
  const commentCount = document.createElement("p");
  commentCount.innerHTML = "5 Коментари";
  const reactionsCout = document.createElement("p");
  reactionsCout.innerHTML = "84 Реакции";

  reactionsDiv.append(fontAwsolePlus, commentCount, reactionsCout);
  userImage.append(userImageTag);
  userProfile.append(userImage, userName);
  userInfo.append(userProfile, publishDate);
  cardInner.append(comment, userInfo, input, reactionsDiv);
  card.append(cardInner);
  return card;
};

function getRandomBackgroundColor() {
  const backgroundColors = [
    "purple__background",
    "blue__background",
    "green__background",
  ];
  const randomNumber = getRandomInt(3);
  return backgroundColors[randomNumber];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let shownContainerHeight = 800;
const loadMoreHeight = 400;

export const setupDiscussionLoadMoreBtn = () => {
  const button = document.querySelector("#discussion__loadMore--button");
  const wrapper = document.querySelector(".discussion__wrapper");
  const discussionContainer = document.querySelector("#discussion__container");
  const fadeContainer = document.querySelector(".fade-overlay");

  const updateContainerHeight = () => {
    wrapper.style.maxHeight = `${shownContainerHeight}px`;

    const contentHeight = discussionContainer.scrollHeight;

    if (shownContainerHeight >= contentHeight) {
      button.style.display = "none";
      fadeContainer.style.display = "none";
    } else {
      button.style.display = "block";
      fadeContainer.style.display = "block";
    }
  };

  updateContainerHeight();

  button.addEventListener("click", () => {
    shownContainerHeight += loadMoreHeight;
    updateContainerHeight();
  });
};
