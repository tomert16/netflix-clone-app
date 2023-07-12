import styled from 'styled-components';
import React,{ useState } from 'react';
import ShowInfo from '../pages/shows/ShowInfo';
//for the clip add any clip to the assets foolder under the alias clip.mov
///uncomment the import below
import clip from "../assets/clip.mov";
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { CgChevronDownO } from 'react-icons/cg';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch } from 'react-redux';
import { addToWatchlist } from '../features/watchlist/watchlistSlice';

const TvShowCard = React.memo(({ show, genres }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //display selected show information
    const [display, setDisplay] = useState(false);
    const handleDisplay = () => {
        setDisplay(true);
    }

    //hover state to display show information
    const [isHovered, setIsHovered] = useState(false);
    
    // map out show genres
    const genresId = show.genre_ids.map((genre) => genre);
    const showGenreList = genres.map((genre) => genre).filter((genre) => genresId.includes(genre.id));
    const genreNames = showGenreList.map((genre) => genre.name);

    //rating percentage
    const rating = Math.ceil(show.vote_average * 10);

    //hover over movie functions
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    //add show to watchlist
    const handleAddToWatchlist = () => {
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          const email = currentUser.email;
          dispatch(addToWatchlist({ email, data: show}))
        } else {
          navigate('/login');
        }
      })
    }
  

  return (
        <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {display ? <ShowInfo show={show} genres={genres} setDisplay={setDisplay}/> : null}
            <div className="show-card" >
                <img src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`} alt={show.name} />
            </div>
            {isHovered && 
                <div className="hover">
                    <div className="image-video-container">
                        <img src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`} alt={show.name} />
                        <video 
                            src={clip}
                            autoPlay
                            loop
                            controls
                            muted
                        />
                    </div>
                <div className="info-container flex column">
                  <div className="show-header flex">
                    {rating <= 59 ? <h3 className="rating text-red-500">{`${rating}%`}</h3>
                    :
                    <h3 className="rating text-green-500">{`${rating}%`}</h3>
                    }
                    <h3 className='title'>{show.name}</h3>
                  </div>
                    <div className="icons flex j-between">
                        <div className="controls flex">
                            <IoPlayCircleSharp title='play' onClick={() => navigate('/player')} />
                            <RiThumbUpFill title='like' />
                            <RiThumbDownFill title='dislike' />
                        </div>
                        <div className="right-controls flex a-center">
                          <button className="info" onClick={() => handleAddToWatchlist()}>
                              <AiOutlinePlusCircle title='Add to Watchlist' />
                          </button>
                          <button className="info" onClick={handleDisplay}>
                              <CgChevronDownO title='more info' />
                          </button>
                        </div>
                    </div>
                    <div className="genres flex">
                        <ul className="flex flex-wrap">
                            {genreNames.map((genre) => (
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                </div>
            }
        </Container>
    )
})

const Container = styled.div`
    cursor: pointer;
    position: relative;
    img{
      width: 15.5vw;
      height: 17vh;
      border-radius: 0.2rem;
      z-index: 10;
  }
  ${({ isLastCard }) =>
    isLastCard &&
    `
    .hover {
      right: 7rem;
    }
  `}
  .hover {
    z-index: 90;
    height: 19rem;
    width: 20rem;
    position: absolute; 
    top: -18vh;
    left: -2.5rem;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container { 
      padding: 1rem;
      gap: 0.5rem;
      .show-header {
        gap: 0.5rem;
      }
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      .right-controls {
        gap: 0.5rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        color: #b8b8b8;
        &:hover {
          color: white
        }
      }
    }
    .genres {
      ul {
        gap: 0.5rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
    `;
export default TvShowCard