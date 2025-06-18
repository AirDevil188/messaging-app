import { format, parseISO } from "date-fns";
import styles from "./Conversation.module.css";
import { useFetcher } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { IoArrowBackCircle, IoSend } from "react-icons/io5";

const Conversation = ({
  user,
  conversation,
  setConversation,
  setLoading,
  userObject,
  toggleConversation,
  setToggleConversation,
  setUser,
}) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "loading") {
      setConversation(fetcher.data);
    }
  }, [fetcher.state]);

  const handleBackButton = () => {
    setToggleConversation(() => setToggleConversation(!toggleConversation));
    setUser(null);
  };

  return (
    <>
      <section className={styles.conversationInfo}>
        <section className={`${styles.conversationButton} ${styles.hidden}`}>
          <IoArrowBackCircle
            onClick={handleBackButton}
            size={50}
            fill="#27b498"
          />
        </section>
        <section className={styles.conversationImage}>
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="User avatar" />
          ) : null}
        </section>
        <section className={styles.conversationUsername}>
          <span>{user?.username}</span>
        </section>
      </section>
      <section className={`${styles.conversationContainer}`}>
        {conversation?.messages ? (
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

                  <section
                    className={
                      message.userId === userObject.user
                        ? styles.messageContent
                        : styles.messageContentSecondUser
                    }
                  >
                    <p>{message.text}</p>
                  </section>
                </article>
              );
            })}
          </section>
        ) : null}
      </section>
      <section className={styles.formContainer}>
        <section className={styles.formWrapper}>
          <fetcher.Form method="POST">
            <input
              type="hidden"
              name={user ? "userId" : "chatroomId"}
              id={user ? "userId" : "chatroomId"}
              value={user ? user.id : conversation.id}
            />
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
    </>
  );
};

Conversation.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.bool.isRequired,
  conversation: PropTypes.object.isRequired,
  setConversation: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired,
  setLoading: PropTypes.bool.isRequired,
  toggleConversation: PropTypes.bool.isRequired,
  setToggleConversation: PropTypes.bool.isRequired,
};

export default Conversation;
