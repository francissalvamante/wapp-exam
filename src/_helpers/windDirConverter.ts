/**
 * Helper file to convert wind direction from degrees to compass value
 */

const DIRECTIONS = [
  "North",
  "North North East",
  "North East",
  "East North East",
  "East",
  "East South East",
  "South East",
  "South South East",
  "South",
  "South South West",
  "South West",
  "West South West",
  "West",
  "West North West",
  "North West",
  "North North West",
];

const degToCompass = (deg: number) => {
  const val = Math.floor(deg / 22.5 + 0.5);
  return DIRECTIONS[val % 16];
};

export default degToCompass;
