import React from "react";
import {WiThunderstorm} from "react-icons/wi";
import { Drizzle,Rain,Snow,Wind,Clear,Clouds,Haze,Fog } from "../icons/icons";

export function WeatherIcon({ typeOfWeather, size }) {
  switch (typeOfWeather) {
    case "Thunderstorm":
      return <WiThunderstorm size={size}/>;
    case "Drizzle":
      return <Drizzle size={size}/>;
    case "Rain":
      return <Rain size={size}/>;
    case "Snow":
      return <Snow size={size}/>;
    case "Clear":
      return <Clear size={size}/>;
    case "Clouds":
      return <Clouds size={size}/>;
      case "Haze":
        return <Haze size={size}/>;
      case "Fog":
        return <Fog size={size}/>;
        case "Mist":
          return <Fog size={size}/>;
      case "Dust":
        return <Wind size={size}/>
      case "Smoke":
        return <Fog size={size}/>
    default:
      return <p>no img found</p>;
  }
}
