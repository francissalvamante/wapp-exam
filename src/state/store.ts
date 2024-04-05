import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather/weatherSlice";
import coordinatesReducer from "./coordinates/coordinatesSlice";
import historicalReducer from "./historical/historicalSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    coordinates: coordinatesReducer,
    historical: historicalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
