import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
  name: "gpt",
  initialState: {
      showGptSearch: false,
      movieResults: null,
      movieName : null,

  },
  reducers:{
    toggleGptSearchView: (state)=> {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoiveResult:(state, action) =>{
      const {movieName , movieResults} = action.payload;
      state.movieResults = movieResults;
      state.movieName = movieName;
    }
  }

});


export const {toggleGptSearchView, addGptMoiveResult} = gptSlice.actions;

export default gptSlice.reducer;