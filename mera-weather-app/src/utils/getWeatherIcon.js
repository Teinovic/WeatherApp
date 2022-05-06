import React from "react";
import {WiThunderstorm} from "react-icons/wi";
import { Drizzle,Rain,Snow,Wind,Clear,Clouds,Haze,Fog } from "../icons/icons";

export function WeatherIcon({ typeOfWeather }) {
  switch (typeOfWeather) {
    case "Thunderstorm":
      return <WiThunderstorm />;
    case "Drizzle":
      return <Drizzle />;
    case "Rain":
      return <Rain />;
    case "Snow":
      return <Snow />;
    case "Clear":
      return <Clear />;
    case "Clouds":
      return <Clouds />;
      case "Haze":
        return <Haze/>;
      case "Fog":
        return <Fog/>;
        case "Mist":
          return <Fog/>;
      case "Dust":
        return <Wind/>
      case "Smoke":
        return <Fog/>
    default:
      return <p>no img found</p>;
  }
}
