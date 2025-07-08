import { useFetcher, useLoaderData, useOutletContext } from "react-router-dom";
import styles from "./GlobalChatroom.module.css";
import Conversation from "./Conversation";
import { handleFetch } from "../utils/handleFetch";
import { useEffect, useState } from "react";
import GlobalConversation from "./GlobalConversation";

const GlobalChatroom = () => {
  const globalChatroom = useLoaderData();

  const [conversation, setConversation] = useState(
    globalChatroom ? globalChatroom : null
  );

  const {
    userObject: [userObject],
  } = useOutletContext();

  return (
    <main className={styles.mainGlobal}>
      <section className={styles.globalConversationSection}>
        <GlobalConversation
          chatroom={globalChatroom}
          conversation={conversation}
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
  const res = await handleFetch(
    `/chatroom/global`,
    JSON.stringify(submission),
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    }
  );

  return await res.json();
};

export default GlobalChatroom;
