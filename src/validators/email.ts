import EmailProvider from '../services/api/EmailProvider';

export const emailValidator = async (value: string) => {
  if (value === undefined || value.length === 0) {
    return Promise.reject(new Error(
      'Please enter an Email Adresss',
    ));
  }
  const res = await EmailProvider.get(value);

  if (res.available === true) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(
      'Email already in use',
    ));
  }
};
