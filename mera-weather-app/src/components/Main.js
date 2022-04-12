import React, { useState, useEffect } from "react";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Image from "../download.jpeg";
import useHttp from "../hooks/use-http";
import ReactCountryFlag from "react-country-flag";
import { DayComponent } from "./Day";
import { getWeekday } from "../utils/getWeekday";

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

  // console.log(currentCityImageData.photos[0].image.mobile);
  console.log(weatherData, "WEATHER DATA");

  // from currentCityApiData
  const backgroundImage =
    currentCityImageData && currentCityImageData.photos[0].image.mobile;

  if (weatherData) console.log(weatherData.daily.slice(0, -1), "PRIKAZI");

  return (
    <MainWrapper image={backgroundImage ? backgroundImage : Image}>
      <ChooseCity>
        <ChooseCityDropdown
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
          <option value="Cities" hidden>
            Cities
          </option>
          {citiesData &&
            cities.map((city, key) => {
              return (
                <DropdownOption key={key} value={city.name}>
                  {city.name}
                </DropdownOption>
              );
            })}
        </ChooseCityDropdown>
        <Button right="0;" onClick={() => changeLanguage("en")}>
          <ReactCountryFlag countryCode="GB" />
        </Button>
        <Button right="2rem;" onClick={() => changeLanguage("sr")}>
          <ReactCountryFlag countryCode="RS" />
        </Button>
      </ChooseCity>
      <SevenDays>
        {weatherData &&
          weatherData.daily.slice(0, -1).map((day, key) => {
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
        {weatherData &&
          weatherData.daily.slice(0, -1).map((day, key) => {
            const date = new Date(day.dt * 1000);
            const weekdayNum = date.getDay();

            return <DayName>{getWeekday(weekdayNum)}</DayName>;
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

const ChooseCity = styled.div`
  height: 30%;
  width: 25%;
  padding-left: 2rem;
  padding-top: 2rem;
  p {
    font-size: 2.5rem;
    margin-left: 1rem;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const ChooseCityDropdown = styled.select`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  font-size: 2.3rem;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
`;

const DropdownOption = styled.option`
  color: black;
  background: white;
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 0px 2px 1px;
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

export default Main;
