import config from "@/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: { data: OpenWeatherResponse; loading: boolean } = {
  data: {
    lat: 0,
    lon: 0,
    daily: [],
    alerts: [],
    current: {
      clouds: 0,
      dew_point: 0,
      dt: 0,
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      sunrise: 0,
      sunset: 0,
      temp: 0,
      uvi: 0,
      visibility: 0,
      weather: [],
      wind_deg: 0,
      wind_gust: 0,
      wind_speed: 0,
    },
    hourly: [],
    minutely: [],
    timezone: "Asia/Manila",
    timezone_offset: 0,
  },
  loading: true,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => console.log("getting weather"))
      .addCase(
        getWeather.fulfilled,
        (state, action: PayloadAction<OpenWeatherResponse>) => {
          let data = action.payload;
          data = {
            ...data,
            daily: data.daily.slice(1, 6),
          };
          state.data = data;
          state.loading = false;
        }
      );
  },
});

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (params: { lat: number; lon: number }) => {
    const { data } = await axios({
      method: "get",
      url: config.openWeatherUrl,
      params: {
        lat: params.lat,
        lon: params.lon,
        appid: config.openWeatherApiKey,
      },
    });

    return data;
  }
);

export const { setLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
