import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWatchlist = createAsyncThunk(
    'watchlist/fetchWatchlist',
    async({email}) => {
        const req = await axios.get(`http://localhost:3000/api/user/liked/${email}`);
        const resp =  req.data.movies;
        const movies = resp.map((movie) => {
            return {
                id: movie.id,
                title: movie.title || movie.name,
                overview: movie.overview,
                genre_ids: movie.genre_ids,
                backdrop_path: movie.backdrop_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date || movie.first_air_date
            }
        })
        return movies
    }
)

export const addToWatchlist = createAsyncThunk(
    'watchlist/addToWatchlist',
    async({email, data}) => {
        await axios.post('http://localhost:3000/api/user/add', {
            email,
            data
        })
        return data;
    }
);

export const removeFromWatchlist = createAsyncThunk(
    'watchlist/removeFromWatchlist',
    async({email, data}) => {
        await axios.delete('http://localhost:3000/api/user/remove', {
            data: {email, data}
        })
        return data;
    }
)

export const watchlistSlice = createSlice(
    {
        name: 'watchlist',
        initialState: {
            list: [],
            isLoading: false,
            cannotLoad: false
        },
        reducers: {
            clearWatchlist: (state) => {
                state.list.splice(0, state.list.length)
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchWatchlist.fulfilled, (state, action) => {
                    state.list = action.payload.reverse();
                })
                .addCase(addToWatchlist.fulfilled, (state, action) => {
                    state.list.push(action.payload);
                })
                .addCase(removeFromWatchlist.fulfilled, (state, action) => {
                    state.list.filter((movie) => movie.id !== action.payload.id)
                })
        }
    }
)

export const selectWatchlist = (state) => state.watchlist.list;
export const { clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;