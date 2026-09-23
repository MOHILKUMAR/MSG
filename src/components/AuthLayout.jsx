import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { auth } from "../utils/fireBase";
import { addUser, removeUser } from "../utils/userSlice";
import { clearGptState } from "../utils/gptSlice";
import { closeMovieModal } from "../utils/moviesSlice";

// Wraps every route: keeps the store in sync with Firebase auth (one listener
// for the whole app) and redirects between "/" and "/browse" without adding
// extra history entries.
const AuthLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { pathname } = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const theme = useSelector((store) => store.config.theme);

  // Keep <html data-theme>, the browser UI color and the saved choice in sync.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f7f2eb" : "#0b0908");
    try {
      localStorage.setItem("msg-theme", theme);
    } catch {
      // storage blocked (private mode): the theme still applies for this visit
    }
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        // User is signed out
        dispatch(removeUser());
        dispatch(clearGptState());
        dispatch(closeMovieModal());
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Render nothing until Firebase restores the session, so protected pages
  // never flash (or fetch) for signed-out users.
  if (!authChecked) return null;
  if (!user && pathname !== "/") return <Navigate to="/" replace />;
  if (user && pathname === "/") return <Navigate to="/browse" replace />;

  return <Outlet />;
};

export default AuthLayout;
