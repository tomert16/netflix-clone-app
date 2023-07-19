import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {TMDB_BASE_URL } from "../../utils/constants";

//API KEY
const API_KEY = process.env.REACT_APP_API_KEY

export const fetchMovieGenres = createAsyncThunk(
    'genres/fetchMovieGenres',
    async() => {
        const req = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        return req.data.genres;
    }
)

export const fetchTVGenres = createAsyncThunk(
    'genres/fetchTVGenres',
    async() => {
        const req = await axios.get(`/genre/tv/list?api_key=${API_KEY}`)
        return req.data.genres;
    }
)

export const genresSlice = createSlice(
    {
        name: 'genres',
        initialState: {
            movieGenres: [],
            tvGenres: [],
            isLoadingGenres: false,
            cannotLoadGenres: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchMovieGenres.pending, (state) => {
                    state.isLoadingGenres = true;
                    state.cannotLoadGenres = false;
                })
                .addCase(fetchMovieGenres.fulfilled, (state, action) => {
                    state.isLoadingGenres = false;
                    state.movieGenres = action.payload;
                })
                .addCase(fetchMovieGenres.rejected, (state, action) => {
                    state.isLoadingGenres = false;
                    state.cannotLoadGenres = true;
                })
                .addCase(fetchTVGenres.fulfilled, (state, action) => {
                    state.isLoadingGenres = false;
                    state.tvGenres = action.payload;
                })
        }
    }
);

export const selectMovieGenres = (state) => state.genres.movieGenres;
export const selectTVGenres = (state) => state.genres.tvGenres;
export default genresSlice.reducer;