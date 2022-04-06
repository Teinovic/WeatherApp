import styled from "styled-components";

export const WeatherContainer = styled.div`
  width: 85%;
  height: 80%;
  background-color: blue;
  display: flex;

  @media (max-width: 767px) {
    width: 100%;
    height: 200vh;
    background-color: green;
    flex-direction: column-reverse;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 100vh;
    background-color: pink;
    flex-direction: column-reverse;
  }
`;
