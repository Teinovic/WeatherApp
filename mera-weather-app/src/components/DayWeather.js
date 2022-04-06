import React from "react";
import { Container } from "./styles/Container.styled.js";
import { useTranslation } from "react-i18next";

const DayWeather = () => {
  const { t } = useTranslation();

  return (
    <Container
      compW="30%"
      tabletW="50%"
      mobW="100%"
      compH="50vh"
      tabletH="30vh"
      mobH="50vh"
    >
      {t("DayWeather")}
    </Container>
  );
};

export default DayWeather;
