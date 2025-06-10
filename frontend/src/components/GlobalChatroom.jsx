import { useLoaderData, useOutletContext } from "react-router-dom";
import styles from "./GlobalChatroom.module.css";
import Conversation from "./Conversation";
import { handleFetch } from "../utils/handleFetch";
import { useState } from "react";

const GlobalChatroom = () => {
  const globalChatroom = useLoaderData();
  const [conversation, setConversation] = useState({});
  const {
    userObject: [userObject],
  } = useOutletContext();

  return (
    <main>
      <section className={styles.conversationSection}>
        <Conversation
          conversation={globalChatroom}
          userObject={userObject}
          setConversation={setConversation}
        />
      </section>
    </main>
  );
};

export const handleGlobalMessageSubmit = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  const submission = {
    text: formData.text,
    chatroomId: formData.chatroomId,
  };
  const res = await handleFetch(`/chatroom/global`, submission, "POST");

  return await res.json();
};

export default GlobalChatroom;
