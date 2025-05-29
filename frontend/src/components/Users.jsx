import { useLoaderData, useOutletContext } from "react-router-dom";
import styles from "./Users.module.css";
import { handleFetch } from "../utils/handleFetch";

import { useRef, useState } from "react";
import Conversation from "./Conversation";
import Button from "./Button";

const Users = () => {
  const users = useLoaderData();
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
      const username = users.find((user) => user.id === userId.current);

      setUser(username);
      const data = await res.json();
      setConversation(data);

      return data;
    }
  };

  return (
    <main className={styles.mainContainer}>
      <section className={styles.usersSection}>
        <section className={styles.headingSection}>
          <h3>All Users</h3>
        </section>
        <section className={styles.usersContainer}>
          <ul className={styles.userList}>
            {users.map((user) => {
              return (
                <li key={user.id} className={`${styles.user} ${styles.flex}`}>
                  <section className={styles.userInfo}>
                    <img src={user.imageUrl} alt="User avatar" />
                    <span>{user.username}</span>
                  </section>

                  <section className={styles.userButtonSection}>
                    <Button
                      text={"SEND"}
                      type={"submit"}
                      onClick={handleUserMessages}
                      id={user.id}
                    />
                  </section>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
      <section className={styles.conversationSection}>
        {user ? (
          <Conversation
            user={user}
            conversation={conversation}
            userObject={userObject}
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
