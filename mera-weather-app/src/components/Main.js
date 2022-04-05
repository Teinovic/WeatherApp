import React, { useState, useEffect } from "react";
import { MainWrapper } from "./styles/MainWrapper.styled";
import { fetchFunction } from "../util/fetchFunction";

const Main = () => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    fetchFunction("https://swapi.dev/api/people/1", setApiData);
  }, []);

  console.log(apiData);

  return (
    <MainWrapper>
      <p>
        THIS IS A MAIN PART !!!!! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quam eaque architecto quibusdam suscipit magnam.
        Asperiores amet quibusdam doloribus! Ratione, quia.
      </p>
    </MainWrapper>
  );
};

export default Main;
