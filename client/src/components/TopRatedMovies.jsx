import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopRatedMovies, selectTopRatedMovies } from '../features/movies/moviesSlice';
import Pagination from './Pagination';
import MoviesCard from './MoviesCard';
import { useParams } from 'react-router-dom';


const TopRatedMovies = ({ genres }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const topRatedMovies = useSelector(selectTopRatedMovies);
    // const video = useSelector(selectMovieVideos);

    //fetch topRatedMovies
    useEffect(() => {
        dispatch(fetchTopRatedMovies());
    },[dispatch])

    // pagination
    const [amountOfMovies] = useState(6);
    const [currentSlide, setCurrentSlide] = useState(1);
    const indexOfLastMovie = currentSlide * amountOfMovies;
    const indexOfFirstMovie = indexOfLastMovie - amountOfMovies;
    //change currentSlide
    const paginationNext = () => setCurrentSlide(currentSlide + 1);
    const paginationPrev = () => setCurrentSlide(currentSlide - 1);
    //stop pagination at end of list
    const endOfList = indexOfLastMovie >= topRatedMovies.length;
    const beginningOfList = currentSlide === 1;
    //

  return (
    <Container>
        <h1>Top Rated Movies</h1>
        <div className="movies flex">
            {topRatedMovies.slice(indexOfFirstMovie, indexOfLastMovie).map((movie, index) => (
                 <MoviesCard key={movie.id} movie={movie} genres={genres} isLastCard={index === topRatedMovies.length - 1} isMovies={true}/>
            ))}
        </div>
        <div className="pagination">
            <Pagination 
                amount={amountOfMovies} 
                total={topRatedMovies.length} 
                next={paginationNext} 
                previous={paginationPrev} 
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
        gap: 0.5rem;
        h2 {
            color: white;
        }
    }
    .pagination {
        margin-left: 5rem;
       
    }
`;

export default TopRatedMovies