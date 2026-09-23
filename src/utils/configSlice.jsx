import { createSlice } from "@reduxjs/toolkit";


const configSlice = createSlice({
    name: "config",
    initialState: {
        lang: "en",
        // index.html applies the saved theme to <html> before React loads.
        theme: document.documentElement.dataset.theme === "light" ? "light" : "dark",
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.lang = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const {changeLanguage, toggleTheme} = configSlice.actions;
export default configSlice.reducer;
