import React from "react";
import styled from "styled-components";


const Main = () => {
  return (
    <MainWrapper>
      <p>
        THIS IS A MAIN PART !!!!! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quam eaque architecto quibusdam suscipit magnam.
        Asperiores amet quibusdam doloribus! Ratione, quia.
      </p>
    </MainWrapper>
  );
};


const MainWrapper = styled.div`
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

export default Main;
