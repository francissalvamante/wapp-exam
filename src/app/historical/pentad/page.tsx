"use client";

import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import weatherIcon from "@/_helpers/weatherIcon";
import { kelvinToCelsius } from "@/_helpers/unitConverter";
import { useEffect } from "react";
import {
  getHistoricalRecord,
  setHistoricalLoading,
} from "@/state/historical/historicalSlice";
import { IconLoader3 } from "@tabler/icons-react";

const PentadPage = () => {
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

  useEffect(() => {
    dispatch(setHistoricalLoading());
    dispatch(getHistoricalRecord(coordinates));
  }, []);

  const historicalMap = () => {
    return historical.map(({ data }, k) => {
      return (
        <div
          key={k}
          className="w-max h-max flex bg-white/30 backdrop-blur-md items-center flex-col p-8 rounded-lg xs:snap-center"
        >
          <p className="mb-3 text-center break-word">
            {DateTime.fromSeconds(data[0].dt).toFormat("DDD")}
          </p>
          {weatherIcon(data[0].weather[0])}
          <div className="mt-3 flex xs:items-center">
            <div className="md:hidden">
              <p>{kelvinToCelsius(data[0].temp)}°</p>
              <p>{kelvinToCelsius(data[0].feels_like)}°</p>
            </div>
            <div className="xs:hidden">
              <p>
                {kelvinToCelsius(data[0].temp)}° |{" "}
                {kelvinToCelsius(data[0].feels_like)}°
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex justify-center space-x-5 no-scrollbar xs:overflow-x-auto xs:snap-x">
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
  );
};

export default PentadPage;
