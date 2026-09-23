import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showGptSearch: false,
  movieResults: null,
  movieName: null,
};

const gptSlice = createSlice({
  name: "gpt",
  initialState,
  reducers:{
    toggleGptSearchView: (state)=> {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoiveResult:(state, action) =>{
      const {movieName , movieResults} = action.payload;
      state.movieResults = movieResults;
      state.movieName = movieName;
    },
    // Called on sign-out so the next user doesn't see the previous user's search.
    clearGptState: () => initialState,
  }

});


export const {toggleGptSearchView, addGptMoiveResult, clearGptState} = gptSlice.actions;

export default gptSlice.reducer;
