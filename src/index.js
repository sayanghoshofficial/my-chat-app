import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { AuthContextprovider } from "./context/AuthContext";
import { ChatContextprovider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ToastContainer></ToastContainer>
  <AuthContextprovider>
    <ChatContextprovider>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </ChatContextprovider>
  </AuthContextprovider>
);
