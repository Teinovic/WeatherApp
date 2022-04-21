import React, { useState } from "react";
import styled from "styled-components";
import {
  BiRightArrow,
  BiLeftArrow,
  BiDownArrow,
  BiUpArrow,
} from "react-icons/bi";

export function Dropdown({ citiesData, pullSelectedCity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sliceOfCities, setSliceOfCities] = useState([0, 9]);
  const { _links: { "ua:item": cities } = {} } = citiesData;

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  if (selectedOption) pullSelectedCity(selectedOption);

  const toggling = () => setIsOpen(!isOpen);

  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <DropDownContainer>
      <DropDownHeader>
        {selectedOption || "Cities"}
        <Button onClick={toggling}>
          {isOpen ? (
            <BiUpArrow
              style={{
                color: "white",
                fontSize: window.innerWidth > 767 ? "2rem" : "1.3rem",
              }}
            />
          ) : (
            <BiDownArrow
              style={{
                color: "white",
                fontSize: window.innerWidth > 767 ? "2rem" : "1.3rem",
              }}
            />
          )}
        </Button>
        <CurrentDate>{`${dd} ${toMonthName(mm)}`}</CurrentDate>
      </DropDownHeader>

      {isOpen && (
        <DropDownListContainer>
          <Button
            onClick={() => {
              if (sliceOfCities[0] > 0) {
                setSliceOfCities((prev) => [prev[0] - 3, prev[1] - 3]);
              }
            }}
          >
            <BiLeftArrow
              style={{
                color: sliceOfCities[0] > 0 ? "white" : "gray",
                fontSize: window.innerWidth > 767 ? "2rem" : "0.7rem",
              }}
            />
          </Button>
          <DropDownList>
            {citiesData &&
              cities.slice(sliceOfCities[0], sliceOfCities[1]).map((city) => {
                return (
                  <>
                    <ListItem
                      onClick={onOptionClicked(city.name)}
                      key={Math.random()}
                    >
                      {city.name}
                    </ListItem>
                  </>
                );
              })}
          </DropDownList>
          <Button
            onClick={() => {
              if (sliceOfCities[1] < cities.length) {
                setSliceOfCities((prev) => [prev[0] + 3, prev[1] + 3]);
              }
            }}
          >
            <BiRightArrow
              style={{
                color: sliceOfCities[1] < cities.length ? "white" : "gray",
                fontSize: window.innerWidth > 767 ? "2rem" : "0.7rem",
              }}
            />
          </Button>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

const DropDownContainer = styled("div")`
  background: transparent;
  width: 100%;

  height: 90%;
  max-height: 90%;
`;

const DropDownHeader = styled("div")`
  padding: 0.5rem 2rem 0.1rem 1.5rem;
  text-align: start;
  font-weight: 700;
  font-size: 3rem;
  color: white;
  background: transparent;
  text-transform: uppercase;
  backdrop-filter: blur(2px) brightness(0.8);

  @media (max-width: 767px) {
    font-size: 1.7rem;
    padding-top: 2rem;
  }
`;

const CurrentDate = styled.h3`
  color: lightgray;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 1.8rem;

  @media (max-width: 767px) {
    font-size: 1.3rem;
  }
`;

const DropDownListContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 0.1rem;
`;

const DropDownList = styled("ul")`
  background: transparent;
  box-sizing: border-box;
  list-style: none;
  color: white;
  font-size: 1.3rem;
  font-weight: 500;
  display: grid;
  padding-right: 3rem;
  grid-template-areas:
    "33vw 33vw 33vw"
    "33vw 33vw 33vw"
    "33vw 33vw 33vw";
  grid-gap: 1rem;
  backdrop-filter: blur(2px) brightness(0.8);

  @media (max-width: 767px) {
    font-size: 0.6rem;
    grid-template-areas:
      "1fr 1fr"
      "1fr 1fr";
    padding: 0;
  }
`;

const Button = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  backdrop-filter: blur(2px) brightness(0.8);
  margin: 1.5rem 0rem 1.5rem 0rem;
`;

const ListItem = styled("li")`
  list-style: none;

  text-transform: uppercase;
  font-weight: 700;
  color: white !important;
  cursor: pointer;
`;
