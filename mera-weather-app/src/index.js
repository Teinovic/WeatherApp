import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./i18n";

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById("root")
);
//React v18
// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <Cursor />
//     <App />
//   </StrictMode>
// );
