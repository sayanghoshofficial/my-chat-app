import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img
          src={currentUser.photoURL}
          alt="user"
        />
        <h5>{currentUser.displayName}</h5>
        <h6>{currentUser.email}</h6>
        <p>
          Go to Home page? <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Profile;
