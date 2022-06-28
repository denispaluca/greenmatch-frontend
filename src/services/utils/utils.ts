export const checkUsernameAvailability = async (email:string):
Promise<boolean> => {
  const res = await
  fetch(`${process.env.REACT_APP_API_URL}/username/${email}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

  return res.ok;
};
