import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import { firebaseAuth } from "../../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import GenreSelect from "../../components/GenreSelect";
import TvShowCard from "../../components/TvShowCard";
import { fetchTVGenres, selectTVGenres } from "../../features/genres/genresSlice";
import { selectShowsByGenre } from "../../features/tvshows/tvShowsSlice";
import newgirl from '../../assets/newgirl.jpg'
import nglogo from '../../assets/nglogo.png'
import { FaPlay } from "react-icons/fa";
import { CgChevronDownO } from 'react-icons/cg';
import { AiOutlineInfoCircle } from "react-icons/ai";
import TopRatedTVShows from "../../components/TopRatedTVShows";
import TrendingShows from "../../components/TrendingShows";
import PopularShows from "../../components/PopularShows";

const TvShows = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState(true); 
    const [selectedGenre, setSelectedGenre] = useState('');

    //retrieve tv genres
    const tvGenres = useSelector(selectTVGenres);
    useEffect(() => {
        dispatch(fetchTVGenres());
    },[dispatch])
    //retrieve tv shows by genre
    const showsByGenre = useSelector(selectShowsByGenre);
  

    //navbar scroll transition
    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    //check if user is logged in
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
            navigate('/login');
        }
    });
    //load more shows
    const [visible, setVisible] = useState(12);
    const showMoreShows = () => {
        setVisible((prevShows) => prevShows + 6)
    }

  return (
    <Container>
        <NavBar isScrolled={isScrolled} />
        <nav id="movie-header" className={`${isScrolled ? 'on-scroll' : 'not-scroll'}`}>
            <div className="header flex a-center">
                <div className="flex flex a-center j-center">
                    <h1 className="title" onClick={() => window.location.reload()}>TV Shows</h1>
                </div>
                <div className="select flex">
                    <GenreSelect genres={tvGenres} setIsSelected={setIsSelected} setSelectedGenre={setSelectedGenre} setVisible={setVisible}/>
                </div>
            </div>
        </nav>
        <div className="hero">
            <img src={newgirl} alt="show" className="background-image" />
            <div className="container">
                <div className="logo">
                    <img src={nglogo} alt="show-logo" />
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
        {isSelected ? 
            <div className="displays">
                <div className="display-item">
                    <TopRatedTVShows genres={tvGenres}/>
                </div>
                <div className="display-item">
                    <TrendingShows genres={tvGenres}/>
                </div>
                <div className="display-item">
                    <PopularShows genres={tvGenres}/>
                </div>
            </div>
            :
            <div className="tv-genre-container">
                    <h1 className="selected-genre-header">{`${selectedGenre} Shows`}</h1>
                    <div className="genre-tv j-center">
                        {showsByGenre.slice(0, visible).map((show) => (
                            <TvShowCard key={show.id} show={show} genres={tvGenres} />
                        ))}
                    </div>
                    <button className="show-more" onClick={showMoreShows}>
                        <CgChevronDownO />
                    </button>
                </div>
        }
    </Container>
  )
}

const Container = styled.div`
     background-color: #141414;
    .not-scroll {
        /* background-image: linear-gradient(180deg,rgba(0,0,0,.7) 15%,transparent); */
    }
    .on-scroll {
        background-color: #141414;
    }
    #movie-header {
        position: sticky;
        top: 5rem;
        height: 5rem;
        width: 100%;
        justify-content: space-between;
        position: fixed;
        /* top: 0; */
        z-index: 2;
        padding: 0 4rem;
        align-items: center;
        transition: 0.3s ease-in-out;
        .header {
            /* position: relative; */
            gap: 3rem;
            .title {
                position: absolute;
                top: 2.5rem;
                left: 10rem;
                transform: translate(-50%, -50%);
                z-index: 1;
                font-size: 2.3rem;
                font-weight: bold;
                cursor: pointer;
            }
        }
  }
  .hero {
      position: relative;
      .background-image {
        filter: brightness(60%);
        height: 100vh;
        width: 100vw
      }
      .container {
          position: absolute;
          bottom: 1.5rem;
          .logo {
              img {
                  width: 45%;
                  height: 45%;
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
                        font-size: 1.8rem;
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
  .tv-genre-container {
        .selected-genre-header{
            position: relative;
            top: 3rem;
            left: 2rem;
            font-size: 1.7rem;
            font-weight: bold;
        }
        .genre-tv {
            position: relative;
            margin-top: 5rem;
            gap: 1rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minMax(1rem, 13rem));
            grid-gap: 0.5rem;
        }
        .show-more {
            position: relative;
            left: 43.7rem;
            margin-top: 1.5rem;
            svg{
                font-size: 2.5rem;
            }
        }
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

export default TvShows;
