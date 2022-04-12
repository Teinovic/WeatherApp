import React, { useState, useEffect } from "react";
import { fetchFunction } from "../util/fetchFunction";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Image from "../download.jpeg";
import { BsSun } from "react-icons/bs";
import ReactCountryFlag from "react-country-flag"



const Main = () => {
  const [apiData, setApiData] = useState();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchFunction("https://swapi.dev/api/people/1", setApiData);
  }, []);

  //console.log(apiData);

  return (
    <MainWrapper image={Image}>
      <ChooseCity>
        <p>{t("MainPart")}</p>
        <select name="cities" id="city">
          <option value="Paris">Paris</option>
          <option value="Rome">Rome</option>
          <option value="London">London</option>
          <option value="Moscow">Moscow</option>
        </select>
        <Button right="0;" onClick={() => changeLanguage("en")}>
        <ReactCountryFlag countryCode="US" />
        </Button>
        <Button right="2rem;" onClick={() => changeLanguage("sr")}>
        <ReactCountryFlag countryCode="RS" />
        </Button>
      </ChooseCity>
      <SevenDays>
        <Day>
          <BsSun/>
          <p>29*</p>
          <p>FRI</p>
        </Day>
        <Day>
          <BsSun/>
          <p>29*</p>
          <p>FRI</p>
        </Day>
        <Day>
          <BsSun/>
          <p>29*</p>
          <p>FRI</p>
        </Day>
        <Day>
          <BsSun/>
          <p>29*</p>
          <p>FRI</p>
        </Day>
        <Day>
          <BsSun/>
          <p>29*</p>
          <p>FRI</p>
        </Day>
        <Day>
          <BsSun/>
          <p>29*</p>
          <p>FRI</p>
        </Day>
        <Day>
          <BsSun/>
          <p>29*</p>
          <p>FRI</p>
        </Day>
      </SevenDays>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 70%;
  background-image: url(${(props) => props.image}),
    linear-gradient(#eb01a5, #d13531); /* W3C */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  display: grid;
  grid-template-rows: 1fr 40%;

  @media (max-width: 767px) {
    width: 100%;
    height: 100vh;
    background-color: green;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 70vh;
    background-color: pink;
  }
`;

const ChooseCity = styled.div`
  height: 100%;
`;

const SevenDays = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
color: white;
`

const Day =styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
border: 0.15px solid white;
backdrop-filter: blur(14px);
background-color: rgba(255, 255, 255, 0.2);`

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0.25rem 0.5rem;
  border-radious: 25%;
  position: absolute;
  top: 0;
  right: ${(props) => props.right};
  background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
`;

export default Main;
