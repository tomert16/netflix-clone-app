import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import netflixbg from '../assets/netflixCloneBg.jpg';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';
const Landing = () => {
    const navigate = useNavigate();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            navigate('/home');
        }
    })


  return (
    <Container>
        <div class="bg-image" style={{backgroundImage: `url(${netflixbg})`, backgroundSize: 'cover'}}>
            <div className='content'>
            <Header login />
                <div class='relative left-40 top-64' >
                    <div>
                        <h1 class='text-6xl px-0 py-25'>Unlimited movies, TV shows, and more</h1><br/>
                        <h4 class='text-2xl'>Watch anywhere. Cancel anytime</h4><br/>
                        <h6 class='text-xl'>Ready to watch? Click below to get started and create a membership.</h6><br/>
                    </div>
                <button class="cssbuttons-io-button" onClick={() => navigate('/signup')}> Get started
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                    </div>
                </button>
                </div>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
    color: white;
    .content{
        position: absolute;
        top: 0;
        right: 0;
        font-size: 30px;
        font-weight: bold;
        background-color: #0000007f;
        height: 100vh;
        width: 100vw;
    }
`;

export default Landing