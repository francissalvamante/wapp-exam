"use client";

import weatherIcon from "@/_helpers/weatherIcon";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import { kelvinToCelsius } from "@/_helpers/unitConverter";

const ForecastComponent = () => {
  const weather: OpenWeatherResponse = useSelector(
    (state: RootState) => state.weather.data
  );

  return (
    <div className="w-full">
      {weather.daily.map((d, k) => {
        const w = d.weather[0];
        return (
          <div className="flex h-max items-center mb-3" key={k}>
            {weatherIcon(w)}
            <div className="flex flex-col ml-3">
              <p>{DateTime.fromSeconds(d.dt).toFormat("EEEE, MMMM d")}</p>
              <p className="capitalize">{w.description}</p>
            </div>
            <div className="ml-auto pl-3 border-l-white/50 border-l-2">
              <p>{kelvinToCelsius(d.feels_like.night)}°</p>
              <p>{kelvinToCelsius(d.feels_like.day)}°</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastComponent;
