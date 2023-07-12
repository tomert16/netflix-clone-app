import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from './Pagination';
import MoviesCard from './MoviesCard';
import { fetchNewReleases, selectNewReleases } from '../features/movies/moviesSlice';

const NewReleasesMovies = ({ genres }) => {
    const dispatch = useDispatch();

    //fetch new releases
    const newReleases = useSelector(selectNewReleases);
    useEffect(() => {
        dispatch(fetchNewReleases());
    },[dispatch]);

    // pagination
    const [amountOfMovies] = useState(6);
    const [currentSlide, setcurrentSlide] = useState(1);
    const indexOfLastMovie = currentSlide * amountOfMovies;
    const indexOfFirstMovie = indexOfLastMovie - amountOfMovies;
    //change currentSlide
    const paginationNext = () => setcurrentSlide(currentSlide + 1);
    const paginationPrev = () => setcurrentSlide(currentSlide - 1);
    //stop pagination at end of list
    const endOfList = indexOfLastMovie >= newReleases.length;
    const beginningOfList = currentSlide === 1;


  return (
    <Container>
        <h1>New Releases</h1>
        <div className="movies flex">
            {newReleases.slice(indexOfFirstMovie, indexOfLastMovie).map((movie) => (
                 <MoviesCard key={movie.id} movie={movie} isMovies={true} genres={genres}/>
            ))}
        </div>
        <div className="pagination">
            <Pagination 
                amount={amountOfMovies} 
                total={newReleases.length} 
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

export default NewReleasesMovies