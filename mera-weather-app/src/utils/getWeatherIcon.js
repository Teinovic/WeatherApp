import React from "react";
import {
  WiThunderstorm,
  WiRain,
  WiSnow,
  WiDaySunny,
  WiCloud,
} from "react-icons/wi";

export function WeatherIcon({ typeOfWeather }) {
  switch (typeOfWeather) {
    case "Thunderstorm":
      return <WiThunderstorm />;
    case "Drizzle":
      return "https://openweathermap.org/img/wn/09d.png";
    case "Rain":
      return <WiRain />;
    case "Snow":
      return <WiSnow />;
    case "Clear":
      return <WiDaySunny />;
    case "Clouds":
      return <WiCloud />;
    default:
      return <p>no img found</p>;
  }
}
