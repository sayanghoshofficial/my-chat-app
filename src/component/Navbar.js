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
  const { data, setData } = useContext(ChatContext);

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // window.location.reload();
        setData({ chatId: "null", user: {} });
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
        <Link to={"/settings"}>
          <img src={currentUser.photoURL} alt="user" />
        </Link>

        <Link to={"/settings"}>
          <span>{currentUser.displayName}</span>
        </Link>

        <button onClick={onClickSignOut}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
