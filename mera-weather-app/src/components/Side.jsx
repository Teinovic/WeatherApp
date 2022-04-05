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


export default Side;
