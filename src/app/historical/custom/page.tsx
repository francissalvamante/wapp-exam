"use client";

import { kelvinToCelsius } from "@/_helpers/unitConverter";
import weatherIcon from "@/_helpers/weatherIcon";
import {
  getHistoricalRecord,
  setHistoricalLoading,
} from "@/state/historical/historicalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { IconLoader3, IconSearch } from "@tabler/icons-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomPage = () => {
  const [startDate, setStartDate] = useState("");
  const historical: HistoricalData[] = useSelector(
    (state: RootState) => state.historical.data
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.historical.loading
  );
  const coordinates: { lat: number; lon: number } = useSelector(
    (state: RootState) => state.coordinates.data
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleQuery = () => {
    dispatch(setHistoricalLoading());
    dispatch(
      getHistoricalRecord({
        ...coordinates,
        startDate: new Date(startDate),
      })
    );
  };

  const handleChange = (evt: any) => {
    setStartDate(evt.target.value);
  };

  const historicalMap = () => {
    return historical.map(({ data }, k) => {
      return (
        <div
          key={k}
          className="w-max h-max flex bg-white/30 backdrop-blur-md items-center flex-col p-8 rounded-lg"
        >
          <p className="mb-3 text-center break-word">
            {DateTime.fromSeconds(data[0].dt).toFormat("DDD")}
          </p>
          {weatherIcon(data[0].weather[0])}
          <div className="mt-3">
            <p>
              {kelvinToCelsius(data[0].temp)}° |{" "}
              {kelvinToCelsius(data[0].feels_like)}°
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="date"
          onChange={handleChange}
          placeholder="Choose start date"
          value={startDate}
          max={DateTime.now().toFormat("yyyy-MM-dd")}
          className="text-black/70 h-10 w-60 rounded-lg bg-white/50 backdrop-blur-md"
        />
        <button onClick={handleQuery} disabled={startDate === ""}>
          <IconSearch />
        </button>
      </div>
      <div className="flex space-x-2">
        {!loading ? (
          historical.length > 0 ? (
            historicalMap()
          ) : (
            <div>No data found...</div>
          )
        ) : (
          <IconLoader3 className="animate-spin" size={60} />
        )}
      </div>
    </div>
  );
};

export default CustomPage;
