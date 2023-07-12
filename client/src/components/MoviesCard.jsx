import React,{ useState } from 'react';
import styled from 'styled-components';
import MovieInfo from '../pages/movies/MovieInfo';
import clip from "../assets/clip.mp4";
import { useDispatch } from 'react-redux';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { CgChevronDownO } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { addToWatchlist, removeFromWatchlist } from '../features/watchlist/watchlistSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';


const MoviesCard = React.memo(({ movie, isLiked=false, setRefresh, genres}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  //display selected movie information
  const [display, setDisplay] = useState(false);
  const handleDisplay = () => {
    setDisplay(true);
  };
  //hover state to display information
  const  [isHovered, setIsHovered] = useState(false);

  //get genre
  const genreNames = movie.genre_ids.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : '';
  });
  //turn genre array into a set to filter out duplicates
  const filteredGenreNames = [...new Set(genreNames)];
  

  //rating percentage
  const rating = Math.ceil(movie.vote_average * 10);

  //hover over movie functionality
  const handleMouseEnter = () => {
      setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  
  //add movie to watchlist
  const handleAddToWatchlist =  () => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email;
        dispatch(addToWatchlist({ email, data: movie }));
      } else {
        // User not logged in
        navigate('/login');
      }
    });
  }
  //remove movie from watchlist
  const handleRemoveFromWatchlist = (id) => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email;
        dispatch(removeFromWatchlist({ email, data: id }));
        setRefresh(true)
      } else {
        navigate('/login');
      }
    });
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {display ? <MovieInfo  movie={movie} setDisplay={setDisplay} filteredGenreNames={filteredGenreNames} /> : null}
        <div className="movie-card">
            <img 
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} 
              alt={movie.title} 
            />
        </div>
        {isHovered && (
          <div className="hover" >
            <div className="image-video-container">
              <img 
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} 
                alt={movie.title} 
              />
              <video 
                src={clip}
                autoPlay={true}
                loop 
                controls 
                muted
                />
              </div>
              <div className="info-container flex column">
                <div className="card-header flex">
                  {rating <= 59 ? <h3 className="movie-rating text-red-500">{`${rating}%`}</h3>
                  :
                  <h3 className="movie-rating text-green-500">{`${rating}%`}</h3>
                  }
                  <h3 className='title'>{movie.title}</h3>
                </div>
                <div className="icons flex j-between">
                  <div className="controls flex">
                    <IoPlayCircleSharp title='play' onClick={() => navigate('/player')}/>
                    <RiThumbUpFill title='like'/>
                    <RiThumbDownFill title='dislike'/>
                  </div>
                  <div className="right-controls flex a-center">
                    {isLiked ? <button className="info" onClick={() => handleRemoveFromWatchlist(movie.id)}>
                      <AiOutlineCheckCircle title='Remove from Watchlist' />
                    </button>
                     :
                    <button className="info" onClick={() => handleAddToWatchlist()}>
                      <AiOutlinePlusCircle title='Add to Watchlist' />
                    </button>                    
                    }
                    <button className="info" onClick={handleDisplay}>
                      <CgChevronDownO title='more info'/>
                    </button>
                  </div>
                </div>
                <div className="genres flex">
                  <ul className="flex flex-wrap">{filteredGenreNames.map((genre) => (
                    <li key={genre}>{genre}</li>
                  ))}
                  </ul>
                </div>
              </div>
          </div>
        )}
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
      .card-header {
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

export default MoviesCard