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
    },
    reducers: {
        addMovieList: (state, action) => {
            const { listName, movies } = action.payload;
            state[listName] = movies;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
    }
})

export const { addMovieList, addTrailerVideo } = moviesSlice.actions;
export default moviesSlice.reducer;
