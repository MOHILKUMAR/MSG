import { createSlice } from "@reduxjs/toolkit";


const moviesSlice = createSlice({
    name: "movies",
    initialState:{
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        horrorMovies: null,
        indianMovies: null,
        hollywoodMovies: null,
        trailerVideo: null,
        movieModal: null, // { movieId, mode: "info" | "trailer" }
    },
    reducers: {
        addMovieList: (state, action) => {
            const { listName, movies } = action.payload;
            state[listName] = movies;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        showMovieModal: (state, action) => {
            state.movieModal = action.payload;
        },
        closeMovieModal: (state) => {
            state.movieModal = null;
        },
    }
})

export const { addMovieList, addTrailerVideo, showMovieModal, closeMovieModal } = moviesSlice.actions;
export default moviesSlice.reducer;
