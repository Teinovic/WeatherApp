import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import currentCityReducer from "./currentCitySlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    currentCity: currentCityReducer,
  },
});

export default store;
