import React, { Suspense } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const DetailWeather = () => {
  const { t } = useTranslation();

  return (
    <Suspense>
      <DetailWrapper>
        <Humidity>
          <h3>87%</h3>
          <h4>{t("Humidity")}</h4>
        </Humidity>
        <AirPollution>
          <h3>25&#176;</h3>
          <h4>{t("Air Pollution")}</h4>
        </AirPollution>
        <UvIndex>
          <h3>0/10</h3>
          <h4>{t("UV Index")}</h4>
        </UvIndex>
        <Visibility>
          <h3>3.0km</h3>
          <h4>{t("Pressure")}</h4>
        </Visibility>
      </DetailWrapper>
    </Suspense>
  );
};

const DetailWrapper = styled.div`
  // width: 30%;
  height: 40vh;
  width: 100%;
  // height:100%;
  background: linear-gradient(
    225deg,
    rgba(87, 152, 136, 1) 14%,
    rgba(74, 167, 135, 1) 30%,
    rgba(68, 153, 124, 1) 45%,
    rgba(51, 140, 105, 1) 60%,
    rgba(42, 126, 91, 1) 75%,
    rgba(35, 118, 84, 1) 89%
  );
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  background-color: orange;

  h3 {
    padding: 0;
    margin: 0;
    font-weight: 600;
    font-size: 1.7rem;
  }

  h4 {
    padding: 0;
    margin: 0;
    font-weight: 300;
    font-size: 1rem;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 50vh;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    width: 50%;
    height: 30vh;
  }
`;

const Humidity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.2rem 0.5rem 0.2rem 0.2rem;
  text-align: center;
`;

const AirPollution = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.2rem 0.5rem 0.2rem 0.2rem;
  text-align: center;
`;

const UvIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.2rem 0.5rem 0.2rem 0.2rem;
  text-align: center;
`;

const Visibility = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.2rem 0.5rem 0.2rem 0.2rem;
  text-align: center;
`;

export default DetailWeather;
