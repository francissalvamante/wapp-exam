/**
 * Helper file to avoid garbage code in the components that would need to have icons based on weather
 */

import {
  IconCloud,
  IconCloudBolt,
  IconCloudFog,
  IconCloudRain,
  IconCloudSnow,
  IconSun,
} from "@tabler/icons-react";

const weatherIcon = (weather: Weather) => {
  const visibilityGroup = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
    "Tornado",
  ];

  if (visibilityGroup.includes(weather.main))
    return (
      <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
        <IconCloudFog />
      </div>
    );

  switch (weather.main) {
    case "Thunderstorm":
      return (
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
          <IconCloudBolt />
        </div>
      );
    case "Drizzle":
    case "Rain":
      return (
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
          <IconCloudRain />
        </div>
      );
    case "Snow":
      return (
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
          <IconCloudSnow />
        </div>
      );
    case "Clear":
      return (
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
          <IconSun />
        </div>
      );
    default:
      return (
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
          <IconCloud />
        </div>
      );
  }
};

export default weatherIcon;
