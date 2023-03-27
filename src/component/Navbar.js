import { signOut } from "firebase/auth";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase";

const Navbar = () => {
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
          src="https://user-images.githubusercontent.com/99132893/227786098-2f48105b-2034-431c-96a4-065eab0f0e80.jpg"
          alt="user"
        />
        <span>Sayan</span>
        <button onClick={onClickSignOut}>
          Logout <ToastContainer theme="dark" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
