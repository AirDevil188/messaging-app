import { format, parseISO } from "date-fns";
import styles from "./Conversation.module.css";
import { useFetcher } from "react-router-dom";
import Button from "./Button";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";

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
        <section className={styles.conversationButton}>
          <IoMdArrowBack onClick={handleBackButton} />
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
        <fetcher.Form method="POST">
          <input
            type="hidden"
            name={user ? "userId" : "chatroomId"}
            id={user ? "userId" : "chatroomId"}
            value={user ? user.id : conversation.id}
          />
          <section className={styles.formGroup}>
            <input type="text" name="text" id="text" required={true} />
          </section>
          <section className={styles.buttonContainer}>
            <Button text={"SEND"} type={"submit"}></Button>
          </section>
        </fetcher.Form>
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
