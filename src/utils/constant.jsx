
export const USER_AVATAR = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=96&h=96&fit=crop"
export const LOGIN_BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_large.jpg"

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";
export const IMG_BACKDROP_URL = "https://image.tmdb.org/t/p/w780";
export const IMG_LOGO_URL = "https://image.tmdb.org/t/p/w92";

// Country used for "Where to watch" (TMDB / JustWatch region code).
export const WATCH_REGION = { code: "IN", name: "India" };

// Store key -> TMDB endpoint for each movie row on the Browse page.
export const MOVIE_LISTS = {
  nowPlayingMovies: "/movie/now_playing?language=en-US&page=1",
  popularMovies: "/movie/popular?language=en-US&page=1",
  topRatedMovies: "/movie/top_rated?language=en-US&page=1",
  horrorMovies: "/discover/movie?with_genres=27&sort_by=popularity.desc&language=en-US&page=1",
  indianMovies: "/discover/movie?with_origin_country=IN&sort_by=popularity.desc&language=en-US&page=1",
  hollywoodMovies: "/discover/movie?with_origin_country=US&sort_by=popularity.desc&language=en-US&page=1",
};

// Rows on the Browse page, in order (id = key in the movies store and page anchor).
export const MOVIE_ROWS = [
  { id: "nowPlayingMovies", title: "Now Playing" },
  { id: "popularMovies", title: "Popular" },
  { id: "topRatedMovies", title: "Best Movies" },
  { id: "horrorMovies", title: "Horror" },
  { id: "indianMovies", title: "Indian" },
  { id: "hollywoodMovies", title: "Hollywood" },
];

export const SUPPORTED_LANGUAGES = [
  {identifier:"en",name:"English"},
  {identifier:"hindi",name:"Hindi"},
  {identifier:"spanish",name:"Spanish"},
]

// TMDB and Gemini calls go through our Vercel functions (api/*), which hold
// the keys. Leave VITE_API_BASE_URL unset when the site itself runs on Vercel.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
