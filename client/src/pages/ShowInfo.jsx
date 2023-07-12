import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { API_KEY } from '../utils/constants';
import React,{ useEffect, useState } from 'react';
import clip from "../assets/clip.mov";
import axios from 'axios';
import RecCard from '../components/RecCard';


const ShowInfo = React.memo(({ show, setDisplay, genres }) => {
    
    //fetch video data for selected show
    const [video, setVideo] = useState();
    useEffect(() => {
        const fetchVideo = async() => {
            const req = fetch (`movie/${show.id}/videos?api_key=${API_KEY}`)
            const resp = await req
            const parsed = await resp.json()
            setVideo(parsed.results)
        }
        fetchVideo();
    },[show.id])

    //fetch show recommendations
    const [recommendations, setRecommendations] = useState();
    useEffect(() => {
        const fetchRecommendations = async() => {
            const req = await axios.get(`tv/${show.id}/recommendations?api_key=${API_KEY}`);
            setRecommendations(req.data.results);
        }
        fetchRecommendations();
    },[show.id])

    if (video === undefined) return null;
    if (recommendations === undefined) return null;

    //exit show info 
    const handleExitInfo = () => {
        setDisplay(false);
    }


    //formatted date
    const formattedDate = new Date(show.first_air_date).toLocaleDateString('en-US', {
        year: 'numeric',
        
    });
    // map out show genres
    const genresId = show.genre_ids.map((genre) => genre);
    const showGenreList = genres.map((genre) => genre).filter((genre) => genresId.includes(genre.id))
    const genreNames = showGenreList.map((genre) => genre.name)


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
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe> : 
            <video
                className="video"
                src={clip}
                autoPlay 
                loop 
                controls 
                muted
            ></video>
            }
            {/* <h2 className="title">{show.name}</h2> */}
            <div className="extra-info flex j-between">
                <h2>{formattedDate}</h2>
                <h2>{`Genres: ${genreNames.map((genre) => genre).join(', ')}`}</h2>
            </div><br/>
            <p className="description">{show.overview}</p>
            <h1>More Like This</h1>
            <div className="recommendations">
                {recommendations.slice(0,9).map((recommendation) => (
                    <RecCard recommendation={recommendation} />
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
  /* cursor: pointer; */
  background: rgba(0,0,0,.5);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  .card {
    overflow-x: scroll;
    width: 60%;
    height: 90%;
    border-radius: 15px;
    background: #292929;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset;
    position: relative;
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
    .description {
        width: 25rem;
        font-size: 1rem;
        margin-left: 1rem;
    }
    .extra-info{
        /* position: relative; */
        bottom: 11rem;
        margin-left: 1rem;
        margin-right: 1rem;
        
    }
    .genres {
        margin-left: 2rem;
    }
}
h1 {
    margin-top: 3rem;
    margin-left: 2rem;
    font-size: 1.8rem;
    font-weight: bold;
}
.recommendations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minMax(14rem, 1fr));
    grid-gap: 1rem;
    margin-left: 1.5rem;
}
`;

export default ShowInfo