import React from "react";
import {
  WiThunderstorm,
  WiRain,
  WiSnow,
  WiDaySunny,
  WiCloud,
  WiDayHaze,
  WiFog,
} from "react-icons/wi";


export function WeatherIcon({ typeOfWeather }) {
  switch (typeOfWeather) {
    case "Thunderstorm":
      return <WiThunderstorm />;
    case "Drizzle":
      return <WiRain />;
    case "Rain":
      return <WiRain />;
    case "Snow":
      return <WiSnow />;
    case "Clear":
      return <WiDaySunny />;
    case "Clouds":
      return <WiCloud />;
      case "Haze":
        return <WiDayHaze/>;
      case "Fog":
        return <WiFog/>;
        case "Mist":
          return <WiFog/>;
    default:
      return <p>no img found</p>;
  }
}
