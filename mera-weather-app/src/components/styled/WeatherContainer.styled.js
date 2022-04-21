import styled from "styled-components";

export const WeatherContainer = styled.div`
  width: 85%;
  height: 80%;
  display: flex;

  @media (max-width: 767px) {
    width: 100%;
    height: 118vh;
    max-height: 118vh;
    background-color: green;
    flex-direction: column-reverse;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    width: 95%;
    height: 95%;
    flex-direction: column-reverse;
  }
`;
