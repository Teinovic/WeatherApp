import styled from "styled-components";

export const AppName = styled.div`
    position: absolute;
    top: -28px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    background: linear-gradient(
        90deg,
        rgb(34,117,83) 31%,
        rgb(49,140,104) 45%,
        rgb(73,163,132) 60%,
        rgb(86,151,135) 80%
      );
    padding: 0.2rem 0.3rem;
    border-radius: 15px;
    font-style: bold;
    letter-spacing: 1.7px;
    z-index: 10000;

    @media (max-width: 800px) {
        display: none;
    }

    @media only screen 
  and (min-device-width: 360px) 
  and (max-device-width: 950px) 
  and (orientation: landscape) { 
    display: none;
}

    @media (min-width: 800px) and (max-width: 1100px) {
        top: auto;
        bottom: -28px;
    }
`;

export const Name = styled.h1`
    color: white;
`

export const Circle = styled.div`
border-radius: 50%;
height: 1rem;
width: 1rem;
background-color: blue;
`
export const CircleTwo = styled.div`
border-radius: 50%;
height: 1rem;
width: 1rem;
background-color: purple;
transform: translateX(-0.5rem);
`
export const CircleThree = styled.div`
border-radius: 50%;
height: 1rem;
width: 1rem;
background: linear-gradient(
    90deg,
    blue 31%,
    lightblue 45%,
    purple 60%,
    white 80%
  );
  transform: translateX(-1rem);
`
