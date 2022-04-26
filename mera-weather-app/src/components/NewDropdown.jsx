import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";

export const NewDropdown = ({ citiesData, pullSelectedCity }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const { _links: { "ua:item": cities } = {} } = citiesData;

  console.log(selectedCity, "aaa");

  if (selectedCity) pullSelectedCity(selectedCity);

  const handleInput = (newValue) => {
    setSelectedCity(newValue.value);
    return newValue;
  };

  const citiesArray =
    citiesData &&
    cities.map((city) => {
      return { value: city.name, label: city.name };
    });

  console.log(citiesArray);
  return (
    <Wrapper>
      <Select
        options={citiesArray}
        styles={customStyles}
        onChange={handleInput}
      />
    </Wrapper>
  );
};

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    width: "auto",
    padding: 2,
    paddingLeft: 5,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "fit-content",
    color: "#fff",
    display: "flex",
    backgroundColor: "transparent",
    fontSize: "3rem",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
    backgroundColor: "transparent",
    border: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,

    svg: {
      height: "2rem",
      width: "2rem",
      color: "white",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),

  menu: (provided) => ({
    ...provided,
    width: 200,
  }),
};

const Wrapper = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
  background-color: transparent;
`;
