import React, { useState, useEffect } from "react";
import { changeLanguage } from "i18next";
import styled from "styled-components";
import Image from "../download.jpeg";
import useHttp from "../hooks/use-http";

import { DayComponent } from "./Day";

import { useDispatch, useSelector } from "react-redux";
import { weatherAdded } from "../store2/weatherSlice";

import { NewDropdown } from "./NewDropdown";

const API_KEY = process.env.REACT_APP_API_KEY;

export const Main = () => {
  const [citiesData, setCitiesData] = useState("");
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

  // data sent from NewDropdown component to main
  const currentCityData = useSelector((state) => state.currentCity);

  console.log(`rerender num`);

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
      url: `https://api.teleport.org/api/urban_areas/slug:${currentCityData
        .replace(/,/g, "")
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
  }, [currentCityData]);

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
      <NewDropdown citiesData={citiesData} />
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
                weekdayNum={day.dt}
              />
            );
          })}
      </SevenDays>
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

  align-content: space-between;

  -webkit-transition: background-image 1s ease-in-out;
  transition: background-image 1s ease-in-out;

  @media (max-width: 767px) {
    width: 100%;
    height: 100vh;
    // max-height: 100vh;
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
  height: 30vh;
  grid-gap: 0px;
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
