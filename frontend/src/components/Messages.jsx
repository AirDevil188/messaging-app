import { useLoaderData, useLocation, useOutletContext } from "react-router-dom";
import styles from "./Messages.module.css";
import { handleFetch } from "../utils/handleFetch";

import { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import MessagesList from "./MessagesList";

const Users = () => {
  const chatrooms = useLoaderData();

  const location = useLocation();
  const [toggleConversation, setToggleConversation] = useState(false);

  const {
    userObject: [userObject],
  } = useOutletContext();

  const userId = useRef(null);
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState({});
  const [messagesList, setMessagesList] = useState(
    chatrooms ? chatrooms : null
  );
  const [previewMessages, setPreviewMessages] = useState({});

  useEffect(() => {
    if (location.pathname === "/messages") {
      const newPreviewMessages = {};

      chatrooms.forEach((chatroom) => {
        const chatroomMessages = [...chatroom.messages];
        const lastMessage =
          chatroomMessages.length > 0
            ? chatroomMessages[chatroomMessages.length - 1]
            : null;

        newPreviewMessages[chatroom.id] = lastMessage;
      });
      setPreviewMessages(newPreviewMessages);
    }
  }, [chatrooms]);

  const handleUserMessages = async (e) => {
    userId.current = e.target.id;
    const res = await handleFetch(
      `/chatroom/${userId.current}`,
      undefined,
      "GET",
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    );
    if (res.ok) {
      const user = chatrooms.find((chatroom) => chatroom.id === userId.current);
      setUser(user);

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
          {location.pathname === "/messages" ? (
            <h3>All Messages</h3>
          ) : (
            <h3>All Users</h3>
          )}
        </section>
        <section
          className={
            toggleConversation
              ? `${styles.usersContainer} ${styles.hidden}`
              : `${styles.usersContainer}`
          }
        >
          {chatrooms ? (
            <MessagesList
              messages={messagesList}
              handleUserMessages={handleUserMessages}
              userObject={userObject}
              previewMessages={previewMessages}
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

export const handleMessageSubmit = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  const submission = {
    text: formData.text,
    chatroomId: formData.chatroomId,
    userId: formData.userId,
  };
  const res = await handleFetch(
    `/messages/${submission.userId}`,
    JSON.stringify(submission),
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    }
  );

  return await res.json();
};

export default Users;
