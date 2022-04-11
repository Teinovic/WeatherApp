import React, { useState, useEffect } from "react";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Image from "../download.jpeg";
import { BsSun } from "react-icons/bs";
import useHttp from "../hooks/use-http";


const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
  const [citiesData, setCitiesData] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentCityApiData, setCurrentCityApiData] = useState("");
  const [currentCityImageData, setCurrentCityImageData] = useState("");
  const [currentCityCoordinates, setCurrentCityCoordinates] = useState(0);
  const [weatherData, setWeatherData] = useState("");
  const { t } = useTranslation();
  const { sendRequest } = useHttp();

  // destructuring cities api data
  const { _links: { "ua:item": cities } = {} } = citiesData;

  // fetching all the cities with an image
  useEffect(() => {
    sendRequest(
      { url: "https://api.teleport.org/api/urban_areas/" },
      setCitiesData
    );
  }, []);

  // fetching image and coord data when the new city is selected
  useEffect(() => {
    const { _links: { "ua:images": imageData } = {} } = currentCityApiData;
    const { _links: { "ua:identifying-city": coordinatesData } = {} } =
      currentCityApiData;
    if (currentCityApiData) {
      sendRequest({ url: imageData.href }, setCurrentCityImageData);
      sendRequest({ url: coordinatesData.href }, setCurrentCityCoordinates);
    }
  }, [currentCityApiData]);

  // fetching the 7 day forecast
  useEffect(() => {
    if (currentCityCoordinates) {
      const {
        location: { latlon: { latitude: lat, longitude: lon } = {} },
      } = currentCityCoordinates;
      sendRequest(
        {
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`,
        },
        setWeatherData
      );
    }
  }, [currentCityCoordinates]);

   console.log(currentCityApiData);
  console.log(currentCityCoordinates);
  // console.log(currentCityImageData);
  console.log(weatherData,"WEATHER DATA")
  if (weatherData) console.log(weatherData.daily.slice(0, -1),"PRIKAZI");

  return (
    <MainWrapper image={Image}>
      <ChooseCity>
        <p>{t("MainPart")}</p>
        <select
          name="cities"
          id="city"
          value={currentCity}
          onChange={(event) => {
            setCurrentCity(event.target.value);
            sendRequest(
              {
                url: `https://api.teleport.org/api/urban_areas/slug:${event.target.value.toLowerCase()}/`,
              },
              setCurrentCityApiData
            );
          }}
        >
          {citiesData &&
            cities.map((city, key) => {
              return (
                <option key={key} value={city.name}>
                  {city.name}
                </option>
              );
            })}
        </select>
        <Button right="0;" onClick={() => changeLanguage("en")}>
          En
        </Button>
        <Button right="2rem;" onClick={() => changeLanguage("sr")}>
          Sr
        </Button>
      </ChooseCity>
      <SevenDays>
        {weatherData &&
          weatherData.daily.slice(0, -1).map((day, key) => {
            return (
              <Day key={key}>
                <p>icon here</p>
                <p>{day.temp.max}</p>
                <p>{day.dt}</p>
              </Day>
            );
          })}
      </SevenDays>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 70%;
  background-image: url(${(props) => props.image}),
    linear-gradient(#eb01a5, #d13531); /* W3C */
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
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 70vh;
    background-color: pink;
  }
`;

const ChooseCity = styled.div`
  height: 100%;
`;

const SevenDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: white;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 0.15px solid white;
  backdrop-filter: blur(14px);
  background-color: rgba(255, 255, 255, 0.2);
`;

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0.25rem 0.5rem;
  border-radious: 25%;
  position: absolute;
  top: 0;
  right: ${(props) => props.right};
`;

export default Main;
