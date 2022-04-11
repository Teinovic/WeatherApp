export function getWeatherIcon(weather) {
  switch (weather) {
    case "Thunderstorm":
      return "https://openweathermap.org/img/wn/11d.png";
    case "Drizzle":
      return "https://openweathermap.org/img/wn/09d.png";
    case "Rain":
      return "https://openweathermap.org/img/wn/10d.png";
    case "Snow":
      return "https://openweathermap.org/img/wn/13d.png";
    case "Clear":
      return "https://openweathermap.org/img/wn/01d.png";
    case "Clouds":
      return "https://openweathermap.org/img/wn/04d.png";
    default:
      break;
  }
}
