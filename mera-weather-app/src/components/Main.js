import React, { useState, useEffect } from "react";
import { changeLanguage } from "i18next";
import styled from "styled-components";
import Image from "../download.jpeg";
import useHttp from "../hooks/use-http";

import { DayComponent } from "./Day";
import { getWeekday } from "../utils/getWeekday";

import { useDispatch } from "react-redux";
import { weatherAdded } from "../store2/weatherSlice";

import { Dropdown } from "./Dropdown";

const API_KEY = process.env.REACT_APP_API_KEY;

export const Main = () => {
  const [citiesData, setCitiesData] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [imgAndWeatherData, setImgAndWeatherData] = useState("");
  const [language, setLanguage] = useState("en");
  const { sendRequest } = useHttp();
  // REEDUX define dispatch ... i import useDispathc for this and weatherActions for function showWeather
  const dispatch = useDispatch();

  //REDUX put weatherData in const
  let currentWeather = imgAndWeatherData.weatherData || "nesto";

  // function for REDUX  ...
  const showWeather = () => {
    dispatch(weatherAdded(currentWeather));
  };

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

  useEffect(() => {
    if (imgAndWeatherData) {
      showWeather();
    }
  }, [imgAndWeatherData]);

  // from currentCityApiData
  const backgroundImage =
    imgAndWeatherData && imgAndWeatherData.imgData.photos[0].image.mobile;

  return (
    <MainWrapper image={backgroundImage ? backgroundImage : Image}>
      <Dropdown citiesData={citiesData} pullSelectedCity={pullSelectedCity} />
      <LanguageWrapper>
        <OptionEnglish
          onClick={() => {
            changeLanguage("en");
            setLanguage("en");
          }}
          style={{ fontSize: language === "en" && "1rem" }}
        >
          English
        </OptionEnglish>
        <OptionSerbian
          onClick={() => {
            changeLanguage("sr");
            setLanguage("sr");
          }}
          style={{ fontSize: language === "sr" && "1rem" }}
        >
          Srpski
        </OptionSerbian>
      </LanguageWrapper>

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
    max-height: 100vh;
    background-color: green;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    width: 100%;
    height: 70vh;
    background-color: pink;
  }
`;

const SevenDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: white;
`;

const SevenDaysNames = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  color: white;
`;

const DayName = styled.p`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-bottom: 2vh;
  padding-top: 0.5vh;
  align-items: center;
  justify-content: space-around;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 0.6rem;
  }
`;

const LanguageWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const OptionEnglish = styled.button`
  color: white;
  font-size: 0.8rem;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;
const OptionSerbian = styled.button`
  color: white;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0.1rem 0.5rem;
  border-radious: 25%;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;
