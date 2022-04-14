import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import { Cursor } from "./components/Cursor";
import { Provider } from "react-redux";
import store from "./store2";
//React v18
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
    <Cursor />
    <App />
    </Provider>
  </StrictMode>
);
