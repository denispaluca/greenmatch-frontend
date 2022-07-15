export const urlValidator = (s: string) => {
  if (s === undefined || s.length === 0) {
    return Promise.reject(new Error(
      'Please enter a URL',
    ));
  }
  try {
    new URL(s);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(new Error(
      'Please a valid URL',
    ));
  }
};
