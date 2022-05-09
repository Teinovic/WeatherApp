import React from "react";
import styled from "styled-components";
import { WeatherIcon } from "../utils/getWeatherIcon";
import { IconContext } from "react-icons/lib";
import { getWeekday } from "../utils/getWeekday";

export function DayComponent({ keyProp, maxTemp, typeOfWeather, weekdayNum }) {
  const date = new Date(weekdayNum * 1000);
  const weekdayNumSingleDigit = date.getDay();

  return (
    <Day key={keyProp}>
      <IconContext.Provider value={{ size: window.innerWidth > 767 ? 35 : 22 }}>
        <WeatherIcon typeOfWeather={typeOfWeather} />
      </IconContext.Provider>
      <TemperatureNum>{Math.round(maxTemp)}°</TemperatureNum>
      <DayName>{getWeekday(weekdayNumSingleDigit)}</DayName>
    </Day>
  );
}

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  backdrop-filter: blur(8px);
  border: solid 0.2px grey;
  border-top: none;

  canvas {
    width: 30px;
    height: 30px;
  }

  :hover {
    transform-origin: bottom center;
    -webkit-transform: scale(1, 1.1);
    -ms-transform: scale(1, 1.1);
    transform: scale(1, 1.1);

    border: grey;
    border-top: none;

    transition: all 0.4s ease-in-out;
    background-color: rgba(255, 255, 255, 0.3);
    //backdrop-filter: blur(8px);
    filter: brightness(5);
  }

  @media (max-width: 767px) {
    canvas {
      width: 40px;
      height: 40px;
    }
  }
`;

const TemperatureNum = styled.p`
  font-size: 1.6rem;

  @media (max-width: 767px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    font-size: 2rem;
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
    font-size: 1remrem;
  }
`;
