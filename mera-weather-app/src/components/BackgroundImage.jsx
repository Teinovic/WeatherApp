import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { DotWave } from "@uiball/loaders";
import "./bgimg.css";
import Image from "../download.jpeg";

export const BackgroundImage = ({ imageLocation, getRequestPending }) => {
  const [moreThanOneSecGetReq, setMoreThanOneSecGetReq] = useState(false);

  useEffect(() => {
    let oneSecDelay;
    if (getRequestPending) {
      oneSecDelay = setTimeout(() => {
        setMoreThanOneSecGetReq(true);
      }, 1000);
    } else {
      clearTimeout(oneSecDelay);
      setMoreThanOneSecGetReq(false);
    }
    return () => {
      clearTimeout(oneSecDelay);
    };
  }, [getRequestPending]);

  return (
    <>
      <SwitchTransition mode="in-out">
        <CSSTransition key={imageLocation} timeout={1000} classNames="fade">
          <BackgroundImageDiv img={imageLocation} />
        </CSSTransition>
      </SwitchTransition>
      <SwitchTransition>
        <CSSTransition
          key={moreThanOneSecGetReq}
          classNames="fade"
          timeout={1000}
        >
          <>
            {moreThanOneSecGetReq && (
              <Wrapper>
                <DotWave size={47} speed={1} color="white" />
              </Wrapper>
            )}
          </>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

const BackgroundImageDiv = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  background: url(${(props) => props.img || Image});
  background-position: bottom;
  background-size: cover;
  filter: brightness(1.1) saturate(1.1) contrast(1.1);
`;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.section`
  .fade-enter {
    opacity: 0;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-enter-active {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-exit-active {
    transition: opacity 500ms;
  }
`;
