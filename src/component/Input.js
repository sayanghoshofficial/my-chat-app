import React from "react";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something...." />
      <div className="send">
        <i className="fa-solid fa-paperclip"></i>
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6631/6631821.png"
            alt="img-logo"
          />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
