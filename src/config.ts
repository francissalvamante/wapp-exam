const config = {
  openWeatherApiKey: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY as string,
  openWeatherUrl: process.env.NEXT_PUBLIC_OPEN_WEATHER_URL as string,
  openWeatherGeoUrl: process.env.NEXT_PUBLIC_OPEN_WEATHER_GEO_URL as string,
  openWeatherHistoricalUrl: process.env
    .NEXT_PUBLIC_OPEN_WEATHER_HISTORICAL_URL as string,
};

export default config;
