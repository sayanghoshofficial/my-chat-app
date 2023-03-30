import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db, storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const [submit, setSubmit] = useState(false);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);

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
    if (img) {
        // const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, img);
        // uploadTask.on(
        //     (error) => {
        //       toast.error(error, {
        //         position: "top-left",
        //       });
        //     },
        //     () => {
        //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        //         await updateProfile(res.user, {
        //           displayName,
        //           photoURL: downloadURL,
        //         });
        //         await setDoc(doc(db, "users", res.user.uid), {
        //           uid: res.user.uid,
        //           displayName,
        //           email,
        //           photoURL: downloadURL,
        //         });
        //         // writeUserData(res.user.uid,displayName,email,downloadURL);
                
        //         toast.success("Successfully Updated!....", {
        //           position: "top-left",
        //         });
        //         // navigate("/");
        //         setSubmit(false);
        //       });
        //     }
        //   );
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
