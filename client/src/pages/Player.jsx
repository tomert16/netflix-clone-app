import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import clip from "../assets/clip.mp4";

const Player = () => {
    const navigate = useNavigate();
  return (
    <Container>
        <div className="player">
            <div className="back">
                <BsArrowLeft onClick={() => navigate(-1)}/>
            </div>
            <video src={clip} autoPlay loop controls muted></video>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .player {
        width: 100vw;
        height: 100vh;
        .back {
            position: absolute;
            padding: 2rem;
            z-index: 1;
            svg {
                cursor: pointer;
                font-size: 3rem;
            }
        }
        video {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
`;

export default Player;