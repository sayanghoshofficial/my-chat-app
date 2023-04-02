import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const clearSelectChat = (user) => {
    dispatch({ type: "NULL_USER", payload: user });
  };

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
    // localStorage.clear();
    // sessionStorage.clear();
    // window.location.reload();
  };
  return (
    <div className="navbar">
      <span className="logo">My Chat</span>

      <div className="user">
        <Link to={"/profile"}>
          <img src={currentUser.photoURL} alt="user" />
        </Link>

        <Link to={"/profile"}>
          <span>{currentUser.displayName}</span>
        </Link>

        <button onClick={onClickSignOut}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
