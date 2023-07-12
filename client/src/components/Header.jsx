import styled from 'styled-components';
import netflixLogo from '../assets/netflixLogo.png';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

  return (
    <Container className='flex a-center j-between'>
        <div className='logo'>
            <img src={netflixLogo} alt='netflix logo' onClick={() => navigate('/')}/>
        </div>
       {props.login ? <button onClick={() => navigate('/login')}>
            Log In
        </button> : null}
    </Container>
  )
}

const Container = styled.div`
    padding: 0 4rem;
    .logo{
        img{
            height: 5rem;
        }
    }
    button{
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        height: fit-content;
    }
`;

export default Header