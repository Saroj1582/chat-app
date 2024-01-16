import { useContext, useState, useEffect } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Messages() {
  const { data } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  console.log(messages);
  return (
    <>
      <div className="messageContainer">
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </div>
    </>
  );
}

export default Messages;
