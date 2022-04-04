import styled from "styled-components";

export const SideWrapper = styled.main`
  width: 30%;
  background-color: purple;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    width: 100%;
    height: 100vh;
    background-color: blue;
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 30vh;
    background-color: orange;
    flex-direction: row;
  }
`;
