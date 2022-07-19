import { City, Country } from 'country-state-city';

export const cityValidator = (city: string) => {
  if (city === undefined || city.length === 0) {
    return Promise.reject(new Error(
      'Please enter a City',
    ));
  }

  const found = City.getAllCities().some((c) => {
    if (c.name === city) {
      return true;
    } else {
      return false;
    }
  });

  if (found === true) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(
      'Please enter a valid City',
    ));
  }
};


export const countryValidator = (country: string) => {
  if (country === undefined || country.length === 0) {
    return Promise.reject(new Error(
      'Please enter a Country',
    ));
  }

  const found = Country.getAllCountries().some((c) => {
    if (c.name === country) {
      return true;
    } else {
      return false;
    }
  });

  if (found === true) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(
      'Please enter a valid Country',
    ));
  }
};
