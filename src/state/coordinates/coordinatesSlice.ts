import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { data: { lat: number; lon: number } } = {
  data: {
    lat: 14.6091,
    lon: 121.0223,
  },
};

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    setCoords: (state, action: PayloadAction<{ lat: number; lon: number }>) => {
      state.data = action.payload;
      return state;
    },
  },
});

export const { setCoords } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
