import React from "react";
import styled from "styled-components";


const DetailWeather = () => {
  return (
    <DetailWrapper>
      <Humidity>
        <h3>87%</h3>
        <h4>Hummidity</h4>
      </Humidity>
      <AirPollution>
        <h3>25'</h3>
        <h4>Dew Pt.</h4>
      </AirPollution>
      <UvIndex>
        <h3>0/10</h3>
        <h4>UV Index</h4>
      </UvIndex>
      <Visibility>
        <h3>3.0km</h3>
        <h4>Visibility</h4>
      </Visibility>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  // width: 30%;
  height: 40vh;
  width:100%;
  // height:100%;
  background: linear-gradient(225deg, rgba(6,117,54,0.9360337885154062) 54%, rgba(4,125,73,1) 69%);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  background-color:orange;



  @media (max-width: 767px) {
    width: 100%;
    height: 50vh;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 50%;
    height: 30vh;
  }
`;

const Humidity = styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0.2rem 0.5rem 0.2rem 0.2rem;

h3,h4 {
  padding: 0;
  margin: 0;
}
`

const AirPollution = styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0.2rem 0.5rem 0.2rem 0.2rem;

h3,h4 {
  padding: 0;
  margin: 0;
}
`

const UvIndex = styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0.2rem 0.5rem 0.2rem 0.2rem;

h3,h4 {
  padding: 0;
  margin: 0;
}
`

const Visibility = styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0.2rem 0.5rem 0.2rem 0.2rem;

h3,h4 {
  padding: 0;
  margin:0;
}
`

export default DetailWeather;
