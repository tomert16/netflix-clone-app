import React from 'react'
import styled from 'styled-components';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch } from 'react-redux';
import { addToWatchlist } from '../features/watchlist/watchlistSlice';


const RecCard = React.memo(({ recommendation, isMovie }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleAddToWatchlist = () => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                const email = currentUser.email;
                dispatch(addToWatchlist({email, data: recommendation}))
            } else {
                navigate('/login');
            }
        })
    }

  return (
    <Container>
        <div className="image-container" onClick={() => navigate('/player')}>
            <img src={`https://image.tmdb.org/t/p/w500/${recommendation.backdrop_path}`} />
        </div>
        <button className="add-movie" onClick={() => handleAddToWatchlist()}>
            <AiOutlinePlusCircle title='Add to watchlist'/>
        </button>
        <div className="movie-info">
            {isMovie ? <p className="rec-title">{recommendation.title}</p> : <p className="rec-title">{recommendation.name}</p>}
            <p className="rec-description">{recommendation.overview}</p>
        </div>
    </Container>
  )
})

  const Container = styled.div`
    border: 1px ;
    border-radius: 5px;
    border-color: transparent;
    background-color: #181818;
    height: 100%;
    width: 90%;
    margin-top: 10px;
    .image-container {
      img { 
            position: relative;
            height: 140px;
            width: 100%;
            object-fit: cover;
        }
    }
    .movie-info {
        .rec-description {
            font-size: 12px;
        }
        .rec-title {
            position: relative;
            text-align: left;
            bottom: 1.5rem;
            left: 0.5rem;
            width: 10rem;
        }    
    }
    .add-movie {
        display: flex;
        position: relative;
        left: 12rem;
        top: 0.6rem;
        cursor: pointer;
        svg {
            font-size: 2.4rem;
            color: #b8b8b8;
            transition: 0.3s ease-in-out;
            &:hover {
                color: white;
            }
        }
    }
`;

export default RecCard