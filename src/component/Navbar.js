import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { ChatContext, NULL_USER } from "../context/ChatContext";

const Navbar = () => {
  // get current user using use context
  const { currentUser } = useContext(AuthContext);
  // get user chat date by use context
  const { dispatch } = useContext(ChatContext);

  // clear chat after sign out
  const clearSelectChat = (user) => {
    dispatch({ type: NULL_USER, payload: user });
  };

  // it handled the sign out from function
  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        clearSelectChat(currentUser);
        toast.success("Logout Successful!....", {
          position: "top-left",
          theme: "colored",
        });
      })
      .catch((error) => {
        // An error happened.
        toast.error(error, {
          position: "top-left",
          theme: "colored",
        });
      });
  };
  return (
    <div className="navbar">
      <span className="logo">My Chat</span>

      <div className="user">
        <Link to={"/profile"}>
          <img
            src={currentUser.photoURL}
            alt="user"
          />
        </Link>

        <Link to={"/profile"}>
          <span>{currentUser.displayName}</span>
        </Link>

        <button onClick={onClickSignOut}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
