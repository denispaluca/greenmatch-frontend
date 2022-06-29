import { get } from './BaseProvider';

const RESOURCE = 'username';
const UsernameProvider = {
  get: (email: string) => get<{ available: boolean }>(RESOURCE, email),
};

export default UsernameProvider;
