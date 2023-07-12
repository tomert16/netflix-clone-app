import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../features/genres/genresSlice";
import moviesReducer from "../features/movies/moviesSlice";
import tvShowsReducer from "../features/tvshows/tvShowsSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";

export const store = configureStore({
    reducer: {
        genres: genresReducer,
        movies: moviesReducer,
        tvShows: tvShowsReducer,
        watchlist: watchlistReducer
    }
});