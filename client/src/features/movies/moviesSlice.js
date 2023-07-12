import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../utils/constants";

export const fetchPopularMovies = createAsyncThunk(
    'movies/fetchPopularMovies',
    async() => {
        const req = await axios.get(`/movie/popular?api_key=${API_KEY}&append_to_response=videos&page=3`)
        return req.data.results;
    }
)

export const fetchTopRatedMovies = createAsyncThunk(
    'movies/fetchTopRatedMovies',
    async() => {
        const req = await axios.get(`/movie/top_rated?api_key=${API_KEY}`)
        return req.data.results;
    }
)

export const fetchNewReleases = createAsyncThunk(
    'movies/fetchNewReleases',
    async() => {
        const req = await axios.get(`/movie/now_playing?api_key=${API_KEY}`);
        return req.data.results;
    }
)

export const fetchMoviesByGenre = createAsyncThunk(
    'movies/fetchMoviesByGenre',
    async({ genre }) => {
        const req = await axios.get(`discover/movie?api_key=${API_KEY}&with_genres=${genre}`);
        return req.data.results;
    }
)


export const moviesSlice = createSlice(
    {
        name: 'movies',
        initialState: {
            popular: [],
            topRated: [],
            newReleases: [],
            byGenre: [],
            isLoadingMovies: false,
            cannotLoadMovies: false
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                    state.popular = action.payload
                })
                .addCase(fetchTopRatedMovies.pending, (state) => {
                    state.isLoadingMovies = true;
                    state.cannotLoadMovies = false;
                })
                .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                    state.isLoadingMovies = false;
                    state.topRated = action.payload;
                })
                .addCase(fetchTopRatedMovies.rejected, (state) => {
                    state.isLoadingMovies = false;
                    state.cannotLoadMovies = true;
                })
                .addCase(fetchNewReleases.fulfilled, (state, action) => {
                    state.isLoadingMovies = false;
                    state.newReleases = action.payload;
                })
                .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
                    state.isLoadingMovies = false;
                    state.byGenre = action.payload;
                })
        }
    }
);

export const selectPopularMovies = (state) => state.movies.popular;
export const selectTopRatedMovies = (state) => state.movies.topRated;
export const selectNewReleases = (state) => state.movies.newReleases;
export const selectMoviesByGenre = (state) => state.movies.byGenre;
export default moviesSlice.reducer;