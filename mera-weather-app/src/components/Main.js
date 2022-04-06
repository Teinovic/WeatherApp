import React, { useState, useEffect } from "react";
import { MainWrapper } from "./styles/MainWrapper.styled";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import useHttp from "../hooks/use-http";

const Main = () => {
  const { t } = useTranslation();
  const [cityData, setCityData] = useState("");
  const { sendRequest } = useHttp();

  //destructuring cities api data
  const { _links: { "ua:item": cities } = {} } = cityData;

  useEffect(() => {
    sendRequest(
      { url: "https://api.teleport.org/api/urban_areas/" },
      setCityData
    );
  }, []);

  console.log(cityData);
  console.log(cities);

  return (
    <MainWrapper>
      <p>
        {t("MainPart")} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quam eaque architecto quibusdam suscipit magnam. Asperiores amet
        quibusdam doloribus! Ratione, quia.
      </p>
      <button onClick={() => changeLanguage("en")}>en</button>
      <button onClick={() => changeLanguage("sr")}>sr</button>
      {cityData &&
        cities.map((city, key) => {
          return <p key={key}>{city.name}</p>;
        })}
    </MainWrapper>
  );
};

export default Main;
