import React, { useState, useEffect } from "react";
import { changeLanguage } from "i18next";
import styled from "styled-components";
import Image from "../download.jpeg";
import useHttp from "../hooks/use-http";

import { DayComponent } from "./Day";

import { useDispatch, useSelector } from "react-redux";
import { weatherAdded } from "../store2/weatherSlice";

import { NewDropdown } from "./NewDropdown";
import { BackgroundImage } from "./BackgroundImage";

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = process.env.REACT_APP_API_KEY;

export const Main = () => {
  const [citiesData, setCitiesData] = useState("");
  const [imgAndWeatherData, setImgAndWeatherData] = useState("");
  const [language, setLanguage] = useState("en");
  const { isLoading, error, sendRequest } = useHttp();
  // REEDUX define dispatch ... i import useDispathc for this and weatherActions for function showWeather
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather);
  console.log("imgAndWeatherData", imgAndWeatherData);

  //REDUX put weatherData in const
  let currentWeather = imgAndWeatherData?.weatherData || weatherData;

  // function for REDUX  ...
  const showWeather = () => {
    dispatch(weatherAdded(currentWeather));
  };

  // data sent from NewDropdown component to main
  const currentCityData = useSelector((state) => state.currentCity);

  // for localStorage and updating the weather for localStorage city ...
  // useEffect(() => {
  //   // function for REDUX  ...
  //   const showWeather = () => {
  //     dispatch(weatherAdded(resultFetching));
  //   };
  //   let resultFetching;

  //   const local = JSON.parse(localStorage.getItem("podaci"));
  //   //if there is no localStorage default city cor for Belgrade ... to show Belg weather
  //   if (!local) {
  //     const lat = 44.804;
  //     const lon = 20.4651;

  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then(
  //         (result) => {
  //           resultFetching = result;
  //           showWeather();
  //         },
  //         (error) => {
  //           console.error("Error Fetching the Data", error);
  //         }
  //       );
  //   } else {
  //     const lat = local.weatherData.lat;
  //     const lon = local.weatherData.lon;

  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then(
  //         (result) => {
  //           resultFetching = result;
  //           console.log("result", result);
  //           showWeather();
  //         },
  //         (error) => {
  //           console.error("Error Fetching the Data", error);
  //         }
  //       );

  //       setImgAndWeatherData(JSON.parse(localStorage.getItem("podaci")));

  //   }

  // }, []);

  // useEffect(() => {
  //   let resultFetching;
  //   const lat = JSON.parse(localStorage.getItem("lat"));
  //   const lon = JSON.parse(localStorage.getItem("lon"));
  //   console.log('lat,lon', lat,lon);
  //   // function for REDUX  ...
  //   const showWeather = () => {
  //     dispatch(weatherAdded(resultFetching));
  //   };
  //   if (lat && lon ) {
  //     fetch(
  //             `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
  //           )
  //              .then((res) => {
  //                return res.json();
  //              })
  //              .then(
  //                (result) => {
  //                  resultFetching = result;
  //                  console.log("result", result);
  //                  showWeather();
  //                },
  //                (error) => {
  //                  console.error("Error Fetching the Data", error);
  //                }
  //              );
  //   }

  // }, [])

  async function fetchCities() {
    const citiesResponse = await sendRequest({
      url: "https://api.teleport.org/api/urban_areas/",
    });
    setCitiesData(citiesResponse);
  }

  // fetching all the cities that have an image available for fetching
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

  // when imgAndWeather changes put that in localStorage
  useEffect(() => {
    //localStorage.setItem("podaci", JSON.stringify(imgAndWeatherData));
    //console.log('imgAndWeatherData', imgAndWeatherData.imgData.photos[0].image.mobile);
    //console.log("imgAndWeatherData",imgAndWeatherData.weatherData.lat);
    //console.log("imgAndWeatherData",imgAndWeatherData.weatherData.lon);
    let resultFetching;

    // function for REDUX  ...
    const showWeather = () => {
      dispatch(weatherAdded(resultFetching));
    };
    //OVO NE DIRAJ NIKAKO !!!!
    if (imgAndWeatherData) {
      localStorage.setItem(
        "slika",
        imgAndWeatherData.imgData.photos[0].image.mobile
      );
      localStorage.setItem("lat", imgAndWeatherData.weatherData.lat);
      localStorage.setItem("lon", imgAndWeatherData.weatherData.lon);
      showWeather();
    }

    if (localStorage.getItem("lat") && localStorage.getItem("lon")) {
      console.log("RADI!!!!");
      const lat = localStorage.getItem("lat");
      const lon = localStorage.getItem("lon");

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      )
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            resultFetching = result;
            console.log("result", result);
            showWeather();
          },
          (error) => {
            console.error("Error Fetching the Data", error);
          }
        );
    } else {
      const lat = 44.804;
      const lon = 20.4651;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      )
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            resultFetching = result;
            showWeather();
          },
          (error) => {
            console.error("Error Fetching the Data", error);
          }
        );
    }

    console.log("weatherData pre ucitavanja 7 dana !!!", weatherData);

    //showWeather();
    // izbrisao weatherData iz niza
  }, [imgAndWeatherData]);

  // from currentCityApiData
  const backgroundImage = imgAndWeatherData
    ? imgAndWeatherData.imgData.photos[0].image.mobile
    : localStorage.getItem("slika");

  if (error)
    return (
      <ErrorDiv>
        <h1 style={{ margin: "auto", width: "50%" }}>
          {error} Try to refresh the page.
        </h1>
      </ErrorDiv>
    );

  return (
    <MainWrapper>
      <BackgroundImage
        imageLocation={backgroundImage ? backgroundImage : Image}
        getResponsePending={isLoading}
      />
      <NewDropdown citiesData={citiesData} />
      <LanguageWrapper>
        <OptionEnglish
          onClick={() => {
            changeLanguage("en");
            setLanguage("en");
          }}
          style={{ fontSize: language === "en" && "1rem" }}
        >
          EN
        </OptionEnglish>
        <OptionSerbian
          onClick={() => {
            changeLanguage("sr");
            setLanguage("sr");
          }}
          style={{ fontSize: language === "sr" && "1rem" }}
        >
          SRB
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
  // background-image: url(${(props) => props.image});
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

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    height: 60vh;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    width: 100%;
    height: 70vh;
    background-color: pink;
  }
`;

const SevenDays = styled.div`
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: white;
  height: 30vh;
  grid-gap: 3px;

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    height: 7rem;
  }
`;

const LanguageWrapper = styled.div`
  z-index: 5;
  position: absolute;
  top: 1rem;
  right: 1rem;
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

const ErrorDiv = styled.div`
  background: linear-gradient(
    180deg,
    rgba(218, 238, 248, 1) 31%,
    rgba(220, 240, 243, 1) 38%,
    rgba(220, 240, 243, 1) 45%,
    rgba(222, 252, 235, 1) 54%
  );
`;
