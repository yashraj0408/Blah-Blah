
import React, { useState } from "react";
import Add from "../img/dummy-profile-pic.webp";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const displayName = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const file = event.target[3].files[0];


        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // const storageRef = ref(storage, displayName);
            const storageRef = ref(storage, email);

            const uploadTask = uploadBytesResumable(storageRef, file);

            console.log(res);

            uploadTask.on(
                (error) => {
                    // Handle unsuccessful uploads
                    setErr(true);
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
                            photoURL : downloadURL,
                        });
                        
                        await setDoc(doc(db, "userChats", res.user.uid),{})

                        navigate("/");


                       
                    });
                }
            );


        } catch (err) {
            setErr(true);
        }


    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Blah! Blah!</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="add avatar" />
                        <span>Add an avatar</span>

                    </label>
                    <button>Sign Up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
};

export default Register;