import React from "react";
import styled from "styled-components";
import { FaRedoAlt } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { useTranslation } from "react-i18next";



const DayWeather = () => {

  const {t} = useTranslation();

  return (
    <DayWrapper>
      <DayInfo>
        <Temperature>
          <p>32'</p>
          <p>{t("Description")}</p>
        </Temperature>
        <BsSun/>
      </DayInfo>
      <RefreshContainer>
        <RefreshButton><FaRedoAlt/></RefreshButton>
        <UpdatedInfo>{t("Updated")}</UpdatedInfo>
      </RefreshContainer>
    </DayWrapper>
  );
};

const DayWrapper = styled.div`
  height: 60vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 3rem;
  background-color: green;

  @media (max-width: 767px) {
    width: 100%;
    height: 50vh;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 50%;
    height: 30vh;
  }
`;

const DayInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Temperature = styled.div`
  display:flex;
  flex-direction: column;
`;

const RefreshContainer = styled.div`
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const RefreshButton = styled.button`
  cursor: pointer;
  padding: 0.25rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: black;
  border-radius: 25%;
  outline: none;
  border: none;
`;

const UpdatedInfo = styled.h5`
  font-size: 1rem;
  color:white;
  letter-spacing: 0.2;
  margin: 0;
`

export default DayWeather;
