import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="user"
        />
        <h5>Sayan</h5>
        <h6>Email@email.com</h6>
        <p>
          Go to Home page? <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Profile;
