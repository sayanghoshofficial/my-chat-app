import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import Picker, { EmojiClickData, Emoji, SkinTones } from "emoji-picker-react";

const Input = () => {
  // useState for text and img send to the user
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  // get current user using use context
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // handled send message
  const handledSendMessage = async () => {
    // if user want to send image this will handled that
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          toast.error(error, {
            position: "top-left",
            theme: "colored",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    const { unified } = emojiData;
    const emoji = String.fromCodePoint(`0x${unified}`);

    setText(text + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something...."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {/* Emoji picker */}
      {selectedEmoji ? (
        // <div className="selected-emoji">
        <Emoji
          emoji={selectedEmoji}
          size={22}
          native={true}
          onClick={handleEmojiClick}
        />
      ) : // </div>
      null}

      {showEmojiPicker && (
        <Picker
          onEmojiClick={handleEmojiClick}
          disableAutoFocus={true}
          groupNames={{ smileys_people: "PEOPLE" }}
          native={true}
          SkinTone={SkinTones.NONE}
        />
      )}

      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />

        <label htmlFor="file">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6631/6631821.png"
            alt="img-logo"
          />
        </label>

        {/* Emoji picker toggle button */}
        <button
          className="emojiButton"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {showEmojiPicker ? (
            <i className="fa-solid fa-face-smile"></i>
          ) : (
            <i className="fa-regular fa-face-smile"></i>
          )}
        </button>
        <button onClick={handledSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Input;
