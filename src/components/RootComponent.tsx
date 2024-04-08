"use client";

import { AppDispatch, RootState } from "@/state/store";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLocation from "./SearchLocationComponent";
import CurrentWeather from "./CurrentWeather";
import ForecastComponent from "./ForecastComponent";
import HourlyWeather from "./HourlyWeatherComponent";
import { useRouter } from "next/navigation";
import { IconLoader3 } from "@tabler/icons-react";
import { getWeather } from "@/state/weather/weatherSlice";
import { getHistoricalRecord } from "@/state/historical/historicalSlice";

const RootComponent = (props: any) => {
  const dateTime = DateTime.fromJSDate(new Date());
  const weather: OpenWeatherResponse = useSelector(
    (state: RootState) => state.weather.data
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.weather.loading
  );
  const coordinates: { lat: number; lon: number } = useSelector(
    (state: RootState) => state.coordinates.data
  );
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [currentTime, setCurrentTime] = useState("00:00");
  const currentDate = dateTime.toFormat("d MMMM y");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(() => DateTime.fromJSDate(new Date()).toFormat("HH:mm"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch(getWeather(coordinates));
    dispatch(getHistoricalRecord(coordinates));
  }, [coordinates]);

  const handleLocation = (evt: any) => {
    const { value } = evt.target;

    setLocation(value);
  };

  const loadedRight = () => {
    return (
      <>
        <CurrentWeather />
        <div className="h-px bg-gray-400 w-full my-10" />
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">The Next Days Forecast</p>
          <div className="mt-10 w-full flex flex-col">
            <ForecastComponent />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <main
        className={`flex flex-row-reverse min-h-screen bg-no-repeat bg-center bg-cover bg-cloudy`}
      >
        <div
          className={`flex flex-col w-3/12 bg-white/0 backdrop-blur-md p-10 shadow-lg ${
            loading ? "items-center justify-center" : ""
          }`}
        >
          <SearchLocation location={location} handleLocation={handleLocation} />
          {loading ? (
            <IconLoader3 className="animate-spin" size={60} />
          ) : (
            loadedRight()
          )}
        </div>
        <div className="w-9/12 p-10 flex flex-col">
          {/** Content Header */}
          <div className="w-full flex flex-row-reverse items-center">
            <p className="text-lg">
              {currentDate} | {currentTime}
            </p>
            <div className="mr-auto w-1/2 space-x-2">
              <button
                className="bg-white/30 backdrop-blur-md py-2 px-4 rounded-lg"
                onClick={() => router.push("/historical/pentad")}
              >
                5-day Historical Data
              </button>
              <button
                className="bg-white/30 backdrop-blur-md py-2 px-4 rounded-lg"
                onClick={() => router.push("/historical/custom")}
              >
                Custom Historical Data
              </button>
            </div>
          </div>
          {/** Content Body */}
          <div className="w-full h-full py-8 px-2 flex flex-row justify-center items-center space-x-2 relative">
            <h1 className="text-3xl absolute top-0">Historical Data</h1>
            {props.children}
          </div>
          {/** Content Footer */}
          <div className="bottom-10 flex flex-col w-full mt-auto">
            <h1 className="text-8xl mb-10 ml-auto capitalize">
              {weather && weather.daily[0]?.weather[0]?.description}
            </h1>
            <hr className="h-1 bg-gray-200 border-0" />
            <HourlyWeather />
          </div>
        </div>
      </main>
    </>
  );
};

export default RootComponent;
