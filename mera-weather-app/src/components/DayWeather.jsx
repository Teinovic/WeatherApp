import React,{useState} from "react";
import styled,{keyframes} from 'styled-components';
import { FaRedoAlt } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


const DayWeather = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  // for temperature
  const weather = useSelector((state)=> state.weather.slice(-1));


  // function for button update and animation rotate
  const updateState = () => {
    setInterval(() => {
      if (!active) setActive(true);
    }, 200);

    clearInterval(setInterval);

    setActive(false);
  };
  
  return (
    <DayWrapper>
      <DayInfo>
        <Temperature>
          {/* round number for temp  */}
          <h4>{Math.round(weather[0].current.temp)}&#176;</h4>
          <p>{t("Description")}</p>
        </Temperature>
        <AnimationDiv>
        <BsSun size={80} />
        </AnimationDiv>
      </DayInfo>
      <RefreshContainer>
      <RefreshButton active={active} onClick={updateState}>
          <FaRedoAlt />
        </RefreshButton>
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
  grid-template-rows: 1fr 25%;
  background: linear-gradient(
    225deg,
    rgba(75, 142, 152, 1) 20%,
    rgba(77, 148, 162, 1) 35%,
    rgba(46, 142, 153, 1) 45%,
    rgba(39, 127, 133, 1) 55%,
    rgba(35, 118, 127, 1) 65%,
    rgba(32, 102, 119, 1) 75%,
    rgba(26, 101, 103, 1) 85%
  );
  color: white;
  margin-bottom: 1rem;

  @media (max-width: 767px) {
    width: 100%;
    height: 50vh;
    margin-bottom: 0rem;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    max-height: 100%;
    margin: 1rem 0.5rem 0 0;

  }
`;

const DayInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 3rem 2rem 0rem 2rem;
`;

const Temperature = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  h4 {
    font-size: 4rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimationDiv = styled.div`
  animation: ${rotate} infinite 20s linear;
`;

const RefreshContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0rem 0rem 1rem 2rem;
`;
const RefreshButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  color: white;
  background-color: transparent;
  animation-duration: 0.2s;
  animation-name: ${props => (props.active ? rotate : "")};
  outline: none;
  border: none;
  margin-right: 1rem;
`;

const UpdatedInfo = styled.span`
  font-size: 1rem;
  font-weight: 300;
  color: white;
  letter-spacing: 0.2;
  margin: 0;
`;

export default DayWeather;
