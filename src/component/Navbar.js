import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const {currentUser} =useContext(AuthContext);

  const onClickSignOut = () => {
    signOut(auth);
    return toast.success("Logout Successful!....", {
      position: "top-left",
    });
  };
  return (
    <div className="navbar">
      <span className="logo">My Chat</span>
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt="user"
        />
        <span>{currentUser.displayName}</span>
        <button onClick={onClickSignOut}>
          Logout <ToastContainer theme="dark" />
        </button>
        
      </div>
    </div>
  );
};

export default Navbar;
