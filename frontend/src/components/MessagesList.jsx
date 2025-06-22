import Button from "./Button";
import styles from "../components/MessagesList.module.css";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const MessagesList = ({
  messages,
  handleUserMessages,
  userObject,
  previewMessages,
}) => {
  return (
    <ul className={styles.userList}>
      {messages.map((chatroom) => {
        return (
          <button
            key={chatroom.id}
            id={chatroom.id}
            className={`${styles.user} ${styles.flex}`}
            type="submit"
            onClick={handleUserMessages}
          >
            {chatroom.users.map((user) => {
              return (
                <section key={user.id}>
                  <section className={styles.userInfo}>
                    <img src={user.imageUrl} alt="User avatar" />
                    <span>{user.username}</span>
                  </section>
                  <section className={styles.userMessage}>
                    {previewMessages
                      ? Object.values(previewMessages).map((msg) => {
                          if (
                            user.id === msg.userId ||
                            user.id === msg.secondUserId
                          ) {
                            return <span key={msg.id}>{msg.text}</span>;
                          }
                        })
                      : null}
                  </section>

                  <section className={styles.userButtonSection}></section>
                </section>
              );
            })}
          </button>
        );
      })}
    </ul>
  );
};

MessagesList.propTypes = {
  messages: PropTypes.object.isRequired,
  handleUserMessages: PropTypes.func.isRequired,
  userObject: PropTypes.object.isRequired,
  previewMessages: PropTypes.array.isRequired,
};

export default MessagesList;
