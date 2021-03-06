import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {
    dew_point: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    uvi: 0,
    visibility: 0,
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
  },
  daily: [],
  lat: 44.804,
  lon: 20.4651,
  timezone: "nista",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    weatherAdded: {
      reducer(state, action) {
        return action.payload;
      },
    },
  },
});

export const { weatherAdded } = weatherSlice.actions;

export const weatherDetail = (state) => state.weather;

export default weatherSlice.reducer;
