import { kelvinToCelsius, mpsToKph } from "@/_helpers/unitConverter";
import degToCompass from "@/_helpers/windDirConverter";
import { RootState } from "@/state/store";
import { IconWind } from "@tabler/icons-react";
import { useSelector } from "react-redux";

const CurrentWeather = () => {
  const current: CurrentWeather = useSelector(
    (state: RootState) => state.weather.data.current
  );

  return (
    <div className="w-full h-max flex flex-col items-center">
      <p className="text-6xl font-bold p-10">
        {kelvinToCelsius(current.feels_like)}°C
      </p>
      <div className="flex h-max">
        <IconWind size={20} />
        <p className="font-light text-sm ml-2">
          {degToCompass(current.wind_deg)} {mpsToKph(current.wind_speed)} km/h
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
