import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">My Chat</span>
      <div className="user">
        <img
          src="https://user-images.githubusercontent.com/99132893/227786098-2f48105b-2034-431c-96a4-065eab0f0e80.jpg"
          alt="user"
        />
        <span>Sayan</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
