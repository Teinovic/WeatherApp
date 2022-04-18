import React from "react";
import styled from "styled-components";
import { WeatherIcon } from "../utils/getWeatherIcon";
import { IconContext } from "react-icons/lib";

export function DayComponent({ keyProp, maxTemp, typeOfWeather }) {
  return (
    <>
      <Day key={keyProp}>
        <IconContext.Provider value={{ size: 42 }}>
          <WeatherIcon typeOfWeather={typeOfWeather} />
        </IconContext.Provider>
        <TemperatureNum>{Math.round(maxTemp)}°</TemperatureNum>
      </Day>
    </>
  );
}

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-right: 0.02px solid white;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.2);
  :hover {
    {   
        transform-origin: bottom center;
        -webkit-transform: scale(1, 1.1);
        -ms-transform: scale(1, 1.1);
        transform: scale(1, 1.1);
        transition: all 0.6s ease-in-out;
`;

const TemperatureNum = styled.p`
  font-size: 1.6rem;
`;
