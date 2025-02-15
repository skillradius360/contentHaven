// import React from 'react';
// import styled from 'styled-components';
// import {useNavigate} from "react-router-dom"
// const Button = ({videoId}) => {

//   const navigate= useNavigate()

//   return (
//     <StyledWrapper>
//       <button
//       onClick={(e)=>navigate(`/PlayerPage/${videoId}`)}
//        className="comic-button">WATCH</button>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .comic-button {
//     display: inline-block;
//     padding: 10px 20px;
//     font-size: 24px;
//     font-weight: bold;
//     text-align: center;
//     text-decoration: none;
//     color: #fff;
//     background-color: #ff5252;
//     border: 2px solid #000;
//     border-radius: 10px;
//     box-shadow: 5px 5px 0px #000;
//     transition: all 0.3s ease;
//     cursor: pointer;
//   }

//   .comic-button:hover {
//     background-color: #fff;
//     color: #ff5252;
//     border: 2px solid #ff5252;
//     box-shadow: 5px 5px 0px #ff5252;
//   }

//   .comic-button:active {
//     background-color: #fcf414;
//     box-shadow: none;
//     transform: translateY(4px);
//   }`;

// export default Button;


import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"

const Button = ({ videoId }) => {

  const navigate = useNavigate()

  return (
    <StyledWrapper>
      <button
        onClick={(e) => navigate(`/PlayerPage/${videoId}`)}
        className="comic-button">WATCH</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    width: 9em;
    height: 3em;
    border-radius: 30em;
    font-size: 15px;
    font-family: inherit;
    border: none;
    position: relative;
    background:red;
    overflow: hidden;
    z-index: 1;
    text-transform:capitalize;
    font-weight:bold;
  }

  button::before {
    content: '';
    width: 0;
    height: 3em;
    border-radius: 30em;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, #fdfc47, #24fe41);
    transition: .5s ease;
    display: block;
    z-index: -1;
  }

  button:hover::before {
   width: 9em;
  }`;


export default Button;
