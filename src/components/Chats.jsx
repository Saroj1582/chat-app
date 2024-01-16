import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

function Chats() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    }
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  function handleSelect(u) {
    dispatch({ type: "CHANGE_USER", payload: u });
  }

  return (
    <div>
      {Object.entries(chats)?.map((chat) => (
        <div
          onClick={() => handleSelect(chat[1].userInfo)}
          key={chat[0]}
          className="userContainer"
        >
          <img
            className="sidebarProfileImg"
            src={chat[1].userInfo.photoURL}
            alt=""
          />
          <div className="userDetail">
            <span className="userTitle">{chat[1].userInfo.displayName}</span>
            <span className="userMsg">{chat[1].lastMessage?.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
