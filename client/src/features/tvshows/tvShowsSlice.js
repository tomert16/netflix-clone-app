import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../utils/constants";

export const fetchTopRatedTVShows = createAsyncThunk(
    'tvShows/fetchTopRatedTVShows',
    async() => {
        const req = await axios.get(`/tv/top_rated?api_key=${API_KEY}`);
        return req.data.results;
    }
)

export const fetchShowsByGenre = createAsyncThunk(
    'tvShows/fetchShowsByGenre',
    async({ genre }) => {
        const req = await axios.get(`discover/tv?api_key=${API_KEY}&with_genres=${genre}&page=3`);
        return req.data.results;
    }
)

export const fetchTrendingShows = createAsyncThunk(
    'tvShows/fetchTrendingShows',
    async() => {
        const req = await axios.get(`trending/tv/week?api_key=${API_KEY}`);
        return req.data.results;
    }
)

export const fetchPopularShows = createAsyncThunk(
    'tvShows/fetchPopularShows',
    async() => {
        const req = await axios.get(`tv/popular?api_key=${API_KEY}&page=3`);
        return req.data.results;
    }
)

export const tvShowsSlice = createSlice(
    {
        name: 'tvShows',
        initialState: {
            popular: [],
            topRated: [],
            byGenre: [],
            trending: [],
            isLoading: false,
            cannotLoad: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchTopRatedTVShows.pending, (state) => {
                    state.isLoading = true;
                    state.cannotLoad = false;
                })
                .addCase(fetchTopRatedTVShows.fulfilled, (state, action) => {
                    state.topRated = action.payload;
                    state.isLoading = false;
                })
                .addCase(fetchTopRatedTVShows.rejected, (state, action) => {
                    state.isLoading = false;
                    state.cannotLoad = true;
                })
                .addCase(fetchShowsByGenre.fulfilled, (state, action) => {
                    state.byGenre = action.payload;
                    state.isLoading = false;
                })
                .addCase(fetchTrendingShows.fulfilled, (state, action) => {
                    state.trending = action.payload;
                    state.isLoading = false;
                })
                .addCase(fetchPopularShows.fulfilled, (state, action) => {
                    state.popular = action.payload;
                    state.isLoading = false;
                })
        }
    }
);

export const selectTopRatedTVShows = (state) => state.tvShows.topRated;
export const selectShowsByGenre = (state) => state.tvShows.byGenre;
export const selectTrendingShows = (state) => state.tvShows.trending;
export const selectPopularShows = (state) => state.tvShows.popular;
export default tvShowsSlice.reducer;