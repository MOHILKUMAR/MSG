import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMovieDetails from "../hooks/useMovieDetails";
import { closeMovieModal, showMovieModal } from "../utils/moviesSlice";
import { IMG_BACKDROP_URL, IMG_LOGO_URL, WATCH_REGION } from "../utils/constant";
import { CloseIcon, PlayIcon } from "./Icons";

// TMDB groups where-to-watch options by how you pay.
const PROVIDER_GROUPS = [
  { key: "flatrate", label: "Stream" },
  { key: "free", label: "Free" },
  { key: "ads", label: "Free with ads" },
  { key: "rent", label: "Rent" },
  { key: "buy", label: "Buy" },
];

const findTrailer = (details) => {
  const videos = (details?.videos?.results ?? []).filter(
    (video) => video.site === "YouTube"
  );
  return videos.find((video) => video.type === "Trailer") ?? videos[0];
};

const formatRuntime = (minutes) =>
  minutes ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : null;

export const TrailerPlayer = ({ videoKey }) =>
  videoKey ? (
    <iframe
      className="aspect-video w-full rounded-2xl shadow-2xl ring-1 ring-line"
      src={"https://www.youtube.com/embed/" + videoKey + "?autoplay=1&rel=0"}
      title="Movie trailer"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    <p className="rounded-2xl bg-surface p-8 text-center text-lg text-fg ring-1 ring-line">
      No trailer available for this movie.
    </p>
  );

const WhereToWatch = ({ providers }) => {
  const groups = PROVIDER_GROUPS.filter(({ key }) => providers?.[key]?.length);

  return (
    <div className="border-t border-line pt-5">
      <h3 className="mb-3 font-display text-2xl tracking-wide text-fg">
        Where to watch in {WATCH_REGION.name}
      </h3>
      {groups.length === 0 ? (
        <p className="text-muted">
          Not available to stream, rent or buy in {WATCH_REGION.name} right now.
        </p>
      ) : (
        groups.map(({ key, label }) => (
          <div key={key} className="mb-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {label}
            </p>
            <div className="flex flex-wrap gap-2">
              {providers[key].map((provider) => (
                <a
                  key={provider.provider_id}
                  href={providers.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-surface-2 py-1 pl-1 pr-3 ring-1 ring-line transition hover:ring-accent/70"
                >
                  <img
                    className="h-9 w-9 rounded-lg"
                    src={IMG_LOGO_URL + provider.logo_path}
                    alt=""
                  />
                  <span className="text-sm text-fg">{provider.provider_name}</span>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
      {/* TMDB requires crediting JustWatch when showing this data */}
      <p className="mt-2 text-xs text-muted">
        Streaming data provided by{" "}
        <a
          className="underline decoration-line underline-offset-2 hover:text-accent"
          href="https://www.justwatch.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          JustWatch
        </a>
        .
      </p>
    </div>
  );
};

export const MovieDetails = ({ details, onPlay }) => {
  const trailer = findTrailer(details);
  const providers = details["watch/providers"]?.results?.[WATCH_REGION.code];
  const facts = [
    details.release_date?.slice(0, 4),
    formatRuntime(details.runtime),
    details.vote_average ? "★ " + details.vote_average.toFixed(1) : null,
  ].filter(Boolean);
  const cast = details.credits?.cast
    ?.slice(0, 6)
    .map((person) => person.name)
    .join(", ");

  return (
    <div className="max-h-[85vh] overflow-y-auto rounded-2xl bg-surface text-fg shadow-2xl ring-1 ring-line">
      {details.backdrop_path && (
        <div className="relative">
          <img
            className="aspect-video w-full object-cover"
            src={IMG_BACKDROP_URL + details.backdrop_path}
            alt=""
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent" />
        </div>
      )}
      <div
        className={
          "relative space-y-5 p-6 md:p-8 " + (details.backdrop_path ? "-mt-24" : "")
        }
      >
        <div>
          <h2 className="font-display text-4xl leading-none tracking-wide md:text-5xl">
            {details.title}
          </h2>
          {details.tagline && (
            <p className="mt-2 italic text-muted">{details.tagline}</p>
          )}
          <p className="mt-2 text-sm font-medium text-fg/80">{facts.join(" · ")}</p>
        </div>

        {trailer && (
          <button
            onClick={onPlay}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-2.5 font-bold text-accent-fg shadow-[0_10px_30px_-10px_var(--accent)] transition hover:brightness-110"
          >
            <PlayIcon className="h-5 w-5" /> Play Trailer
          </button>
        )}

        {details.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {details.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full px-3 py-1 text-xs font-medium text-fg/90 ring-1 ring-line"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <p className="leading-relaxed text-fg/85">{details.overview}</p>

        {cast && (
          <p className="text-sm text-fg/85">
            <span className="text-muted">Cast: </span>
            {cast}
          </p>
        )}

        <WhereToWatch providers={providers} />
      </div>
    </div>
  );
};

// Popup for the movie picked from the hero buttons or a poster.
// Rendered once in Browse; opened with showMovieModal({ movieId, mode }).
const MovieModal = () => {
  const dispatch = useDispatch();
  const movieModal = useSelector((store) => store.movies.movieModal);
  const { details, error } = useMovieDetails(movieModal?.movieId);

  useEffect(() => {
    if (!movieModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") dispatch(closeMovieModal());
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // stop the page scrolling behind it
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [movieModal, dispatch]);

  if (!movieModal) return null;

  const isTrailer = movieModal.mode === "trailer";
  const close = () => dispatch(closeMovieModal());
  const playTrailer = () =>
    dispatch(showMovieModal({ movieId: movieModal.movieId, mode: "trailer" }));

  let content;
  if (error) {
    content = (
      <p className="rounded-2xl bg-surface p-8 text-center text-fg ring-1 ring-line">
        Couldn't load this movie. Please try again.
      </p>
    );
  } else if (!details) {
    content = <div className="skeleton aspect-video w-full rounded-2xl" />;
  } else if (isTrailer) {
    content = <TrailerPlayer videoKey={findTrailer(details)?.key} />;
  } else {
    content = <MovieDetails details={details} onPlay={playTrailer} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={"animate-fade-up w-full " + (isTrailer ? "max-w-5xl" : "max-w-3xl")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex justify-end">
          <button
            onClick={close}
            aria-label="Close"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-surface/90 text-fg ring-1 ring-line transition hover:text-accent hover:ring-accent/60"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

export default MovieModal;
