import React,{ useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchMoviesByGenre } from '../features/movies/moviesSlice';
import { fetchShowsByGenre } from '../features/tvshows/tvShowsSlice';

const GenreSelect = React.memo(({ genres, setIsSelected, setSelectedGenre }) => {
    const dispatch = useDispatch();

    const handleIsSelected = () => {
        setIsSelected(false);
    }

    const handleChangedGenre = (e) => {
        const genreId = e.target.value;
        const selectedGenre = genres.find((genre) => genre.id === parseInt(genreId));
        if (selectedGenre) {
            setSelectedGenre(selectedGenre.name)
    
            dispatch(fetchMoviesByGenre({
                genres, genre: genreId
            })); 
    
            dispatch(fetchShowsByGenre({
                genres, genre: genreId
            }));
    
            handleIsSelected();
        } else {
            setSelectedGenre('')
        }
    }

  return (
        <Select placeholder='Genres' onChange={handleChangedGenre}>
            <option value=''>Genre</option>
            {genres.map((genre) => (
                <option value={genre.id} key={genre.id}>{genre.name}</option>
            ))}
        </Select>
  )
})

const Select = styled.select`
        position: relative;
        left: 11rem;
        top: 1.7rem;
        background-color:  rgba(0, 0, 0, 0.6);
        border: 1px solid white;
        width: min-content;
        font-size: 1.2rem;
`;

export default GenreSelect