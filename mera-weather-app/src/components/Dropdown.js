import React, { useState } from "react";
import styled from "styled-components";

export function Dropdown({ citiesData, pullSelectedCity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { _links: { "ua:item": cities } = {} } = citiesData;

  if (selectedOption) pullSelectedCity(selectedOption);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        {selectedOption || "Cities"}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            <ButtonUp></ButtonUp>
            {citiesData &&
              cities.slice(0, 10).map((city) => {
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
            <ButtonDown></ButtonDown>
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ButtonUp = styled.button``;

const ButtonDown = styled.button``;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;
