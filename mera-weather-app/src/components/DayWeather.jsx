import React, { useState,useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaRedoAlt } from "react-icons/fa";
import { WeatherIcon } from "../utils/getWeatherIcon";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// English.
//redux
import { useDispatch } from "react-redux";
import { weatherAdded } from "../store2/weatherSlice";
import { time_ago } from "../hooks/time";
import { IconContext } from "react-icons/lib";


const DayWeather = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState("Click the button");
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
  //useEffect for clearing interval  and setInt every (now 3 sec but should be 1min ... later)
  useEffect(() => {
    console.log('interval u useEffect', interval)
    if (active) {
    interval = 1;
    //set interval for a minute ago with export function time_ago ...
    timeInterval = setInterval(() => {
      console.log('interval u timu', interval)

      let minutica = 60 * 1000 * interval;
      
      console.log(time_ago(new Date(Date.now() - minutica)));
      setClicked(`Updated ${time_ago(new Date(Date.now() - minutica))}`);
      interval++;
      if (interval === 7) {
        clearInterval(timeInterval);
        setClicked("Click the button");
      }
    }, 3000);
  }

    return (() => {
      clearInterval(timeInterval)
  })
  }, [active]);
  
  // FUNCTION for button update and animation rotate
  const updateState = () => {
    // chenge the p when you click on btn
    setClicked("Updated a few seconds");
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
          resultFetching = result;
          setLoading(false);
          showWeather();
        },
        (error) => {
          setError(error);
          console.error("Error Fetching the Data", error);
        }
      );
    // function for REDUX  ...
    const showWeather = () => {
      dispatch(weatherAdded(resultFetching));
    };
    setActive(false);
  };

  return (
    <DayWrapper>
      <DayInfo>
        <Temperature>
          {/* round number for temp  */}
          <h4>{Math.round(weatherData.current.temp)}&#176;</h4>
          <p>{t(weatherData?.current?.weather[0].main)}</p>
          {/* <p>{t("Description")}</p> */}
        </Temperature>
        {/* <MyIcon
          src={getWeatherIcon(weatherData?.current?.weather[0].main)}
          alt={weatherData?.current.weather[0].main}
        /> */}
       <IconContext.Provider value={{ size: 80 }}>
          <WeatherIcon typeOfWeather={weatherData?.current?.weather[0].main} />
        </IconContext.Provider>
      </DayInfo>
      <RefreshContainer>
        <RefreshButton active={active} onClick={updateState}>
          <FaRedoAlt />
        </RefreshButton>
        {/* <UpdatedInfo>{t("Updated")}</UpdatedInfo> */}
        <UpdatedInfo>{`${clicked}`}</UpdatedInfo>
      </RefreshContainer>
    </DayWrapper>
  );
};

const DayWrapper = styled.div`
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
    width: 100%;
    height: 50vh;
    margin-bottom: 0rem;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    width: 50%;
    height: 30vh;
    margin: 0.5rem;
  }
`;

const DayInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 3rem 2rem 0rem 2rem;
`;

const Temperature = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  h4 {
    font-size: 4rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
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

const AnimationDiv = styled.div`
  animation: ${rotate} infinite 20s linear;
`;
// const MyIcon = styled.img`
//   width: 6rem;
// `;

// MyIcon.defaultProps = {
//   src: "01d.png",
//   alt: "weather",
// };

const MyIcon = styled.div`
  width: 6rem;
`

const RefreshContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0rem 0rem 1rem 2rem;
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
`;

const UpdatedInfo = styled.span`
  font-size: 1rem;
  font-weight: 300;
  color: white;
  letter-spacing: 0.2;
  margin: 0;
`;

export default DayWeather;
