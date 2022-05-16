import styled from "styled-components";

// background with https://cssgradient.io/
export const Container = styled.main`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(218, 238, 248, 1) 31%,
    rgba(220, 240, 243, 1) 38%,
    rgba(220, 240, 243, 1) 45%,
    rgba(222, 252, 235, 1) 54%
  );
  display: grid;
  place-items: center;

  @media (max-width: 767px) {
    width: 100%;
    height: 200vh;
  }
`;
