import React from "react";
import styled from "styled-components";
import { WeatherIcon } from "../utils/getWeatherIcon";
import { IconContext } from "react-icons/lib";
import { getWeekday } from "../utils/getWeekday";

export function DayComponent({ keyProp, maxTemp, typeOfWeather, weekdayNum }) {
  const date = new Date(weekdayNum * 1000);
  const weekdayNumSingleDigit = date.getDay();

  return (
    <>
      <Day key={keyProp}>
        <IconContext.Provider
          value={{ size: window.innerWidth > 767 ? 42 : 22 }}
        >
          <WeatherIcon typeOfWeather={typeOfWeather} />
        </IconContext.Provider>
        <TemperatureNum>{Math.round(maxTemp)}°</TemperatureNum>
        <DayName>{getWeekday(weekdayNumSingleDigit)}</DayName>
      </Day>
    </>
  );
}

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  backdrop-filter: blur(8px);

  :hover {
    transform-origin: bottom center;
    -webkit-transform: scale(1, 1.1);
    -ms-transform: scale(1, 1.1);
    transform: scale(1, 1.1);

    transition: all 0.4s ease-in-out;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    filter: brightness(5);
  }
`;

const TemperatureNum = styled.p`
  font-size: 1.6rem;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const DayName = styled.p`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-bottom: 2vh;
  padding-top: 0.5vh;
  align-items: center;
  justify-content: space-around;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 0.6rem;
  }
`;
