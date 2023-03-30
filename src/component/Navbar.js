import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  
  const onClickSignOut = () => {
    signOut(auth);
    return toast.success("Logout Successful!....", {
      position: "top-left",
      theme: "colored",
    });
  };
  return (
    <div className="navbar">
      <span className="logo">My Chat</span>

      <div className="user">
        <Link to={"/settings"} >
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
