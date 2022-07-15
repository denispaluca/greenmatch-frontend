export const ownerValidator = (name: string) => {
  console.log('Check Owner');
  if (name === undefined || name.length < 3) {
    return Promise.reject(new Error('Invalid Name'));
  } else {
    return Promise.resolve();
  }
};
