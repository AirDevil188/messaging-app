import {
  useLoaderData,
  useLocation,
  useOutletContext,
  useRouteError,
} from "react-router-dom";
import styles from "./Users.module.css";
import { handleFetch } from "../utils/handleFetch";

import { useRef, useState } from "react";
import Conversation from "./Conversation";
import UserList from "./UserList";

const Users = () => {
  const users = useLoaderData();
  const location = useLocation();

  const {
    userObject: [userObject],
  } = useOutletContext();

  const userId = useRef(null);
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState({});

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
        <section className={styles.usersContainer}>
          {users ? (
            <UserList
              users={users}
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

export default Users;
