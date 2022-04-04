import React from "react";
import { Container } from "./styles/Container.styled.js";

const dayWeather = () => {
  return (
    <Container
      compW="30%"
      tabletW="50%"
      mobW="100%"
      compH="50vh"
      tabletH="30vh"
      mobH="50vh"
    >
      Day Weather
    </Container>
  );
};

export default dayWeather;
