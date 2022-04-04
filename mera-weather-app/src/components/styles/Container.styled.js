import styled from "styled-components";

// background with https://cssgradient.io/
export const Container = styled.main`
  width: ${(props) => props.compW};
  height: ${(props) => props.compH};

  @media (max-width: 767px) {
    width: ${(props) => props.mobW};
    height: ${(props) => props.mobH};
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: ${(props) => props.tabletW};
    height: ${(props) => props.tabletH};
  }
`;
