import { handleFetch } from "./handleFetch";

export const getMessages = async () => {
  const res = await handleFetch("/messages", undefined, "GET");
  console.log(res);
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 401) {
    const err = new Error("You are not authorized to access this page.");
    return err;
  }

  if (res.status === 404) {
    const err = new Error("There are no messages!");
    return err;
  }
};

export const getUsers = async () => {
  const res = await handleFetch("/all-users", undefined, "GET");
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 401) {
    const err = new Error("You are not authorized to access this page");
    return err;
  }

  if (res.status === 404) {
    const err = new Error("There are no users!");
    return err;
  }
};
