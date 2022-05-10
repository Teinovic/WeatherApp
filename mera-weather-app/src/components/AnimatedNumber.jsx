import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import "./numSlide.css";

export const AnimatedNumber = ({ temp, number, idx }) => {
  return (
    <SwitchTransition>
      <CSSTransition
        key={number}
        classNames="fade1"
        mode="in-out"
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        timeout={500}
      >
        <Num>{temp[idx]}</Num>
      </CSSTransition>
    </SwitchTransition>
  );
};

const Num = styled.h4`
  position: relative;
  z-index: 1;
`;
