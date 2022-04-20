import React, { useState } from "react";
import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import { changeLanguage } from "i18next";
import { BiDownArrow } from "react-icons/bi";

const DropDownContainer = styled("div")`
  position: absolute;
  top: 0;
  right: 0.5rem;
  background: transparent;
`;

const DropDownHeader = styled("div")`
  font-weight: 500;
  font-size: 1rem;
  color: white;
  display: flex;
  align-items: center;
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
  font-size: 1rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

const options = ["Mangoes", "Apples", "Oranges"];

export function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    changeLanguage(selectedOption === "RS" ? "EN" : "RS");
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        <p>{selectedOption === "RS" ? "Srpski" : "English"}</p>

        <BiDownArrow style={{ fontSize: "1.5rem" }} />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            <ListItem onClick={onOptionClicked("en")}>
              <ReactCountryFlag
                countryCode="GB"
                style={{
                  fontSize: "1.5em",
                  lineHeight: "1.5em",
                }}
              />
            </ListItem>
            <ListItem onClick={onOptionClicked("rs")}>
              <ReactCountryFlag
                countryCode="RS"
                style={{
                  fontSize: "1.5em",
                  lineHeight: "1.5em",
                }}
              />
            </ListItem>
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}
