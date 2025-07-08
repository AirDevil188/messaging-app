import { useLoaderData, useOutletContext } from "react-router-dom";
import styles from "./Users.module.css";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import UsersList from "./UsersList";
import Conversation from "./Conversation";
import { handleFetch } from "../utils/handleFetch";

const Users = () => {
  const users = useLoaderData();

  const [searchInput, setSearchInput] = useState("");
  const [toggleConversation, setToggleConversation] = useState(false);
  const [userList, setUserList] = useState(users ? users : null);
  const [conversation, setConversation] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    userObject: [userObject],
  } = useOutletContext();

  useEffect(() => {
    if (searchInput == "") setUserList(users);
  }, [searchInput]);

  const userId = useRef(null);
  const [user, setUser] = useState(null);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    if (searchInput === "") {
      setUserList(users);
    } else {
      setUserList(
        userList.filter((user) =>
          user.username.toLowerCase().includes(searchInput.toLocaleLowerCase())
        )
      );
    }
  };

  const handleUserMessages = async (e) => {
    userId.current = e.currentTarget.id;
    const res = await handleFetch(
      `/messages/users/${userId.current}`,
      undefined,
      "GET",
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    );
    if (res.ok) {
      const userObject = users.find((user) => user.id === userId.current);

      setUser(userObject);

      const data = await res.json();

      setToggleConversation(true);
      setConversation(data);

      return data;
    }
  };

  return (
    <main className={styles.mainUsers}>
      <section className={styles.usersSection}>
        <section className={styles.headingSection}>
          <h3>All Users</h3>
        </section>
        <Searchbox
          handleSearch={handleSearch}
          toggleConversation={toggleConversation}
          isMobile={isMobile}
        />
        <section
          className={
            toggleConversation
              ? `${styles.usersContainer} ${styles.hidden}`
              : `${styles.usersContainer}`
          }
        >
          {users ? (
            <UsersList
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
            setUser={setUser}
            conversation={conversation}
            userObject={userObject}
            setConversation={setConversation}
            toggleConversation={toggleConversation}
            setToggleConversation={setToggleConversation}
          />
        ) : null}
      </section>
    </main>
  );
};

export const handleUserMessageSubmit = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const submission = {
    text: formData.text,
    userId: formData.userId,
  };
  const res = await handleFetch(
    `/messages/create/${submission.userId}`,
    JSON.stringify(submission),
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    }
  );
  return await res.json();
};

const Searchbox = ({ handleSearch, toggleConversation, isMobile }) => {
  return (
    <>
      <section
        className={
          toggleConversation && isMobile
            ? `${styles.searchSection} ${styles.hidden}`
            : `${styles.searchSection}`
        }
      >
        <input
          type="text"
          id="search"
          name="search"
          onChange={handleSearch}
          placeholder="Search"
        />
      </section>
    </>
  );
};

Searchbox.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  toggleConversation: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Users;
