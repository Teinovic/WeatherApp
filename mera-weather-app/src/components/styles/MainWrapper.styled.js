import styled from "styled-components";

export const MainWrapper = styled.main`
  width: 70%;
  background-color: red;

  @media (max-width: 767px) {
    width: 100%;
    height: 100vh;
    background-color: green;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 70vh;
    background-color: pink;
  }
`;
