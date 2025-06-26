import { handleFetch } from "./handleFetch";

export const getMessages = async () => {
  const res = await handleFetch("/messages", undefined, "GET", {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  });

  if (res.ok) {
    return await res.json();
  }

  if (res.status === 401) {
    throw new Error("You are not authorized to access this page!");
  }

  if (res.status === 404) {
    throw new Error("There are no messages!");
  }
};

export const getUsers = async () => {
  const res = await handleFetch("/all-users", undefined, "GET");
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 401) {
    throw new Error("You are not authorized to access this page!");
  }

  if (res.status === 404) {
    throw new Error("Users not found!");
  }
};

export const getGlobalChatroom = async () => {
  const res = await handleFetch("/chatroom/global", undefined, "GET", {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  });
  if (res.ok) {
    return await res.json();
  }
  if (res.status === 401) {
    throw new Error("You are not authorized to access this page!");
  }

  if (res.status === 401) {
    throw new Error("Global chat Not Found!");
  }
};

export const getAllChatRooms = async () => {
  const res = await handleFetch("/messages", undefined, "GET", {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  });
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 401) {
    throw new Error("You are not authorized to access this page!");
  }

  if (res.status === 404) {
    throw new Error("Messages Not Found!");
  }
};

export const getLoggedInUser = async () => {
  const res = await handleFetch("/profile", undefined, "GET", {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  });
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 401) {
    throw new Error("You are not authorized to access this page!");
  }

  if (res.status === 404) {
    throw new Error("Profile Not Found!");
  }
};
