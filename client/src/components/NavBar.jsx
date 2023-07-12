import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import netflixLogo from '../assets/netflixLogo.png';
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { clearWatchlist } from '../features/watchlist/watchlistSlice';


const NavBar = ({ isScrolled }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [iconToggle, setIconToggle] = useState(false);
    //search bar toggle
    const [toggleSearchBar, setToggleSearchBar] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    const handleProfileMenuOpen = () => {
        setIconToggle(!iconToggle);
      };

    //nav bar links 
    const links = [
        {name: 'Home', link: '/home'},
        {name: 'TV Shows', link: '/tv'},
        {name: 'Movies', link: '/movies'},
        {name: 'My List', link: '/my-list'}
    ]

    //log out functionality
    const handleLogout = () => {
        try{
            signOut(firebaseAuth);
            dispatch(clearWatchlist())
        } catch (err) {
            console.error(err);
        }
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
            navigate('/');
        }
    })
    
  return (
    <Container>
        <nav className={`${isScrolled ? 'scrolled' : 'not-scrolled'} flex`}>
            <div className="left flex a-center">
                <div className="brand flex a-center j-center">
                    <img src={netflixLogo} alt='logo' />
                </div>
                <ul className="links flex">
                    {links.map(({name,link}) => {
                        return (
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        )
                    })}
                </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${toggleSearchBar ? 'show-search' : ''}`}>
                        <button 
                            onFocus={() => setToggleSearchBar(true)}
                            onBlur={() => {
                                if (!inputHover) {
                                    setToggleSearchBar(false);
                                }
                            }}

                        >
                            <FaSearch />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setToggleSearchBar(false);
                                setInputHover(false);
                            }}
                        />
                    </div>
                    <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                        <AccountCircle />
                            {iconToggle ? <div>
                                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                                <MenuItem type="button" onClick={handleLogout}>Logout</MenuItem>
                            </div>: null}
                        </IconButton>
                    </MenuItem>
            </div>
        </nav>
    </Container>
  )
}

const Container = styled.div`
    .not-scrolled {
        background-image: linear-gradient(180deg,rgba(0,0,0,.7) 15%,transparent);
    }
    .scrolled {
    background-color: #141414;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      /* position: absolute;
      left: 80%; */
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
`;

export default NavBar;