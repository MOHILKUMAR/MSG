import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { auth } from "../utils/fireBase.jsx";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.jsx";
import { LOGIN_BG_URL, USER_AVATAR } from "../utils/constant.jsx";


const Login = () => {

  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    //validated the form data
    // console.log(email.current.value);
    // console.log(password.current.value);

    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    // console.log(message);
    setErrorMessage(message);

    if (message) return;

    //Sign In /Sign Up

    if (!isSignInForm) {
      //sign up logic.
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL:USER_AVATAR ,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                        addUser({
                          uid: uid,
                          email: email,
                          displayName: displayName,
                          photoURL: photoURL,
                        }),
                      )
              
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
         // console.log(user);
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      //signIn logic;
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
         // console.log(user);
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
        className="h-screen object-cover md:w-screen"
          alt="backgroundImage"
          src={LOGIN_BG_URL}
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-10/12  md:w-3/12 absolute p-6 md:p-12 bg-black opacity-80 text-white my-36 mx-auto right-0 left-0 rounded-lg "
      >
        <h1 className="text-xl font-bold md:text-3xl my-2 py-4 ">
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}{" "}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full  bg-gray-700 rounded-lg"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="EmailAddress"
          className="p-4 my-3 w-full  bg-gray-700 rounded-lg"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-3  w-full bg-gray-700 rounded-lg"
        />
        <p className="text-red-700 font-bold text-lg p-1"> {errorMessage}</p>
        <button
          className="p-4 my-3  bg-red-700  w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="my-6 cursor-pointer text-blue-600"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now "
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
