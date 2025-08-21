import { signOut } from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.jsx";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant.jsx";
import { toggleGptSearchView } from "../utils/gptSlice.jsx";
import lang from "../utils/languageConstant.jsx";
import { changeLanguage } from "../utils/configSlice.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleGptSearchClick = () => {
    //toggle GPT Search
    dispatch(toggleGptSearchView());
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...

        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe is help to unmount the components
    return () => unsubscribe();
  }, []);

  const handleLanguageChange = (e) => {
    //  console.log(e.target.value)

    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-16 py-2 bg-gradient-to-b from-black z-10 flex flex-col  md:flex-row justify-between">  {/** bg-black sm:bg-blue-900 md:bg-green-900 */}     
     <img className="w-20 rounded-full mx-auto md:mx-0" alt="logo" src={LOGO} />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              name=""
              id=""
              className="bg-gray-700 text-whites"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="px-2 font-medium bg-purple-500 rounded-lg mx-4 cursor-pointer"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>

          <img
            className="hidden md:block w-12 h-12 rounded-4xl mt-2  "
            src={user?.photoURL}
            alt="user-icon"
          />
          <p className=" hidden md:block font-bold text-white mt-4 m-2">{user?.displayName}</p>
          <button
            onClick={handleSignOut}
            className="font-medium text-white bg-blue-600 px-2 rounded-lg cursor-pointer"
          >
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
