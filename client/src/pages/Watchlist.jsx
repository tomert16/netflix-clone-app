import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MoviesCard from '../components/MoviesCard';
import NavBar from '../components/NavBar';
import { fetchMovieGenres, fetchTVGenres, selectMovieGenres, selectTVGenres } from '../features/genres/genresSlice';
import { fetchWatchlist, selectWatchlist } from '../features/watchlist/watchlistSlice';
import { firebaseAuth } from '../utils/firebase-config';

const Watchlist = () => {
  const dispatch = useDispatch();
//navbar scroll transition
const [isScrolled, setIsScrolled] = useState(false);
//on scroll functionality 
window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
}

//fetch liked movies 
const movies = useSelector(selectWatchlist);
useEffect(() => {
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      const email = currentUser.email
      dispatch(fetchWatchlist({email}));
    } else {
      console.log('User not logged in')
    }
  })
},[dispatch])
    // retreive tv genres from API
    const tvGenres = useSelector(selectTVGenres)
    useEffect(() => {
        dispatch(fetchTVGenres())
    },[dispatch])
    // retrieve movie genres data from API
    const movieGenres = useSelector(selectMovieGenres);
    useEffect(() => {
        dispatch(fetchMovieGenres())
    },[dispatch]);
    //combine both genres into one array
    const genres = [...tvGenres, ...movieGenres]

 //refresh component after deleting a movie and re-fetch data
 const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (refresh) {
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          const email = currentUser.email
          dispatch(fetchWatchlist({email}));
        } else {
          console.log('User not logged in')
        }
      })
      setRefresh(false);
    }
  }, [dispatch, refresh])

  return (
    <Container>
      <NavBar isScrolled={isScrolled}/>
      <nav id="list-header" className={`${isScrolled ? 'on-scroll' : 'not-scroll'}`}>
        <div className="header flex a-center">
          <div className="flex a-center j-center">
            <h1 className="title">
              My List
            </h1>
          </div>
        </div>
      </nav>
      <div className="watchlist flex j-center">
          {movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} isLiked={true} setRefresh={setRefresh} genres={genres}/>
          ))}
      </div>
    </Container>
  )
}


const Container = styled.div`
    color: white;
    .on-scroll {
      background-color: #141414;
    }
    #list-header {
      position: sticky;
      top: 5rem;
      height: 5rem;
      width: 100%;
      z-index: 2;
      position: fixed;
      padding: 0 4rem;
      align-items: center;
      transition: 0.3s ease-in-out;
      .header {
        .title {
          position: absolute;
          top: 2.5rem;
          left: 9rem;
          transform: translate(-50%,-50%);
          z-index: 1;
          font-size: 2.3rem;
          font-weight: bold;
        }
      }
    }
    .watchlist {
      margin-top: 15rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minMax(1rem, 13rem));
      grid-gap: 0.5rem;
    }
`;

export default Watchlist