import React from "react";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <i class="fa-solid fa-video"></i>
          <i class="fa-solid fa-user-plus"></i>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
