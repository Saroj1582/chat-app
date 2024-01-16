import { IoMdVideocam } from "react-icons/io";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatTopbar">
        <span>{data.user?.displayName}</span>
        <div className="topbarIcons">
          <IoMdVideocam className="topbarIcon" />
          <BsFillPersonPlusFill className="topbarIcon" />
          <HiOutlineDotsHorizontal className="topbarIcon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
