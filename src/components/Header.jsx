import { signOut } from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useDispatch, useSelector } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant.jsx";
import { toggleGptSearchView } from "../utils/gptSlice.jsx";
import { changeLanguage } from "../utils/configSlice.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const langKey = useSelector((store) => store.config.lang);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    // AuthLayout reacts to the sign-out and redirects to the login page.
    signOut(auth).catch((error) => console.error(error));
  };

  const handleGptSearchClick = () => {
    //toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-full px-16 py-2 bg-gradient-to-b from-black z-10 flex flex-col  md:flex-row justify-between">  {/** bg-black sm:bg-blue-900 md:bg-green-900 */}
     <img className="w-20 rounded-full mx-auto md:mx-0" alt="logo" src={LOGO} />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              name=""
              id=""
              className="bg-gray-700 text-white"
              value={langKey}
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
