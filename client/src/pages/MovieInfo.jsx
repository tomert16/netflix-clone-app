import styled from 'styled-components';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { API_KEY } from '../utils/constants';
import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clip from "../assets/clip.mov";
import { fetchMovieGenres, selectMovieGenres } from '../features/genres/genresSlice';

import RecCard from '../components/RecCard';


const MovieInfo = React.memo(({ movie, setDisplay, filteredGenreNames }) => {
    const dispatch = useDispatch();
    const [video, setVideo] = useState();
    const [recommendations, setRecommendations] = useState();
  
    //retrieve movie genres data from API
    const movieGenres = useSelector(selectMovieGenres)
    useEffect(() => {
        dispatch(fetchMovieGenres(movieGenres))
    },[dispatch])

    //fetch movie videos
    useEffect(() => {
        const fetchVideo = async() => {
            const req = fetch (`movie/${movie.id}/videos?api_key=${API_KEY}`);
            const resp = await req;
            const parsed = await resp.json();
            setVideo(parsed.results);
        }
        fetchVideo();
    },[])

    //fetch recommendations for selected movie
    useEffect(() => {
        const fetchRecommendation = async() => {
            const req = await axios.get(`movie/${movie.id}/recommendations?api_key=${API_KEY}`);
            setRecommendations(req.data.results);
        }
        fetchRecommendation();
    },[])
    if (video === undefined) return null;
    if (recommendations === undefined) return null;

    //exit movie card functionality
    const handleExitInfo = () => {
        setDisplay(false);
    };
    //format the release date
    const formattedDate = new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
    });


  return (
    <Container>
        <div className="card j-center a-center">
            <button className="close-btn" onClick={handleExitInfo}>
                <AiFillCloseCircle />
            </button>
            {video && video[0] && video[0].key ? <iframe
                className="video"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video[0].key}?autoplay=1&controls=0`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; controls"
                allowFullScreen
            ></iframe>
            :
            <video
                className="video"
                src={clip}
                autoPlay 
                loop 
                controls 
                muted
            />
            }
            {/* <h2 className="title">{movie.title}</h2> */}
            <div className="extra-info flex j-between">
                <h2 className="date">{formattedDate}</h2>
                <h2 className="genres">{`Genres: ${filteredGenreNames.map(((genre) => genre)).join(', ')}`}</h2>
            </div><br/>
            <p className='description'>{movie.overview}</p>
            <h1>More Like This</h1>
            <div className="recommendations">
                {recommendations.slice(0,9).map((recommendation) => (
                    <RecCard recommendation={recommendation} isMovie/>
                ))}
            </div>
        </div>
    </Container>
  )
})

const Container = styled.div`
  border-style: solid;
  border-radius: 3px;
  border-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  .card {
    overflow-x: scroll;
    position: relative;
    width: 60%;
    height: 90%;
    border-radius: 15px;
    background: #292929;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset;
    .video {
        height: 50%;
        width: 100%;
        object-fit: cover;
    }
    .close-btn {
        position: absolute;
        right: 1rem;
        z-index: 1;
        svg{
            cursor: pointer;
            font-size:2rem
        }
        
    }
    .title {
        position: relative;
        left: 4rem;
        bottom: 15rem;
        font-size: 4rem;
        word-wrap: break-word;
        width: 40rem;
    }
    .extra-info{
        bottom: 11rem;
        margin-left: 1rem;
        margin-right: 1rem;
        
    }
    .description {
        width: 25rem;
        font-size: 1rem;
        margin-left: 1rem;
    }
    .genres {
        margin-left: 2rem;
    }
}
h1 {
      margin-left: 2rem;
      margin-top: 3rem;
      font-weight: bold;
      font-size: 1.8rem;
  }
  .recommendations {
      display: grid;
      grid-template-columns: repeat(auto-fit, minMax(14rem, 1fr));
      grid-gap: 1rem;
      margin-left: 1.5rem;
  }
`;

export default MovieInfo