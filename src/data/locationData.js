// Minimal country -> states/regions dataset for the Shipping page dropdowns.
// Trimmed for demo purposes; extend with a full dataset or an API if needed.

export const countries = [
  {
    name: 'Sweden',
    states: ['Stockholm', 'Västra Götaland', 'Skåne', 'Uppsala', 'Örebro'],
  },
  {
    name: 'Finland',
    states: ['Uusimaa', 'Pirkanmaa', 'Varsinais-Suomi', 'Pohjois-Pohjanmaa'],
  },
  {
    name: 'Denmark',
    states: ['Capital Region', 'Central Denmark', 'Southern Denmark', 'North Denmark'],
  },
  {
    name: 'Norway',
    states: ['Oslo', 'Viken', 'Vestland', 'Trøndelag'],
  },
];

export const getStatesForCountry = (countryName) => {
  const country = countries.find((c) => c.name === countryName);
  return country ? country.states : [];
};