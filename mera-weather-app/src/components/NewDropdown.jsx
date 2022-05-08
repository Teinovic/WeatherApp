import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeCurrentCity } from "../store2/currentCitySlice";

export const NewDropdown = ({ citiesData }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const { _links: { "ua:item": cities } = {} } = citiesData;

  const dispatch = useDispatch();

  const changeCity = useCallback(
    () => dispatch(changeCurrentCity(selectedCity)),
    [selectedCity]
  );

  useEffect(() => {
    if (selectedCity) {
      changeCity();
    }
  }, [selectedCity]);

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  const handleInput = (newValue) => {
    localStorage.setItem("city",newValue.value);
    setSelectedCity(newValue.value);
    return newValue;
  };

  const citiesArray =
    citiesData &&
    cities.map((city) => {
      return { value: city.name, label: city.name };
    });

  return (
    <Wrapper>
      <Select
        options={citiesArray}
        styles={customStyles}
        onChange={handleInput}
        defaultValue={{ label: localStorage.getItem("city") ? (localStorage.getItem("city")) : "Belgrade", value: 0 }}
      />
      <CurrentDate>{`${dd} ${toMonthName(mm)}`}</CurrentDate>
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
    textTransform: "uppercase",
    caretColor: "white",
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
  z-index: 5;
  padding-top: 1rem;
  padding-left: 1rem;
  background-color: transparent;
  background: linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
`;

const CurrentDate = styled.h3`
  color: lightgray;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 1.8rem;
  padding-left: 0.7rem;

  @media (max-width: 767px) {
    font-size: 1.3rem;
  }
`;
