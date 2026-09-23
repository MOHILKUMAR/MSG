import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useDispatch, useSelector } from "react-redux";
import { SUPPORTED_LANGUAGES } from "../utils/constant.jsx";
import { toggleGptSearchView } from "../utils/gptSlice.jsx";
import { changeLanguage, toggleTheme } from "../utils/configSlice.jsx";
import Logo from "./Logo";
import {
  GlobeIcon,
  HomeIcon,
  LogOutIcon,
  MoonIcon,
  SparkleIcon,
  SunIcon,
} from "./Icons";

const iconButton =
  "grid h-9 w-9 place-items-center rounded-full bg-surface/70 text-fg ring-1 ring-line transition hover:text-accent hover:ring-accent/60 cursor-pointer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const langKey = useSelector((store) => store.config.lang);
  const theme = useSelector((store) => store.config.theme);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the hero, solid glass once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = () => {
    // AuthLayout reacts to the sign-out and redirects to the login page.
    signOut(auth).catch((error) => console.error(error));
  };

  const showView = (gpt) => {
    if (gpt !== showGptSearch) dispatch(toggleGptSearchView());
    window.scrollTo({ top: 0 });
  };

  const tab = (active) =>
    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition cursor-pointer md:px-4 " +
    (active
      ? "bg-linear-to-r from-accent to-accent-2 text-accent-fg shadow-[0_4px_20px_-6px_var(--accent)]"
      : "text-muted hover:text-fg");

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 " +
        (scrolled
          ? "border-b border-line bg-canvas/85 backdrop-blur-md"
          : "bg-linear-to-b from-canvas/90 via-canvas/40 to-transparent")
      }
    >
      <div className="mx-auto flex h-16 max-w-[96rem] items-center justify-between gap-3 px-4 md:h-20 md:px-12">
        <Logo />

        {user && (
          <nav
            className="flex items-center gap-1 rounded-full bg-surface/70 p-1 ring-1 ring-line backdrop-blur"
            aria-label="Views"
          >
            <button
              className={tab(!showGptSearch)}
              aria-pressed={!showGptSearch}
              onClick={() => showView(false)}
            >
              <HomeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              className={tab(showGptSearch)}
              aria-pressed={showGptSearch}
              onClick={() => showView(true)}
            >
              <SparkleIcon className="h-4 w-4" />
              <span className="sm:hidden">AI</span>
              <span className="hidden sm:inline">AI Search</span>
            </button>
          </nav>
        )}

        <div className="flex items-center gap-2 md:gap-3">
          {user && showGptSearch && (
            <label className="hidden items-center gap-1.5 rounded-full bg-surface/70 py-1.5 pl-3 pr-2 text-sm text-fg ring-1 ring-line sm:flex">
              <GlobeIcon className="h-4 w-4 text-muted" />
              <select
                className="cursor-pointer bg-transparent pr-1 outline-none"
                value={langKey}
                onChange={(e) => dispatch(changeLanguage(e.target.value))}
                aria-label="Language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <button
            className={iconButton}
            onClick={() => dispatch(toggleTheme())}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? (
              <MoonIcon className="h-4 w-4" />
            ) : (
              <SunIcon className="h-4 w-4" />
            )}
          </button>

          {user && (
            <>
              <div className="hidden items-center gap-2 lg:flex">
                {user.photoURL ? (
                  <img
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-accent/60"
                    src={user.photoURL}
                    alt=""
                  />
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-accent to-accent-2 font-bold text-accent-fg">
                    {(user.displayName || user.email || "?")[0].toUpperCase()}
                  </span>
                )}
                <span className="max-w-32 truncate text-sm font-semibold text-fg">
                  {user.displayName}
                </span>
              </div>
              <button
                className={iconButton + " md:flex md:w-auto md:items-center md:gap-2 md:px-4"}
                onClick={handleSignOut}
                aria-label="Sign out"
              >
                <LogOutIcon className="h-4 w-4" />
                <span className="hidden text-sm font-semibold md:inline">
                  Sign out
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Language picker for small screens (AI Search view) */}
      {user && showGptSearch && (
        <div className="flex justify-center pb-2 sm:hidden">
          <select
            className="cursor-pointer rounded-full bg-surface/80 px-3 py-1 text-sm text-fg ring-1 ring-line"
            value={langKey}
            onChange={(e) => dispatch(changeLanguage(e.target.value))}
            aria-label="Language"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </header>
  );
};

export default Header;
