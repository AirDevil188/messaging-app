import { handleFetch } from "./handleFetch";

export const getMessages = async () => {
  const res = await handleFetch("/messages", undefined, "GET");
  console.log(res);
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

export const getAllChatRooms = async () => {
  const res = await handleFetch("/messages", undefined, "GET");
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
