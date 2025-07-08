import PropTypes from "prop-types";
import styles from "./GlobalConversation.module.css";
import { format, parseISO } from "date-fns";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import { IoSend } from "react-icons/io5";

const GlobalConversation = ({
  chatroom,
  conversation,
  userObject,
  setConversation,
}) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "loading") {
      setConversation(fetcher.data);
    }
  }, [fetcher.state]);
  return (
    <>
      <>
        <section className={styles.conversationInfo}>
          <section className={styles.conversationImage}></section>
          <section className={styles.conversationUsername}>
            <h3>Global Chatroom</h3>
          </section>
        </section>
        <section className={`${styles.conversationContainer}`}>
          {conversation ? (
            <section className={styles.conversationWrapper}>
              {conversation.messages.map((message) => {
                return (
                  <article className={styles.message} key={message.id}>
                    <section
                      className={
                        message.userId === userObject.user
                          ? styles.senderInfo
                          : styles.secondUserSenderInfo
                      }
                    >
                      <span>{message.user.username}</span>
                      <time>
                        {format(parseISO(`${message.timestamp}`), "PPp")}
                      </time>
                    </section>
                    <p
                      className={
                        message.userId === userObject.user
                          ? styles.messageContent
                          : styles.messageContentSecondUser
                      }
                    >
                      {message.text}
                    </p>
                  </article>
                );
              })}
            </section>
          ) : (
            <section
              className={`${styles.conversationWrapper} ${styles.center}`}
            >
              <section className={styles.messageSection}>
                <h3>There are no messages!</h3>
              </section>
            </section>
          )}
        </section>
        <>
          <section className={styles.formContainer}>
            <section className={styles.formWrapper}>
              <fetcher.Form method="POST">
                {chatroom ? (
                  <input
                    type="hidden"
                    name={"chatroomId"}
                    id={"chatroomId"}
                    value={chatroom.id}
                  />
                ) : null}
                <section className={styles.formGroup}>
                  <textarea
                    name="text"
                    id="text"
                    required={true}
                    placeholder="What's on your mind?"
                  />
                  <button type="submit" id={styles.sendMsgButton}>
                    <IoSend size={30} fill="#27b498"></IoSend>
                  </button>
                </section>
              </fetcher.Form>
            </section>
          </section>
        </>{" "}
      </>
    </>
  );
};

GlobalConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  chatroom: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired,
  setConversation: PropTypes.bool.isRequired,
};
export default GlobalConversation;
