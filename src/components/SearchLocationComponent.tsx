"use client";

import config from "@/config";
import { setCoords } from "@/state/coordinates/coordinatesSlice";
import {
  getHistoricalRecord,
  setHistoricalLoading,
} from "@/state/historical/historicalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { getWeather, setWeatherLoading } from "@/state/weather/weatherSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchLocation = (props: any) => {
  const { location, handleLocation } = props;

  const dispatch = useDispatch<AppDispatch>();
  const coordinates: { lat: number; lon: number } = useSelector(
    (state: RootState) => state.coordinates.data
  );
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!location) {
        return setSuggestions([]);
      }

      let { data } = await axios({
        method: "get",
        url: config.openWeatherGeoUrl,
        params: {
          q: location,
          limit: 5,
          appid: config.openWeatherApiKey,
        },
      });

      setSuggestions(data);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [location]);

  const handleSelection = (s: { lat: number; lon: number }) => {
    setSuggestions([]);
    dispatch(setWeatherLoading());
    dispatch(setHistoricalLoading());
    dispatch(setCoords(s));
  };

  return (
    <>
      <div className="flex flex-col relative">
        <input
          type="text"
          value={location}
          onChange={handleLocation}
          className="text-black/70 h-10 w-full rounded-lg bg-white/50 backdrop-blur-md"
          placeholder="Location (e.g. London, Manila)"
        />
        <div
          className={`h-max py-2 w-full bg-white/30 text-black/70 font-bold mt-11 rounded-lg shadow-lg absolute ${
            suggestions.length === 0 && "hidden"
          }`}
        >
          {suggestions.map((s: any, k: any) => (
            <p
              key={k}
              className="cursor-pointer pl-3 py-1 hover:bg-gray-900/50 hover:text-white"
              onClick={() => handleSelection(s)}
            >
              {`${s.name}${s.state ? `, ${s.state}` : ""}`}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchLocation;
