import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    current: {
      dew_point: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      uvi: 0,
      visibility: 0,
    },
  },
];

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    weatherAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
    },
  },
});

export const { weatherAdded } = weatherSlice.actions;

export const weatherDetail = (state)=> state.weather;

export default weatherSlice.reducer;
