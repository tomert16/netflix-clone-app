import styled from 'styled-components';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMovies, selectPopularMovies } from '../features/movies/moviesSlice';
import MoviesCard from './MoviesCard';
import Pagination from './Pagination';

const PopularMovies = ({ genres }) => {
    const dispatch = useDispatch();

    //fetch popular movies
    const popularMovies = useSelector(selectPopularMovies)
    useEffect(() => {
        dispatch(fetchPopularMovies(popularMovies))
    },[dispatch])
    
    //limit amount of movies to display
    const [amountOfMovies] = useState(6);
    const [currentSlide, setCurrentSlide] = useState(1);
    const indexOfLastMovie = currentSlide * amountOfMovies;
    const indexOfFirstMovie = indexOfLastMovie - amountOfMovies;
    //change current slide
    const paginateNext = () => setCurrentSlide(currentSlide + 1);
    const paginatePrev = () => setCurrentSlide(currentSlide - 1);
    //stop the pagination
    const endOfList = indexOfLastMovie >= popularMovies.length;
    const beginningOfList = currentSlide === 1;

  return (
    <Container>
        <h1>Popular Movies</h1>
        <div className="movies flex">
            {popularMovies.slice(indexOfFirstMovie, indexOfLastMovie).map((movie) => 
                <MoviesCard key={movie.id} movie={movie} genres={genres} isMovies={true}/>)}
        </div>
        <div className='pagination'>
            <Pagination 
                amount={amountOfMovies} 
                total={popularMovies.length} 
                next={paginateNext} 
                previous={paginatePrev} 
                endOfList={endOfList} 
                beginningOfList={beginningOfList}
            />
        </div>
    </Container>
  )
}

const Container = styled.div`
    margin: 3rem;
    h1{
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
    }
    .movies {
        gap: 0.5em;
        h2 {
            color: white;
        }
    }
    .pagination {
        margin-left: 5rem;
        

    }
`;

export default PopularMovies;