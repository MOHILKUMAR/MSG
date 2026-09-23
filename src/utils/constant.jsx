
export const LOGO = "https://i.pinimg.com/736x/38/2d/dd/382ddd585b1bf1307455f72bd19588be.jpg";
export const USER_AVATAR = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=96&h=96&fit=crop"
export const LOGIN_BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_large.jpg"

// TMDB read-only token comes from .env (never hardcode it here).
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer " + import.meta.env.VITE_APP_TMDB_KEY,
  }
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

// Store key -> TMDB endpoint for each movie row on the Browse page.
export const MOVIE_LISTS = {
  nowPlayingMovies: "/movie/now_playing?language=en-US&page=1",
  popularMovies: "/movie/popular?language=en-US&page=1",
  topRatedMovies: "/movie/top_rated?language=en-US&page=1",
  horrorMovies: "/discover/movie?with_genres=27&sort_by=popularity.desc&language=en-US&page=1",
  indianMovies: "/discover/movie?with_origin_country=IN&sort_by=popularity.desc&language=en-US&page=1",
  hollywoodMovies: "/discover/movie?with_origin_country=US&sort_by=popularity.desc&language=en-US&page=1",
};

export const SUPPORTED_LANGUAGES = [
  {identifier:"en",name:"English"},
  {identifier:"hindi",name:"Hindi"},
  {identifier:"spanish",name:"Spanish"},
]

// Gemini runs server-side (api/gpt.js); the browser never sees the key.
export const GPT_API_URL = import.meta.env.VITE_GPT_API_URL || "/api/gpt";
