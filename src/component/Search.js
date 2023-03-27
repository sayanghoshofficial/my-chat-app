import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handledSearch = async () => {
    const q = query(
      collection(db, "users"), where("displayName", "==", userName)
    );
    // try{/
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       setUser(doc.data())
      });
      console.log("jsabjk",q);
    // }catch(err){
    //   setErr(true);
    // }
    
  };

  const handleKey = (e) => {
    e.code === "Enter" && handledSearch();
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find your friend..."
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>User not found</span>}
      {user && <div className="userChat">
        <img
          src={user.photoURL}
          alt="user-chat"
        />
        <div className="userChatinfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
};

export default Search;
