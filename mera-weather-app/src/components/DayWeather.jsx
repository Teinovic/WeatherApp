import React from "react";
import styled from "styled-components";

const dayWeather = () => {
  return (
    <DayWrapper>
      <DayInfo>
        <p>32'</p>
        <p>sunn</p>
      </DayInfo>
      <RefreshContainer>
      <RefreshButton>Update ... </RefreshButton>
      </RefreshContainer>
    </DayWrapper>
  );
};

const DayWrapper = styled.div`
  height: 60vh;
  width:100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4rem;
  background-color: green;

  @media (max-width: 767px) {
    width: 100%;
    height: 50vh;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 50%;
    height: 30vh;
  }
`;

const DayInfo = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-around;
`
const RefreshContainer = styled.div`
  background-color:white;
  display:flex;
  align-items: flex-end;
  justify-content: center;
`
const RefreshButton = styled.button`
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  color:white;
  background-color: blue;
  border-radious: 20%;
`

export default dayWeather;
