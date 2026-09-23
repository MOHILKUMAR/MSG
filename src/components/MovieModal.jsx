import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMovieDetails from "../hooks/useMovieDetails";
import { closeMovieModal, showMovieModal } from "../utils/moviesSlice";
import { IMG_BACKDROP_URL, IMG_LOGO_URL, WATCH_REGION } from "../utils/constant";

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
      className="w-full aspect-video rounded-lg"
      src={"https://www.youtube.com/embed/" + videoKey + "?autoplay=1&rel=0"}
      title="Movie trailer"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    <p className="text-white text-center text-lg">
      No trailer available for this movie.
    </p>
  );

const WhereToWatch = ({ providers }) => {
  const groups = PROVIDER_GROUPS.filter(({ key }) => providers?.[key]?.length);

  return (
    <div className="border-t border-gray-700 pt-4">
      <h3 className="text-lg font-bold mb-2">
        Where to watch in {WATCH_REGION.name}
      </h3>
      {groups.length === 0 ? (
        <p className="text-gray-400">
          Not available to stream, rent or buy in {WATCH_REGION.name} right now.
        </p>
      ) : (
        groups.map(({ key, label }) => (
          <div key={key} className="mb-3">
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            <div className="flex flex-wrap gap-2">
              {providers[key].map((provider) => (
                <a
                  key={provider.provider_id}
                  href={providers.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg pr-3"
                >
                  <img
                    className="w-10 h-10 rounded-lg"
                    src={IMG_LOGO_URL + provider.logo_path}
                    alt=""
                  />
                  <span className="text-sm">{provider.provider_name}</span>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
      {/* TMDB requires crediting JustWatch when showing this data */}
      <p className="text-xs text-gray-500 mt-2">
        Streaming data provided by{" "}
        <a
          className="underline"
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
    <div className="max-h-[85vh] overflow-y-auto bg-neutral-900 text-white rounded-lg">
      {details.backdrop_path && (
        <img
          className="w-full aspect-video object-cover"
          src={IMG_BACKDROP_URL + details.backdrop_path}
          alt={details.title}
        />
      )}
      <div className="p-6 space-y-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{details.title}</h2>
          {details.tagline && (
            <p className="italic text-gray-400">{details.tagline}</p>
          )}
          <p className="text-sm text-gray-300 mt-1">{facts.join(" · ")}</p>
        </div>

        {trailer && (
          <button
            onClick={onPlay}
            className="bg-white text-black font-bold py-2 px-6 rounded-lg cursor-pointer hover:bg-gray-300"
          >
            ▶ Play Trailer
          </button>
        )}

        {details.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {details.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-xs border border-gray-600 rounded-full px-3 py-1"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-200">{details.overview}</p>

        {cast && (
          <p className="text-sm text-gray-300">
            <span className="text-gray-500">Cast: </span>
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
      <p className="text-white text-center">
        Couldn't load this movie. Please try again.
      </p>
    );
  } else if (!details) {
    content = <p className="text-white text-center">Loading...</p>;
  } else if (isTrailer) {
    content = <TrailerPlayer videoKey={findTrailer(details)?.key} />;
  } else {
    content = <MovieDetails details={details} onPlay={playTrailer} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={"w-full " + (isTrailer ? "max-w-5xl" : "max-w-3xl")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={close}
            className="text-white font-bold bg-neutral-800 hover:bg-neutral-700 rounded-lg px-3 py-1 cursor-pointer"
          >
            ✕ Close
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

export default MovieModal;
