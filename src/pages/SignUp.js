import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const[submit,setSubmit] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
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
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error, {
            position: "top-left",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            toast.success("Successfully Sign Up!....", {
              position: "top-left",
            });
            navigate("/");
            setSubmit(false);
          });
        }
      );
    } catch (err) {
      toast.error(err, {
        position: "top-left",
      });
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">My Chat</span>
        <span className="title">Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name..." />
          <input type="email" placeholder="Email..." />
          <input
            type="password"
            placeholder="Password...{use at least 6 letter}"
          />
          <input type="password" placeholder="Confirm Password..." />
          <input type="file" id="file" />
          <label htmlFor="file">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6631/6631821.png"
              alt="img-logo"
            />
            <span>Add an avatar</span>
          </label>
          <button disabled={submit}>
           { submit?"Signingup":"Signup" }
          </button>
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
