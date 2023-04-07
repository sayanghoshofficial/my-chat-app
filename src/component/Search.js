import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  // use state for user name user and error
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // get current user using use context
  const { currentUser } = useContext(AuthContext);

  // this will handled search function
  const handledSearch = async () => {
    if (userName === currentUser.displayName) {
      setErr(true);
      toast.warn("You can't add your self as Your friends", {
        position: "top-left",
        theme: "colored",
      });
      return;
    }

    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docChanges().length < 1) {
        setErr(true);
        return;
      }
      setErr(false);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log("error ", err);
      setErr(true);
    }
  };

  // after enter user details fetched
  const handleKey = (e) => {
    e.code === "Enter" && handledSearch();
  };

  // this function will handled select chat function it will add as user friend
  const handledSelectChat = async () => {
    //check whether the group(chats in firestore) is exists or not, if not
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));
      if (!res.exists()) {
        //Create user chats collections
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find your friend..."
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handledSelectChat}>
          <img src={user.photoURL} alt="user-chat" />
          <div className="userChatinfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
