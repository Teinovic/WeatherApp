import styled from "styled-components";

export const AppName = styled.div`
    position: absolute;
    top:-30px;
    right: 290px;
    background-color: orange;
    padding: 0.2rem 0.3rem;
    border-radius: 15px;
    font-style: bold;
    letter-spacing: 1.7px;
    z-index: 10000;

    @media (max-width: 767px) {
        display: none;
    }

    @media (min-width: 800px) and (max-width: 1100px) {
        right: 290px;
        top: 0px;
    }
`;

export const Name = styled.h1`
    color: white;
`
