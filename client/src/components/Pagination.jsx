import styled from 'styled-components'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'

const Pagination = ({ next, amount, total, previous,  beginningOfList, endOfList }) => {
    const slide = [];
    for (let i = 1; i < Math.ceil(total / amount); i++) {
        slide.push(i);
    }


  return (
    <Container>
        <button className="next-btn" onClick={() =>next()} disabled={endOfList}>
            <MdNavigateNext />
        </button>
        <button className="back-btn" onClick={() => previous()} disabled={beginningOfList}>
            <MdNavigateBefore />
        </button>
    </Container>
  )
}

const Container = styled.div`
    a {
        color: white;
    }
    .next-btn {
        position: relative;
        top: -9.5rem;
        left: 95%;
        height: 9.8rem;
        width: 6%;
        opacity: 0;
        transition: opacity 0.3s ease;
        svg {
            cursor: pointer;
            font-size: 5rem;
            position: relative;
            left: 6%;
        }
    }
    @media (max-width: 768px) {
        .next-btn {
            left: 80%; /* Adjust this value for smaller screens */
        }
    }
    .next-btn:hover, .back-btn:hover {
        opacity: 1;
        background: hsla(0,0%,8%,.5);
    }
    .back-btn{
        position: relative;
        top: -9.5rem;
        right: 13%;
        height: 9.8rem;
        width: 6%;
        opacity: 0;
        transition: opacity 0.3s ease;
        svg {
            cursor: pointer;
            font-size: 5rem;
            position: relative;
            right: 15%;
        }
    }
`
export default Pagination;