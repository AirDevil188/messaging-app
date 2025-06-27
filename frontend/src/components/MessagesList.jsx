import styles from "../components/MessagesList.module.css";
import PropTypes from "prop-types";

import { calculateDates } from "../utils/calculateDateDifference";

const startDate = new Date();
const MessagesList = ({ messages, handleUserMessages, previewMessages }) => {
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
                <section key={user.id} className={styles.userWrapper}>
                  <section className={styles.userInfo}>
                    <section className={styles.userImage}>
                      <img src={user.imageUrl} alt="User avatar" />
                    </section>
                    <section className={styles.messageDetails}>
                      <span>{user.username}</span>
                      {previewMessages
                        ? Object.values(previewMessages).map((msg) => {
                            if (
                              user.id === msg.userId ||
                              user.id === msg.secondUserId
                            ) {
                              return (
                                <section
                                  className={styles.userMessage}
                                  key={msg.id}
                                >
                                  <span>{msg.text + " "}</span>
                                  <time>
                                    {calculateDates(startDate, msg.timestamp)}
                                  </time>
                                </section>
                              );
                            }
                          })
                        : null}
                    </section>
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
