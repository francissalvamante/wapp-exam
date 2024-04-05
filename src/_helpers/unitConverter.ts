/**
 * Converter from mi/s to km/h since OpenWeather gives mi/s
 * @param mps mi/s
 * @returns km/h
 */

const mpsToKph = (mps: number) => {
  let kph = 3.6 * mps;

  return (Math.round(kph * 100) / 100).toFixed(2);
};

const kelvinToCelsius = (k: number) => Math.round(k - 273.15);

export { mpsToKph, kelvinToCelsius };
