import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const clearSelectChat = (user) => {
    dispatch({ type: "NULL_USER", payload: user });
  };

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        clearSelectChat(currentUser);
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
  };
  
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="profileImg"
          src={currentUser.photoURL}
          alt="user"
        />
        <h5>{currentUser.displayName}</h5>
        <h6>{currentUser.email}</h6>
        <button 
        onClick={onClickSignOut}
        >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout</button>
        <p>
          Go to Home page? <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Profile;
