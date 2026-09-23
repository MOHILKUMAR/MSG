import Logo from "./Logo";
import { MOVIE_ROWS } from "../utils/constant";

const FEATURES = [
  "AI movie search in 3 languages",
  "Trailers in one click",
  "Where to watch in India",
  "Dark and light themes",
];

const FooterHeading = ({ children }) => (
  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-fg">
    {children}
  </h3>
);

// showExplore adds jump links to the movie rows (home view only).
const Footer = ({ showExplore = false }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-10 border-t border-line bg-surface/60 backdrop-blur-sm">
      <div className="h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto grid max-w-[96rem] gap-10 px-4 py-12 md:grid-cols-12 md:px-12">
        <div className="space-y-4 md:col-span-5">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Your AI powered movie night. Describe a mood, play the trailer and
            see where it streams, all in one place.
          </p>
          <div className="flex flex-wrap gap-2">
            {["English", "हिन्दी", "Español"].map((language) => (
              <span
                key={language}
                className="rounded-full px-3 py-1 text-xs text-muted ring-1 ring-line"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        {showExplore && (
          <nav className="md:col-span-3" aria-label="Movie rows">
            <FooterHeading>Explore</FooterHeading>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
              {MOVIE_ROWS.map(({ id, title }) => (
                <li key={id}>
                  <a
                    href={"#" + id}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className={showExplore ? "md:col-span-4" : "md:col-span-7"}>
          <FooterHeading>Features</FooterHeading>
          <ul className="space-y-2 text-sm text-muted">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-accent to-accent-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[96rem] flex-col gap-2 px-4 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-12">
          <p>© {year} MSG. Built with React, Firebase and Gemini.</p>
          <p>
            Movie data and images from{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-accent"
            >
              TMDB
            </a>
            . This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
