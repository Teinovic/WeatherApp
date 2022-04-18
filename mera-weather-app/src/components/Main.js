import React, { useState, useEffect, useCallback } from "react";
import { changeLanguage } from "i18next";
import styled from "styled-components";
import Image from "../download.jpeg";
import useHttp from "../hooks/use-http";
import ReactCountryFlag from "react-country-flag";
import { DayComponent } from "./Day";
import { getWeekday } from "../utils/getWeekday";
import { Dropdown } from "./Dropdown";

const API_KEY = process.env.REACT_APP_API_KEY;

export const Main = () => {
  const [citiesData, setCitiesData] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [imgAndWeatherData, setImgAndWeatherData] = useState("");
  const { sendRequest } = useHttp();

  const pullSelectedCity = (cityName) => {
    console.log("i pulled city");
    setCurrentCity(cityName);
  };

  console.log("rerender");

  async function fetchCities() {
    const citiesResponse = await sendRequest({
      url: "https://api.teleport.org/api/urban_areas/",
    });
    setCitiesData(citiesResponse);
  }
  // fetching all the cities with an image
  useEffect(() => {
    if (!citiesData) fetchCities();
  }, [citiesData]);

  async function fetchImgAndWeatherData() {
    const currCityApiData = await sendRequest({
      url: `https://api.teleport.org/api/urban_areas/slug:${currentCity
        .split(" ")
        .join("-")
        .toLowerCase()}/`,
    });
    const { _links: { "ua:images": imageData } = {} } = currCityApiData;
    const { _links: { "ua:identifying-city": coordinatesData } = {} } =
      currCityApiData;

    const imgResponse = await sendRequest({ url: imageData.href });
    const coordsResponse = await sendRequest({ url: coordinatesData.href });
    const {
      location: { latlon: { latitude: lat, longitude: lon } = {} },
    } = coordsResponse;
    const weatherDataResponse = await sendRequest({
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`,
    });
    setImgAndWeatherData({
      imgData: imgResponse,
      weatherData: weatherDataResponse,
    });
  }

  useEffect(() => {
    fetchImgAndWeatherData();
  }, [currentCity]);

  // from currentCityApiData
  const backgroundImage =
    imgAndWeatherData && imgAndWeatherData.imgData.photos[0].image.mobile;

  return (
    <MainWrapper image={backgroundImage ? backgroundImage : Image}>
      <Dropdown citiesData={citiesData} pullSelectedCity={pullSelectedCity} />

      <Button right="0;" onClick={() => changeLanguage("en")}>
        <ReactCountryFlag countryCode="GB" />
      </Button>
      <Button right="2rem;" onClick={() => changeLanguage("sr")}>
        <ReactCountryFlag countryCode="RS" />
      </Button>

      <SevenDays>
        {imgAndWeatherData &&
          imgAndWeatherData.weatherData.daily.slice(0, -1).map((day, key) => {
            const date = new Date(day.dt * 1000);
            const weekdayNum = date.getDay();

            return (
              <DayComponent
                key={key}
                typeOfWeather={day.weather[0].main}
                maxTemp={day.temp.max}
                weekdayNum={weekdayNum}
              />
            );
          })}
      </SevenDays>
      <SevenDaysNames>
        {imgAndWeatherData &&
          imgAndWeatherData.weatherData.daily.slice(0, -1).map((day, key) => {
            const date = new Date(day.dt * 1000);
            const weekdayNum = date.getDay();

            return <DayName key={key}>{getWeekday(weekdayNum)}</DayName>;
          })}
      </SevenDaysNames>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 70%;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  display: grid;
  grid-template-rows: 1fr 30%;

  @media (max-width: 767px) {
    width: 100%;
    height: 100vh;
    background-color: green;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    width: 100%;
    height: 70vh;
    background-color: pink;
    margin: 0.5rem;
  }
`;

const SevenDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: white;
  div:last-child {
    border-right: 0;
  }
`;

const SevenDaysNames = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  color: white;
  p:last-child {
    border-right: 0;
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
  border-right: 0.02px solid white;
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0.25rem 0.5rem;
  border-radious: 25%;
  position: absolute;
  top: 0;
  right: ${(props) => props.right};
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;
