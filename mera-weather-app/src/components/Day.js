import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getWeekday } from "../utils/getWeekday";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { getImage } from "../utils/getImage";

export function DayComponent({ keyProp, maxTemp, typeOfWeather, weekdayNum }) {
  const [image, setImage] = useState("");
  useEffect(() => {
    getImage(getWeatherIcon(typeOfWeather), setImage);
  }, [image, getWeatherIcon, typeOfWeather]);

  return (
    <Day key={keyProp}>
      <img src={image} />
      <p>{Math.round(maxTemp)}°</p>
      <p>{getWeekday(weekdayNum)}</p>
    </Day>
  );
}

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 0.15px solid white;
  background-color: rgba(255, 255, 255, 0.2);
`;
