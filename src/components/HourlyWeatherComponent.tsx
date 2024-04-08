"use client";

import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import weatherIcon from "@/_helpers/weatherIcon";
import { kelvinToCelsius } from "@/_helpers/unitConverter";

const HourlyWeather = () => {
  const hourly: Hourly[] = useSelector(
    (state: RootState) => state.weather.data.hourly
  );

  const harr = hourly.slice(1, 11);

  return (
    <div className="w-full flex justify-between overflow-x-auto mt-10">
      {harr.map((h, k) => (
        <div
          key={k}
          className="flex flex-col items-center bg-white/30 p-3 backdrop-blur-md rounded-lg shadow-lg"
        >
          <p>{DateTime.fromSeconds(h.dt).toFormat("T")}</p>
          <div className="h-px bg-gray-400 w-full my-2" />
          {weatherIcon(h.weather)}
          <p className="font-bold mt-2">{kelvinToCelsius(h.feels_like)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyWeather;
