import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const defaultURL = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handledSelectChat = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handledSelectChat(chat[1].userInfo)}
          >
            <img
              src={
                chat[1].userInfo.photoURL
                  ? chat[1].userInfo.photoURL
                  : defaultURL
              }
              alt="user-chat"
            />
            <div className="userChatinfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
      ;
    </div>
  );
};

export default Chats;
