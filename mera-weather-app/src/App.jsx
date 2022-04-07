import "./App.css";
import { Container } from "./components/styled/Container.styled";
import { WeatherContainer } from "./components/styled/WeatherContainer.styled";
import Main from "./components/Main";
import Side from "./components/Side";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <>
      <Container>
        <WeatherContainer>
          <Side />
          <Main />
        </WeatherContainer>
      </Container>
    </>
  );
}

export default App;
