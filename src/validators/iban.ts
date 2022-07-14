import { electronicFormatIBAN } from 'ibantools';
const ibantools = require('ibantools');

export const ibanValidator = (value: string) => {
  if (value === undefined) {
    return Promise.reject(new Error(
      'Please enter an IBAN',
    ));
  }

  const iban = electronicFormatIBAN(value);
  const check = ibantools.isValidIBAN(iban);
  console.log('iban check', check);
  if (check === true) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(
      'Please enter valid IBAN',
    ));
  }
};
