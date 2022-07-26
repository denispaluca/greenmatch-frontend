import { request } from './BaseProvider';

interface SetupIntent {
  client_secret: string;
}

export const createSetupIntent = async (): Promise<SetupIntent> => {
  return request('auth/setupIntent', 'GET');
};

