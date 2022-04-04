import React from "react";
import DetailWeather from "./DetailWeather";
import DayWeather from "./DayWeather";
import { SideWrapper } from "./styles/SideWrapper.styled";

const Side = () => {
  return (
    <SideWrapper>
      <DayWeather />
      <DetailWeather />
    </SideWrapper>
  );
};

export default Side;
