import { CATEGORY_MAP } from "./learn-page/cardsData.js";

export const SESSION_KEYS = {
  AUTHENTICATED_USER: "AUTHENTICATED_USER",
  "123-filters": "123-filters",
  "456-filters": "456-filters",
  "789-filters": "789-filters",
  NEW_DISCUSSIONS: "NEW_DISCUSSIONS",
  AUTHENTICATED__USERS: "AUTHENTICATED_USERS",
};

const USER_INFO_MAP = {
  User123: {
    fullname: "Марија Анѓелевска",
    email: "marija@gmail.com",
    birthYear: "2001",
    gender: "женски",
    profileImg: "./images/user123.png",
    password: "dnjelkf",
    id: "123",
  },
  User456: {
    fullname: "Филип Богојески",
    email: "filbo@outlook.com",
    birthYear: "1996",
    gender: "машки",
    profileImg: "./images/user456.png",
    password: "iofem08",
    id: "456",
  },
  User789: {
    fullname: "Елена Петроска",
    email: "petroska99@gmail.com",
    birthYear: "1999",
    gender: "женски",
    profileImg: "./images/user789.png",
    password: "ihfpewf93",
    id: "789",
  },
};

export const setAuthenticatedUser = (username) => {
  const userInfo = USER_INFO_MAP[username];
  const authenticatedUsers = getStoredAuthenticatedUsers();
  const index = authenticatedUsers.findIndex(
    (person) => person.id === userInfo.id
  );

  if (index !== -1) {
    const user = authenticatedUsers[index];
    localStorage.setItem(SESSION_KEYS.AUTHENTICATED_USER, JSON.stringify(user));
  } else {
    storeOrUpdateAuthenticatedUser(userInfo);
    localStorage.setItem(
      SESSION_KEYS.AUTHENTICATED_USER,
      JSON.stringify(userInfo)
    );
  }

  const userFiltersKey = getAuthenticatedUserFiltersKey();
  const stringArray = localStorage.getItem(userFiltersKey);
  if (!stringArray) {
    localStorage.setItem(
      userFiltersKey,
      JSON.stringify(Object.values(CATEGORY_MAP))
    );
  }
};

export const isUserAuthenticated = () => {
  return Boolean(localStorage.getItem(SESSION_KEYS.AUTHENTICATED_USER));
};

export const getAuthenticatedUser = () => {
  return JSON.parse(localStorage.getItem(SESSION_KEYS.AUTHENTICATED_USER));
};

export const updateAuthenticatedUserInfo = (updatedUserDetails) => {
  const userInfo = JSON.stringify(updatedUserDetails);
  localStorage.setItem(SESSION_KEYS.AUTHENTICATED_USER, userInfo);
  storeOrUpdateAuthenticatedUser(JSON.parse(userInfo));
};

export const removeAuthenticatedUser = () => {
  return localStorage.removeItem(SESSION_KEYS.AUTHENTICATED_USER);
};

export const getAuthenticatedUserFilters = () => {
  const filtersKey = getAuthenticatedUserFiltersKey();
  const filtersArray = localStorage.getItem(filtersKey);

  return filtersArray ? JSON.parse(filtersArray) : null;
};

export const getAuthenticatedUserFiltersKey = () => {
  const authenticatedUser = getAuthenticatedUser();
  const userId = authenticatedUser.id;
  return `${userId}-filters`;
};

export const setAuthenticatedUserFilters = (filters) => {
  if (isUserAuthenticated()) {
    localStorage.setItem(
      getAuthenticatedUserFiltersKey(),
      JSON.stringify(filters)
    );
  }
};

export const addNewDiscussion = (newDiscussion) => {
  const storedDiscussions =
    localStorage.getItem(SESSION_KEYS.NEW_DISCUSSIONS) || "[]";
  const updateNewDiscussions = JSON.parse(storedDiscussions);
  updateNewDiscussions.push(newDiscussion);
  localStorage.setItem(
    SESSION_KEYS.NEW_DISCUSSIONS,
    JSON.stringify(updateNewDiscussions)
  );
};

export const getStoredDiscussions = () => {
  const storedDiscussions =
    localStorage.getItem(SESSION_KEYS.NEW_DISCUSSIONS) || "[]";
  return JSON.parse(storedDiscussions);
};

export const storeOrUpdateAuthenticatedUser = (user) => {
  const storedUsers =
    localStorage.getItem(SESSION_KEYS.AUTHENTICATED__USERS) || "[]";
  const usersArray = JSON.parse(storedUsers);

  const index = usersArray.findIndex((person) => person.id === user.id);

  if (index !== -1) {
    usersArray[index] = user;
  } else {
    usersArray.push(user);
  }

  localStorage.setItem(
    SESSION_KEYS.AUTHENTICATED__USERS,
    JSON.stringify(usersArray)
  );
};

export const getStoredAuthenticatedUsers = () => {
  const storedUsers =
    localStorage.getItem(SESSION_KEYS.AUTHENTICATED__USERS) || "[]";
  return JSON.parse(storedUsers);
};
