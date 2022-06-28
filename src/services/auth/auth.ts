import { RegistrationFormValues } from '../../types';

interface AuthRes {
  ok: boolean;
  token?: string;
  error?: string;
}

export const login = async (username: string,
  password: string,
  loginType: string):
Promise<AuthRes> => {
  const reqBody = {
    username,
    password,
    loginType,
  };
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    },
  );

  if (res.ok) {
    return {
      ok: true,
      token: (await res.json()).token,
    };
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
    username: values.email,
    password: values.password,
    company,
    iban: values.iban,
  };

  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    },
  );

  if (res.ok) {
    return {
      ok: true,
      token: (await res.json()).token,
    };
  }
  return {
    ok: false,
    error: (await res.json()).message,
  };
};
