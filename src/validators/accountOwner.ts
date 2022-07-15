export const ownerValidator = (name: string) => {
  if (name === undefined || name.length < 3) {
    return Promise.reject(new Error('Please enter a valid name'));
  } else {
    return Promise.resolve();
  }
};
