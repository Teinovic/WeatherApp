import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { getImage } from "../utils/getImage";

export function DayComponent({ keyProp, maxTemp, typeOfWeather }) {
  const [image, setImage] = useState("");
  useEffect(() => {
    getImage(getWeatherIcon(typeOfWeather), setImage);
  }, [image, typeOfWeather]);

  return (
    <>
      <Day key={keyProp}>
        <img src={image} alt={typeOfWeather} />
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
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.2);
  :hover {
    {   
        transform-origin: bottom center;
        -webkit-transform: scale(1, 1.2);
        -ms-transform: scale(1, 1.2);
        transform: scale(1, 1.2);
        transition: 1s ease;
        cursor: circle;
  }
`;

const TemperatureNum = styled.p`
  font-size: 1.6rem;
`;
