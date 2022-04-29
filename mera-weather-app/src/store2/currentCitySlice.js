import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentCity: "Belgrade" };

const currentCitySlice = createSlice({
  name: "currentCity",
  initialState,
  reducers: {
    changeCurrentCity(state, action) {
      return action.payload;
    },
  },
});

export const { changeCurrentCity } = currentCitySlice.actions;

export default currentCitySlice.reducer;
