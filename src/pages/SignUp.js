import React from "react";

const SignUp = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">My Chat</span>
        <span className="title">Sign Up</span>
        <form>
          <input type="text" placeholder="Your Name..." />
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
          <input type="password" placeholder="Confirm Password..." />
          <input type="file" id="file" />
          <label htmlFor="file">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6631/6631821.png"
              alt="img-logo"
            />
            <spna>Add an avatar</spna>
          </label>
          <button>Sign Up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default SignUp;
