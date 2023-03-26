import React from "react";

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/15737940/pexels-photo-15737940.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=loa"
          alt="user"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        {/* <img
          src="https://user-images.githubusercontent.com/99132893/227786098-2f48105b-2034-431c-96a4-065eab0f0e80.jpg"
          alt="you"
        /> */}
      </div>
    </div>
  );
};

export default Message;
