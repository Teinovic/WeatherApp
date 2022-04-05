import React, { Suspense } from "react";
import { Container } from "./styles/Container.styled.js";
import { useTranslation } from "react-i18next";

const DetailWeather = () => {
  const { t, i18n } = useTranslation();

  return (
    <Suspense>
      <Container
        compW="30%"
        tabletW="50%"
        mobW="100%"
        compH="50vh"
        tabletH="30vh"
        mobH="50vh"
      >
        {t("WeatherDetails")}
      </Container>
    </Suspense>
  );
};

export default DetailWeather;
