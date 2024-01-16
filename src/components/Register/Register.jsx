import { LuImagePlus } from "react-icons/lu";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "./register.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log(error);
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
            navigate("/");
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Lama Chat</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit} className="form">
            <input type="text" placeholder="name" />
            <input type="text" placeholder="email" />
            <input type="text" placeholder="password" />
            <input type="file" id="inputFile" />
            <label className="inputLabel" htmlFor="inputFile">
              <LuImagePlus className="inputIcon" />
              <span className="inputTitle">Add an avatar</span>
            </label>
            <button className="SignupBtn">Sign Up</button>
          </form>
          <span className="bottomText">
            Already have an account? <a href="#">Login</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
