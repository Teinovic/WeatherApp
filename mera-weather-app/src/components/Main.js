import React, { useState, useEffect } from "react";
import { MainWrapper } from "./styles/MainWrapper.styled";
import { fetchFunction } from "../util/fetchFunction";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

const Main = () => {
  const [apiData, setApiData] = useState();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchFunction("https://swapi.dev/api/people/1", setApiData);
  }, []);

  console.log(apiData);

  return (
    <MainWrapper>
      <p>
        {t("MainPart")} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quam eaque architecto quibusdam suscipit magnam. Asperiores amet
        quibusdam doloribus! Ratione, quia.
      </p>
      <button onClick={() => changeLanguage("en")}>en</button>
      <button onClick={() => changeLanguage("sr")}>sr</button>
    </MainWrapper>
  );
};

export default Main;
