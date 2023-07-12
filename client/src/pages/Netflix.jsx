import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import witcher from '../assets/witcher.jpg';
import witcherLogo from '../assets/witcherLogo.png';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieGenres, fetchTVGenres,  selectMovieGenres,  selectTVGenres } from '../features/genres/genresSlice';
import PopularMovies from '../components/PopularMovies';
import TopRatedTVShows from '../components/TopRatedTVShows';
import TopRatedMovies from '../components/TopRatedMovies';
import NewReleasesMovies from '../components/NewReleasesMovies';
import PopularShows from '../components/PopularShows';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

const Netflix = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    //
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
            navigate('/login');
        } else {
            const uid = currentUser.uid;
        }
    })



    //navbar scroll transition
    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
    
    // const allMovies = useSelector(selectAllMovies);
    // useEffect(() => {
    //     dispatch(fetchMovies())
    // },[dispatch])
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
 

  return (
    <Container>
        <NavBar isScrolled={isScrolled} />
        <div className="hero">
            <img src={witcher} alt="home-image" className="background-image"/>
            <div className="container">
                <div className="logo">
                    <img src={witcherLogo} alt='witcher-logo'/>
                </div>
                <div className="buttons flex">
                    <button className="flex a-center j-center" onClick={() => navigate('/player')}>
                        <FaPlay /> Play
                    </button>
                    <button className="flex a-center j-center">
                        <AiOutlineInfoCircle /> More Info
                    </button>
                </div>
            </div>
        </div>
        <div className="displays">
            <div className="display-item">
                <NewReleasesMovies genres={movieGenres}/>
            </div>
            <div className="display-item">
                <PopularMovies genres={movieGenres}/>
            </div>
            <div className="display-item">
                <PopularShows  genres={tvGenres}/>
            </div>
            <div className="display-item">
                <TopRatedMovies genres={movieGenres}/>
            </div>
            <div className="display-item">
                <TopRatedTVShows genres={tvGenres}/>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
    background-color: #141414;
    .hero {
        position: relative;
        .background-image {
            filter:brightness(60%);
            height: 100vh;
            width: 100vw;
        }
        
        .container {
            position: absolute;
            bottom: 4rem;
            .logo {
                img{
                    width: 70%;
                    height: 70%;
                    margin-left: 5rem;
                }
            }
            .buttons {
                margin: 5rem;
                gap: 2rem;
                button {
                    border-style: solid;
                    border-width: 2px;
                    background-color: white;
                    color: black;
                    font-size: 1.4rem;
                    gap: 1rem;
                    border-radius: 0.2rem;
                    padding: 0.5rem;
                    padding-left: 2rem;
                    padding-right: 2.4rem;
                    cursor: pointer;
                    transition: 0.2s ease-in-out;
                    &:hover {
                        opacity: 0.8;
                    }
                    &:nth-of-type(2) {
                        background-color: rgba(109, 109, 110, 0.7);
                        color: white;
                        svg {
                            font-size: 1.8rem
                        }
                    }
                }
            }
        }
    }
    .hero::before {
        content:'';
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(19, 19, 19, 0.5 );
        z-index: -1;
        inset: 0;
    }
    .hero::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 7.5rem;
        background-image: linear-gradient(
            180deg,
            transparent,
            rgba(37, 37, 37, 0.61),
            #111
        );
    }
    .displays {
        position: absolute;
        margin-top: -8rem;
        display: flex;
        flex-direction: column;
    }
    .display-item:not(:last-child) {
        margin-bottom: -13rem;
    }
`;

export default Netflix