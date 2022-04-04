import "./App.css";
import { Container } from "./components/styles/Container.styled";
import { Background } from "./components/styles/Background.styled";
import { WeatherContainer } from "./components/styles/WeatherContainer.styled";
import Main from "./components/Main";
import Side from "./components/Side";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <>
      <Container compW="100%">
        <Background>
          <WeatherContainer>
            <Side />
            <Main />
          </WeatherContainer>
        </Background>
      </Container>
    </>
  );
}

export default App;
