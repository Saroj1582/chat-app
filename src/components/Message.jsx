import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useRef } from "react";
import { useEffect } from "react";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  return (
    // <div className="messageContainer">
    <div
      ref={ref}
      className={`leftMessage ${
        message.senderId === currentUser.uid && "rightMessage"
      }`}
    >
      <div className="leftUserInfo">
        <img
          className="senderImg"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span className="sentMsgTime">just now</span>
      </div>
      <div className="msgContent">
        <p className="chatMsg">{message.text}</p>
        {message.img && <img className="contentImg" src={message.img} alt="" />}
      </div>
    </div>
    // </div>
  );
}

export default Message;
