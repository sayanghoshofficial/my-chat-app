import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./App";
import { AuthContextprovider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextprovider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextprovider>
);
