import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaRedoAlt } from "react-icons/fa";
import { WeatherIcon } from "../utils/getWeatherIcon";
import { useSelector } from "react-redux";
//redux
import { useDispatch } from "react-redux";
import { weatherAdded } from "../store2/weatherSlice";
import { time_ago } from "../hooks/time";
import { IconContext } from "react-icons/lib";
// animations ...
import { Wave, Wave2, Wave7 } from "../waves/Wave";
// English.
import { useTranslation } from "react-i18next";

import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./numSlide.css";
import { AnimatedNumber } from "./AnimatedNumber";
//for app name
import { AppName, Circle, CircleThree, CircleTwo } from "./styled/AppName";

const DayWeather = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState("Update");
  const [temp, setTemp] = useState("");
  // for temperature form REDUX
  const weatherData = useSelector((state) => state.weather);

  const { lat, lon } = weatherData;
  const dispatch = useDispatch();
  // for fetching on click update btn
  const API_KEY = process.env.REACT_APP_API_KEY;
  // for fetching
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let resultFetching = null;
  // for update btn
  let timeInterval = null;
  let interval = null;

  // function for REDUX  ...
  const showWeather = (result) => {
    dispatch(weatherAdded(result));
  };

  //useEffect for clearing interval  and setInt every (now 3 sec but should be 1min ... later)
  useEffect(() => {
    setClicked("Updated seconds ago");
    //if (active) {
    interval = 1;
    //set interval for a minute ago with export function time_ago ...
    timeInterval = setInterval(() => {
      let minutica = 60 * 1000 * interval;

      setClicked(`Updated ${time_ago(new Date(Date.now() - minutica))}`);
      interval++;
      if (interval === 11) {
        updateState();
        clearInterval(timeInterval);
        setClicked("Update");
      }
    }, 60000);
    //}

    return () => {
      clearInterval(timeInterval);
    };
  }, [active, weatherData]);

  // FUNCTION for button update and animation rotate
  const updateState = () => {
    // chenge the p when you click on btn
    setClicked("Updated seconds ago");
    // FOR BUTTON ANIMATION
    setInterval(() => {
      if (!active) setActive(true);
    }, 200);

    //FOR FETCHING THE DATA
    //fetch data again for this citi ... with lat and lon from redux
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setData(result);

          console.log("UPDATED result", result);

          resultFetching = result;
          console.log("Updated result !!!", result);
          setLoading(false);
          showWeather(result);
        },
        (error) => {
          setError(error);
          console.error("Error Fetching the Data", error);
        }
      );

    setActive(false);
  };

  useEffect(() => {
    if (weatherData) {
      if (Math.round(weatherData.current.temp).toString().split("").length > 1)
        setTemp(Math.round(weatherData.current.temp).toString().split(""));
      else {
        const adjustedArray = Math.round(weatherData.current.temp)
          .toString()
          .split("");
        adjustedArray.unshift("I");
        setTemp(adjustedArray);
      }
    }
  }, [weatherData]);

  return (
    <DayWrapper>
      <AppName>
        <Circle />
        <CircleTwo />
        <CircleThree />
        M&amp;O WeatherApp
      </AppName>
      <DayInfo>
        <Temperature>
          <div>
            <NumsFlex>
              {temp &&
                temp.map((number, idx) => (
                  <AnimatedNumber temp={temp} number={number} idx={idx} />
                ))}

              <DegreesSymbol>&#176;</DegreesSymbol>
            </NumsFlex>
          </div>

          <p>{t(weatherData?.current?.weather[0].main)}</p>
        </Temperature>

        <IconDiv>
          <WeatherIcon typeOfWeather={weatherData?.current?.weather[0].main} size={window.innerHeight > 450 ? (window.innerWidth > 767 ? 75 : 50) : 35} />
        </IconDiv>
      </DayInfo>
      <RefreshContainer>
        <RefreshButton active={active} onClick={updateState}>
          <FaRedoAlt />
        </RefreshButton>
        <UpdatedInfo>{t(`${clicked}`)}</UpdatedInfo>
        <WaveDiv>
          <Wave />
          {/* <Wave4/> */}
          {/* <Wave5/> */}
          {/* <Wave6/> */}
        </WaveDiv>
        <WaveDivTwo>
          {/* <Wave2 /> */}
          <Wave7 />
        </WaveDivTwo>
      </RefreshContainer>
    </DayWrapper>
  );
};

const DayWrapper = styled.div`
  position: relative;
  height: 60vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 25%;
  background: linear-gradient(
    225deg,
    rgba(75, 142, 152, 1) 20%,
    rgba(77, 148, 162, 1) 35%,
    rgba(46, 142, 153, 1) 45%,
    rgba(39, 127, 133, 1) 55%,
    rgba(35, 118, 127, 1) 65%,
    rgba(32, 102, 119, 1) 75%,
    rgba(26, 101, 103, 1) 85%
  );
  color: white;
  margin-bottom: 1rem;

  @media (max-width: 767px) {
    width: 90%;
    height: 45vh;
    margin-bottom: 0rem;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    height: 40vh;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    grid-template-rows: 80% 20%;
    width: 50%;
    height: 30vh;
    margin: 0rem 1rem 0rem 0rem;
  }
`;

const DayInfo = styled.div`
  display: flex;

  align-items: flex-start;
  justify-content: space-between;
  padding: 3rem 2rem 0rem 2rem;

  canvas {
    z-index: 1000;
  }

  @media (max-width: 767px) {
    padding: 2rem 2rem 0rem 2rem;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    padding: 2rem 1rem 0rem 1rem;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    canvas {
      font-size: 1.3rem;
    }
  }
`;

const Temperature = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  z-index: 100;

  h4 {
    font-size: 4rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    p {
      font-size: 1rem;
    }
  }

  transition: span 0.5s ease-in-out;
`;

const IconDiv = styled.div`
  object-fit: contain;
  z-index: 999;

  // @media (max-width: 767px) {
    
  //   canvas {
  //     width: 3.5rem;
  //     height: 3.5rem;
  //   }
  // }


  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    canvas {
      width: 2.5rem;
      height: 2.5rem;
    }
    
  }
`;

const NumsFlex = styled.div`
  display: flex;
  z-index: 0;

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    h4 {
      font-size: 1.3rem;
    }
  }
  overflow: hidden;
`;

const DegreesSymbol = styled.h4`
  position: absolute;
  left: 6.5rem;

  @media (max-width: 767px) {
    left: 6.7rem;
   }

  @media (min-width: 768px) and (max-width: 1100px) {
    left: 5.8rem;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    left: 2.5rem;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RefreshContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0rem 0rem 1rem 2rem;

  @media (min-width: 768px) and (max-width: 1100px) {
    padding: 0.4rem;
  }
`;
const RefreshButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  color: white;
  background-color: transparent;
  animation-duration: 0.2s;
  animation-name: ${(props) => (props.active ? rotate : "")};
  outline: none;
  border: none;
  margin-right: 1rem;
  z-index: 100;

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    font-size: 0.8rem;
  }
`;

const waveAnimation = keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  
  100% {
    stroke-dashoffset: -10000;
  }
`;

const WaveDiv = styled.div`
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  z-index: 20;
  opacity: 0.55;

  .animation {
    animation-name: ${waveAnimation};
    animation-duration: 7s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    bottom: -6px;
  }
`;

const WaveDivTwo = styled.div`
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  z-index: 10;
  opacity: 0.5;

  @media (min-width: 768px) and (max-width: 1100px) {
    bottom: -4px;
  }
`;

const UpdatedInfo = styled.span`
  font-size: 1rem;
  font-weight: 300;
  color: white;
  letter-spacing: 0.2;
  margin: 0;
  z-index: 100;

  @media only screen and (min-device-width: 360px) and (max-device-width: 950px) and (orientation: landscape) {
    font-size: 0.8rem;
  }
`;

export default DayWeather;
