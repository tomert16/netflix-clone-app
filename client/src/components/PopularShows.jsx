import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from './Pagination';
import TvShowCard from './TvShowCard';
import { fetchPopularShows, selectPopularShows } from '../features/tvshows/tvShowsSlice';


const PopularShows = ({ genres }) => {
    const dispatch = useDispatch();
    //retrieve popular shows
    const popularShows = useSelector(selectPopularShows);
    useEffect(() => {
        dispatch(fetchPopularShows());
    },[dispatch])

    //limit amount of movies to display
  const [amountOfShows] = useState(6);
  const [currentSlide, setCurrentSlide] = useState(1);
  const indexOfLastShow = currentSlide * amountOfShows;
  const indexOfFirstShow = indexOfLastShow - amountOfShows;
  //change current slide
  const paginateNext = () => setCurrentSlide(currentSlide + 1);
  const paginatePrev = () => setCurrentSlide(currentSlide - 1);
  //stop the pagination
  const endOfList = indexOfLastShow >= popularShows.length;
  const beginningOfList = currentSlide === 1;


  return (
    <Container>
        <h1>Popular Shows</h1>
        <div className="shows flex">
            {popularShows.slice(indexOfFirstShow, indexOfLastShow).map((show) => (
                <TvShowCard key={show.id} show={show} genres={genres}/>
            ))}
        </div>
        <div className="pagination">
            <Pagination 
                amount={amountOfShows}
                total={popularShows.length}
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
    .shows {
        gap: 0.5rem;
        h2 {
            color: white;
        }
    }
    .pagination {
        margin-left: 5rem;
    }
`;

export default PopularShows;