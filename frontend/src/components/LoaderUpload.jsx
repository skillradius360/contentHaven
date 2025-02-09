import React from 'react';
import styled from 'styled-components';

const LoaderUpload = () => {
  return (
    <StyledWrapper>
      <div className="lds-hourglass" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
  }

  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 5px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
  }

  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    100% {
      transform: rotate(1800deg);
    }
  }
`;

export default LoaderUpload;
