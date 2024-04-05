import config from "@/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DateTime } from "luxon";

interface Params {
  lat: number;
  lon: number;
  startDate?: any;
}

const initialState: { data: HistoricalData[]; loading: boolean } = {
  data: [],
  loading: true,
};

const historicalSlice = createSlice({
  name: "historical",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoricalRecord.pending, () =>
        console.log("Historical Data get")
      )
      .addCase(
        getHistoricalRecord.fulfilled,
        (state, action: PayloadAction<HistoricalData[]>) => {
          let data = action.payload;
          state.data = data;
          state.loading = false;
          return state;
        }
      );
  },
});

export const getHistoricalRecord = createAsyncThunk(
  "historical/getHistoricalRecord",
  async (params: Params) => {
    const historicalData = [];
    const dt = params.startDate
      ? DateTime.fromJSDate(params.startDate)
      : DateTime.now().startOf("day");

    for (let i = 1; i <= 5; i++) {
      const { data } = await axios({
        method: "get",
        url: config.openWeatherHistoricalUrl,
        params: {
          lat: params.lat,
          lon: params.lon,
          dt: parseInt(dt.plus({ day: -i }).toFormat("X")),
          appid: config.openWeatherApiKey,
        },
      });

      historicalData.push(data);
    }

    return historicalData;
  }
);

export const { setLoading } = historicalSlice.actions;
export default historicalSlice.reducer;
