import React, { useContext, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const [submit, setSubmit] = useState(false);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const defaultImageUrl =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  console.log(currentUser.auth);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const displayName = e.target[0].value?.trim();
    const email = e.target[1].value?.trim();
    const password = e.target[2].value?.trim();
    const confirmPassword = e.target[3].value?.trim();
    const file = e.target[4].files[0];
    if (password !== confirmPassword) {
      return toast.warn("Password and confirmPassword not matched!....", {
        position: "top-left",
      });
    }
    if (password.length < 6) {
      return toast.warn("Password will be at least 6 letter...", {
        position: "top-left",
      });
    }
    function writeUserData(userId, name, email, imageUrl) {
      set(ref(db, "users/" + userId), {
        displayName: name,
        email: email,
        photoURL: imageUrl,
      });
    }
    if (img) {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            writeUserData(currentUser.uid, displayName, email, downloadURL);
            toast.success("Profile Updated....", {
              position: "top-left",
              theme: "colored",
            });
            navigate("/");
          } catch (err) {
            toast.error(err, {
              position: "top-left",
              theme: "colored",
            });
          }
        });
      });
    } else {
      try {
        writeUserData(currentUser.uid, displayName, email, defaultImageUrl);
        toast.success("Profile Updated with out image....", {
          position: "top-left",
          theme: "colored",
        });
        navigate("/");
      } catch (err) {
        toast.success(err, {
          position: "top-left",
          theme: "colored",
        });
      }
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">My Chat</span>
        <span className="title">Update Profile</span>
        <form onSubmit={handleUpdate}>
          <input type="text" placeholder="Your Name..." />
          <input type="email" placeholder="Email..." />
          <input
            type="password"
            placeholder="Password...{use at least 6 letter}"
          />
          <input type="password" placeholder="Confirm Password..." />
          <input type="file" id="file" />
          <label htmlFor="file" onChange={(e) => setImg(e.target.files[0])}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6631/6631821.png"
              alt="img-logo"
            />
            <span>Update your avatar</span>
          </label>
          <button disabled={submit}>{submit ? "Updating" : "Submit"}</button>
        </form>
        <p>
          Go to Home page? <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Settings;
