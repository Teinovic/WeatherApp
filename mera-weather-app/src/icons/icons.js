import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  icon: "CLEAR_DAY",
  color: "white",
  size: window.innerWidth > 900 ? 70 : 30,
  animate: true,
};
const icons = {
  CLEAR: "CLEAR_DAY",
  CLEAR_NIGHT: "CLEAR_NIGHT",
  CLOUDY_DAY: "PARTLY_CLOUDY_DAY",
  CLOUDY_NIGHT: "PARTLY_CLOUDY_NIGHT",
  CLOUDY: "CLOUDY",
  RAINY: "RAIN",
  SLEET: "SLEET",
  SNOW: "SNOW",
  WIND: "WIND",
  FOG: "FOG",
  MIST: "FOG",
};

// const ThunderAnimation = keyframes`
//     0% {
//       transform: translateY(-25px) translateX(25px) scaleY(0.95);
//       opacity: 0;
//     }
//     5%, 25% {
//       opacity: 1;
//     }
//     15%, 20% {
//       opacity: 0;
//     }
//     50% {
//       transform: translateY(8px) translateX(-10px);
//       opacity: 1;
//     }
//     80% {
//       transform: translateY(8px) translateX(-10px);
//       opacity: 0;
//     }
//     100% {
//       transform: translateY(-25px) translateX(25px) scaleY(0.95);
//       opacity: 0;
//     }
// `



// export const Thunderstorm = () => {
//     return (
//     <svg style={{animation: `${ThunderAnimation} 2s infinite;`}} class="thunder-cloud" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//     <path d="M400,64c-5.3,0-10.6,0.4-15.8,1.1C354.3,24.4,307.2,0,256,0s-98.3,24.4-128.2,65.1c-5.2-0.8-10.5-1.1-15.8-1.1
// 		C50.2,64,0,114.2,0,176s50.2,112,112,112c13.7,0,27.1-2.5,39.7-7.3c12.3,10.7,26.2,19,40.9,25.4l24.9-24.9
// 		c-23.5-7.6-44.2-21.3-59.6-39.9c-13,9.2-28.8,14.7-45.9,14.7c-44.2,0-80-35.8-80-80s35.8-80,80-80c10.8,0,21.1,2.2,30.4,6.1
// 		C163.7,60.7,206.3,32,256,32s92.3,28.7,113.5,70.1c9.4-3.9,19.7-6.1,30.5-6.1c44.2,0,80,35.8,80,80s-35.8,80-80,80
// 		c-17.1,0-32.9-5.5-45.9-14.7c-10.4,12.5-23.3,22.7-37.6,30.6L303,312.2c20.9-6.6,40.5-16.9,57.3-31.6c12.6,4.8,26,7.3,39.7,7.3
// 		c61.8,0,112-50.2,112-112S461.8,64,400,64z" />
//     <polygon class="bolt" points="192,352 224,384 192,480 288,384 256,352 288,256 " />
//   </svg>
//     )
// };



// export const Thunder = styled.svg`
// color:white;
// width: 2rem;
// height: 2rem;
// margin: 0px;
// fill: #fff;
// animation: ${ThunderAnimation} 2s infinite;
// `

export const Drizzle = (props)=> {
    return (
    <ReactAnimatedWeather
    icon={icons.SLEET}
    color={defaults.color}
    size={props.size}
    animate={defaults.animate}
  />
    )
};

export const Rain = (props)=> {
    return (
    <ReactAnimatedWeather
    icon={icons.RAINY}
    color={defaults.color}
    size={props.size}
    animate={defaults.animate}
  />
    )
};

export const Snow = (props)=> {
    return (
    <ReactAnimatedWeather
    icon={icons.SNOW}
    color={defaults.color}
    size={props.size}
    animate={defaults.animate}
  />
    )
};

export const Wind = (props) => {
  return (
    <ReactAnimatedWeather 
      icon={icons.WIND}
      color={defaults.color}
      size={props.size}
      animate={defaults.animate}
    />
  )
}

export const Clear = (props)=> {
   return (
    <ReactAnimatedWeather
    icon={icons.CLEAR}
    color={defaults.color}
    size={props.size}
    animate={defaults.animate}
  />
  )
};

export const Clouds = (props)=> {
    return (
    <ReactAnimatedWeather
    icon={icons.CLOUDY}
    color={defaults.color}
    size={props.size}
    animate={defaults.animate}
  />
    )
};

export const Haze = (props)=> {
    return (
    <ReactAnimatedWeather
    icon={icons.FOG}
    color={defaults.color}
    size={props.size}
    animate={defaults.animate}
  />
    )
};

export const Fog = (props)=> {
    return (
    <ReactAnimatedWeather
    icon={icons.FOG}
    color={defaults.color}
    size={props.size}
    animate={defaults.animate}
  />
  )
};

