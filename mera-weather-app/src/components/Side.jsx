import React from "react";
import styled from "styled-components";
import DetailWeather from "./DetailWeather";
import DayWeather from "./DayWeather";

const Side = () => {
  return (
    <SideWrapper>
      <DayWeather />
      <DetailWeather />
    </SideWrapper>
  );
};

const SideWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;

  @media (max-width: 767px) {
    width: 100%;
    height: 100vh;
    flex-direction: column;
    margin-right: 0rem;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    width: 100%;
    height: 30vh;
    
    flex-direction: row;
    margin-right: 0rem;

  }
`;

export default Side;
