import React, { useState, useEffect } from "react";
import styled from "styled-components";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [click, setClick] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", mMove);
      document.addEventListener("mouseenter", mEnter);
      document.addEventListener("mouseleave", mLeave);
      document.addEventListener("mousedown", mDown);
      document.addEventListener("mouseup", mUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mouseenter", mEnter);
      document.removeEventListener("mouseleave", mLeave);
      document.removeEventListener("mousedown", mDown);
      document.removeEventListener("mouseup", mUp);
    };

    const mDown = () => {
      setClick(true);
    };

    const mUp = () => {
      setClick(false);
    };

    const mMove = (el) => {
      setPosition({ x: el.clientX, y: el.clientY });
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mEnter = () => {
      setHidden(false);
    };

    const addLinkEvents = () => {
      document.querySelectorAll("a").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHover(true));
        el.addEventListener("mouseout", () => setLinkHover(false));
      });
      document.querySelectorAll("button").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHover(true));
        el.addEventListener("mouseout", () => setLinkHover(false));
      });
    };

    addEventListeners();
    addLinkEvents();
    return () => removeEventListeners();
  }, []);

  return (
    <CursorDiv
      left={`${position.x}px`}
      top={`${position.y}px`}
      hidden={hidden}
      clicked={click}
      linkHovered={linkHover}
    />
  );
}

const CursorDiv = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #121212;
  border-radius: 100%;
  position: fixed;
  transform: translate(-50%, -50%);
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  transition: all 100ms ease;
  transition-property: opacity, background-color, transform;
  ${(props) =>
    props.click &&
    `transform: translate(-50%, -50%) scale(0.5); background-color: #121212;`}
  ${(props) =>
    props.linkHovered && `transform: translate(-50%, -50%) scale(1.25);`}
`;
