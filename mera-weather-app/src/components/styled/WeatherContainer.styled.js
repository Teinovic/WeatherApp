import styled from "styled-components";

export const WeatherContainer = styled.div`
  width: 85%;
  height: 80%;
  display: flex;

  @media (max-width: 767px) {
    width: 100%;
    height: 200vh;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    width: 90%;
    height: 90vh;
    flex-direction: column-reverse;
  }
  @media only screen 
  and (min-device-width: 360px) 
  and (max-device-width: 950px) 
  and (orientation: landscape) { 
    width: 100%;
    height: 100vh;
  }

  @media screen and (min-width: 1800px) {
    width: 60%;
    height: 50vh;
  }
`;
