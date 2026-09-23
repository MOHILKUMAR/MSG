import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
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
import { PlayIcon, SparkleIcon, GlobeIcon } from "./Icons";

// Firebase error codes -> messages people can act on.
const AUTH_ERRORS = {
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/wrong-password": "Email or password is incorrect.",
  "auth/user-not-found": "Email or password is incorrect.",
  "auth/email-already-in-use": "An account with this email already exists. Try signing in.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed": "Network problem. Check your connection and try again.",
};
const friendlyAuthError = (error) =>
  AUTH_ERRORS[error.code] ?? "Something went wrong. Please try again.";

const HIGHLIGHTS = [
  { icon: <SparkleIcon className="h-4 w-4" />, text: "Ask AI for movies by mood, genre or moment" },
  { icon: <PlayIcon className="h-4 w-4" />, text: "Watch any trailer in one click" },
  { icon: <GlobeIcon className="h-4 w-4" />, text: "See where it streams in India" },
];

const inputClass =
  "w-full rounded-xl bg-surface-2 px-4 py-3 text-fg ring-1 ring-line placeholder:text-muted/70 outline-none transition focus:ring-2 focus:ring-accent";

const Login = () => {

  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };
  const handleButtonClick = () => {
    // Read the inputs up front: once Firebase signs the user in, AuthLayout
    // redirects away and this page's refs are gone before the promises resolve.
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value;

    //validated the form data
    const message = checkValidateData(emailValue, passwordValue);
    setErrorMessage(message);

    if (message) return;

    //Sign In /Sign Up

    if (!isSignInForm) {
      //sign up logic.
      const fullName = name.current.value.trim();
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: fullName,
            photoURL:USER_AVATAR ,
          })
            .then(() => {
              // Profile updated!
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
            .catch((error) => setErrorMessage(friendlyAuthError(error)));
        })
        .catch((error) => setErrorMessage(friendlyAuthError(error)));
    } else {
      //signIn logic;
      // Signed in -> AuthLayout picks it up and redirects to /browse.
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .catch((error) => setErrorMessage(friendlyAuthError(error)));
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-canvas text-fg">
      <Header />

      {/* Background: dimmed poster wall + ember glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          className="h-full w-full object-cover opacity-35 saturate-50"
          alt=""
          src={LOGIN_BG_URL}
        />
        <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/85 to-canvas/40" />
        <div className="absolute inset-0 bg-linear-to-r from-canvas via-canvas/60 to-transparent" />
        <div className="glow-bg absolute inset-0" />
      </div>

      <main className="relative z-10 flex flex-1 items-center px-4 pb-12 pt-28 md:px-12">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
          <section className="animate-fade-up hidden md:block">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-surface/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent ring-1 ring-line">
              <SparkleIcon className="h-3.5 w-3.5" /> AI movie night
            </p>
            <h1 className="font-display text-6xl leading-[0.95] tracking-wide lg:text-7xl">
              Your next favorite movie is{" "}
              <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                one question away.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Ask in English, Hindi or Spanish, play the trailer, then see
              exactly where to stream it.
            </p>
            <ul className="mt-8 space-y-3">
              {HIGHLIGHTS.map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-fg/90">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-accent ring-1 ring-line">
                    {icon}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </section>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="animate-fade-up mx-auto w-full max-w-md rounded-3xl bg-surface/80 p-6 shadow-2xl shadow-black/40 ring-1 ring-line backdrop-blur-xl md:p-10"
          >
            <h2 className="font-display text-4xl tracking-wide">
              {isSignInForm ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mb-6 mt-1 text-sm text-muted">
              {isSignInForm
                ? "Sign in to pick up where you left off."
                : "It takes less than a minute."}
            </p>

            <div className="space-y-4">
              {!isSignInForm && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-fg/90">Full name</span>
                  <input
                    ref={name}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass}
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-fg/90">Email address</span>
                <input
                  ref={email}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-fg/90">Password</span>
                <input
                  ref={password}
                  type="password"
                  autoComplete={isSignInForm ? "current-password" : "new-password"}
                  placeholder="••••••••"
                  className={inputClass}
                />
                {!isSignInForm && (
                  <span className="mt-1.5 block text-xs text-muted">
                    8+ characters with upper and lower case letters and a number.
                  </span>
                )}
              </label>
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger ring-1 ring-danger/30"
              >
                {errorMessage}
              </p>
            )}

            <button
              className="mt-6 w-full cursor-pointer rounded-xl bg-linear-to-r from-accent to-accent-2 py-3.5 font-bold text-accent-fg shadow-[0_10px_30px_-10px_var(--accent)] transition hover:brightness-110 active:scale-[0.99]"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Create Account"}
            </button>

            <p className="mt-6 text-center text-sm text-muted">
              {isSignInForm ? "New to MSG? " : "Already have an account? "}
              <button
                type="button"
                className="cursor-pointer font-semibold text-accent underline-offset-4 hover:underline"
                onClick={toggleSignInForm}
              >
                {isSignInForm ? "Create an account" : "Sign in"}
              </button>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
