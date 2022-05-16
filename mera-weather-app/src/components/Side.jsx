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
    align-items: center;
    justify-content: space-around;
    margin-right: 0rem;
  }

  @media only screen 
  and (min-device-width: 360px) 
  and (max-device-width: 950px) 
  and (orientation: landscape) { 
    height: 40vh;
    flex-direction: row;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    width: 100%;
    height: 30vh;
    margin-top: 1rem;
    flex-direction: row;
    margin-right: 0rem;
    justify-content: space-between;

  }
`;

export default Side;
