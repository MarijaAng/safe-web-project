import { cardsData, CATEGORY_MAP } from "./cardsData.js";

import {
  isUserAuthenticated,
  getAuthenticatedUserFilters,
  setAuthenticatedUserFilters,
} from "../sessionHelper.js";

import { SUPPORTED_ROUTES_MAP, playStopVideo } from "../index.js";

const cardsLoadMoreButton = document.querySelector("#cards__loadMore--Button");
export const informModal = document.querySelector("#inform__modal");
const informLinks = document.querySelectorAll(".inform__links p");

let activeFilters = Object.values(CATEGORY_MAP);
let shownCards = 0;
const initialCardsCount = 4;
const loadMoreCount = 2;

export const renderCards = () => {
  const informCardsDiv = document.querySelector(".inform__cards");
  informCardsDiv.innerHTML = "";

  let filtersToRender = defaultOrUserFilters();
  updateFilterButtonStyles(filtersToRender);

  const filteredCards = cardsData.filter((card) =>
    filtersToRender.includes(card.category)
  );

  const screenWidth = window.innerWidth;

  let cardsToRender = [];

  if (screenWidth > 768) {
    cardsToRender = filteredCards;
    cardsLoadMoreButton.style.display = "none";
  } else {
    if (shownCards === 0) {
      shownCards = initialCardsCount;
    }
    cardsToRender = filteredCards.slice(0, shownCards);
    if (shownCards < filteredCards.length) {
      cardsLoadMoreButton.style.display = "block";
    } else {
      cardsLoadMoreButton.style.display = "none";
    }
  }

  cardsToRender.forEach((card) => {
    const newCard = generateInformCard(card);
    informCardsDiv.append(newCard);
  });

  updateFilterButtonStyles(filtersToRender);
};

const generateInformCard = (data) => {
  const card = document.createElement("div");
  card.classList.add("inform__card--parent");
  card.setAttribute("data-category", `${data.category}`);
  card.addEventListener("click", () => {
    generateModal(data);
    informModal.style.display = "block";
  });
  const inner = document.createElement("div");
  inner.classList.add("inform__card--inner", "border__radius");
  const video = document.createElement("video");
  video.setAttribute("muted", "");
  const source = document.createElement("source");
  source.src = "../videos/project2.mp4";
  source.setAttribute("type", "video/mp4");
  const playButton = document.createElement("div");
  playButton.classList.add("centered__content");
  const playButtonI = document.createElement("i");
  playButton.classList.add("play__button");
  playButtonI.classList.add("fa-solid", "fa-circle-play");
  const content = document.createElement("div");
  content.classList.add("inform__card--content");
  const contentTitle = document.createElement("h4");
  contentTitle.innerHTML = `${data.title}`;
  const contentParagraph = document.createElement("p");
  contentParagraph.innerHTML = `${data.content}`;
  const contentSpan = document.createElement("span");
  contentSpan.innerHTML = `Објавено на ${data.publishDate}`;

  playButton.addEventListener("click", (event) => {
    event.stopPropagation();
    playStopVideo(video, playButtonI);
  });

  content.append(contentTitle, contentParagraph, contentSpan);
  playButton.append(playButtonI);
  video.append(source);
  inner.append(playButton, video, content);
  card.append(inner);

  return card;
};

const generateModal = (data) => {
  const textSection = document.querySelector(".modal__text--section");
  textSection.innerHTML = "";
  const cardTitle = document.createElement("h3");
  cardTitle.innerHTML = `${data.title}`;
  const cardDescription = document.createElement("p");
  cardDescription.innerHTML =
    "Лорем ипсум е едноставен модел на текст кој се користел печатарската индустрија. Лорем ипсум бил индустрии стандард кој се користел како модел уште пред 1500 години, кога непознат печатар зел кутија со букви и ги сложил на таков начин за да направи примерок на книга. И не само што овој модел опстанал пет векови туку почнал да се користи и во електронските медиуми, кој се уште не е променет.";
  const publishDate = document.createElement("span");
  publishDate.innerHTML = `Објавено на ${data.publishDate}`;
  textSection.append(cardTitle, cardDescription, publishDate);
};

export const setFiltersFunctionality = () => {
  const filterButtons = document.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    const category = button.getAttribute("data-category");

    button.addEventListener("click", () => {
      let filtersToRender = defaultOrUserFilters();

      if (filtersToRender.includes(category)) {
        filtersToRender = filtersToRender.filter((f) => f !== category);
      } else {
        filtersToRender.push(category);
      }

      activeFilters = filtersToRender;
      shownCards = 0;
      setAuthenticatedUserFilters(filtersToRender);
      renderCards();
      updateFilterButtonStyles(filtersToRender);
    });
  });
  updateFilterButtonStyles(defaultOrUserFilters());
};

const defaultOrUserFilters = () => {
  let filters = activeFilters;

  if (isUserAuthenticated()) {
    const userFilters = getAuthenticatedUserFilters();
    filters = userFilters || activeFilters;
  }
  return filters;
};

const updateFilterButtonStyles = (filters) => {
  const filterButtons = document.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    const category = button.getAttribute("data-category");

    if (filters.includes(category)) {
      button.classList.remove("inactive__filter");
    } else {
      button.classList.add("inactive__filter");
    }
  });
};

cardsLoadMoreButton.addEventListener("click", () => {
  let filtersToRender = defaultOrUserFilters();
  const filteredCards = cardsData.filter((card) =>
    filtersToRender.includes(card.category)
  );

  shownCards += loadMoreCount;

  if (shownCards >= filteredCards.length) {
    cardsLoadMoreButton.style.display = "none";
  }
  renderCards();
});

window.addEventListener("resize", () => {
  shownCards = 0;
  renderCards();
});

informLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (link.classList.contains("inactive__link")) {
      link.classList.remove("inactive__link");
    } else {
      link.classList.add("inactive__link");
    }
  });
});

export const setModalInputFunctionality = () => {
  const modalInput = document.querySelector("#inform__modal input");

  modalInput.addEventListener("click", () => {
    if (!isUserAuthenticated()) {
      location.hash = SUPPORTED_ROUTES_MAP.login;
      modalInput.setAttribute("disabled", "true");
    }
  });
};
