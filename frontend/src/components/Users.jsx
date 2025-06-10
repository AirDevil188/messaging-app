import {
  useLoaderData,
  useLocation,
  useOutletContext,
  useRouteError,
} from "react-router-dom";
import styles from "./Users.module.css";
import { handleFetch } from "../utils/handleFetch";

import { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import UserList from "./UserList";
import Button from "./Button";
import PropTypes from "prop-types";

const Users = () => {
  const users = useLoaderData();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");

  const {
    userObject: [userObject],
  } = useOutletContext();

  const userId = useRef(null);
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState({});
  const [userList, setUserList] = useState(users ? users : null);

  useEffect(() => {
    if (searchInput == "") setUserList(users);
  }, [searchInput]);

  const handleUserMessages = async (e) => {
    userId.current = e.target.id;
    const res = await handleFetch(
      `/chatroom/${userId.current}`,
      undefined,
      "GET"
    );
    if (res.ok) {
      const userObject = users.find((user) => user.id === userId.current);
      setUser(userObject);
      const data = await res.json();
      setConversation(data);

      return data;
    }
  };

  const handleSearch = (e) => {
    console.log(searchInput);
    setSearchInput(e.target.value);
    if (searchInput === "") {
      console.log("EMPTY");
      setUserList(users);
    } else {
      setUserList(
        userList.filter((user) =>
          user.username.toLowerCase().includes(searchInput.toLocaleLowerCase())
        )
      );
    }
  };

  return (
    <main className={styles.mainContainer}>
      <section className={styles.usersSection}>
        <section className={styles.headingSection}>
          {location.pathname === "/messages" ? (
            <h3>All Messages</h3>
          ) : (
            <h3>All Users</h3>
          )}
        </section>
        <Searchbox handleSearch={handleSearch} />
        <section className={styles.usersContainer}>
          {users ? (
            <UserList
              users={userList}
              handleUserMessages={handleUserMessages}
              userObject={userObject}
            />
          ) : null}
        </section>
      </section>
      <section className={styles.conversationSection}>
        {user ? (
          <Conversation
            user={user}
            conversation={conversation}
            userObject={userObject}
            setConversation={setConversation}
          />
        ) : null}
      </section>
    </main>
  );
};

const Searchbox = ({ handleSearch }) => {
  return (
    <>
      {location.pathname == "/all-users" ? (
        <section className={styles.searchSection}>
          <input
            type="text"
            id="search"
            name="search"
            onChange={handleSearch}
            placeholder="...Search"
          />
        </section>
      ) : null}
    </>
  );
};

export const handleMessageSubmit = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  const submission = {
    text: formData.text,
    userId: formData.userId,
  };
  const res = await handleFetch(
    `/messages/${submission.userId}`,
    submission,
    "POST"
  );

  return await res.json();
};
Searchbox.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Users;
