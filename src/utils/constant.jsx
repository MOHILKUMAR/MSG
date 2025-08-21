
export const LOGO = "https://i.pinimg.com/736x/38/2d/dd/382ddd585b1bf1307455f72bd19588be.jpg";
export const USER_AVATAR = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
export const LOGIN_BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_large.jpg"

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjRkM2EyZTU2NDNmY2ViZTRiYzk3MDYwZTZkZjM4NiIsIm5iZiI6MTc1NDMxMTM0MC4xNTI5OTk5LCJzdWIiOiI2ODkwYWFhY2IzMzBiODVhNDRhNDY5ZjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ca3OFdH_dY5Wy2N39AjfzKjEI_ENzoxBbBUUueSquGY"
  }
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";



export const SUPPORTED_LANGUAGES = [
  {identifier:"en",name:"English"},
  {identifier:"hindi",name:"Hindi"},
  {identifier:"spanish",name:"Spanish"},
]

export const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;