import { RegistrationFormValues } from '../../types';

interface AuthRes {
  ok: boolean;
  token?: string;
  error?: string;
}

export const login = async (email: string,
  password: string,
  loginType: string):
  Promise<AuthRes> => {
  const reqBody = {
    email,
    password,
    loginType,
  };
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(reqBody),
    },
  );

  if (res.ok) {
    return res;
  }
  return {
    ok: false,
    error: (await res.json()).message,
  };
};

export const register = async (values: RegistrationFormValues)
  : Promise<AuthRes> => {
  console.log(values);

  const company = {
    name: values.companyName,
    country: values.country,
    website: values.companyWebsite,
    hrb: values.hrb,
    imageURL: values.companyImage,
  };

  const reqBody = {
    email: values.email,
    password: values.password,
    company,
    iban: values.iban,
  };

  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    },
  );

  if (res.ok) {
    return res;
  }
  return {
    ok: false,
    error: (await res.json()).message,
  };
};

export const logout = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (res.ok) {
    return {
      ok: true,
    };
  }
  return {
    ok: false,
    error: (await res.json()).message,
  };
};
