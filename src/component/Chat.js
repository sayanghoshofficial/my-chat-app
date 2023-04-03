import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const defaultURL = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>
          {data.user ? (
            <img
              src={data.user.photoURL ? data.user.photoURL : defaultURL}
              style={data.user.photoURL ? null : { display: "none" }}
            />
          ) : null}
          {data.user?.displayName}
        </span>
        <div className="chatIcons">
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-user-plus"></i>
          <i className="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
