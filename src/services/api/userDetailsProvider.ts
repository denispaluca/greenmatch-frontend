import { request } from './BaseProvider';

const RESOURCE = 'auth/me';
const UserDetailsProvider = {
  get: () => request(RESOURCE, 'GET'),
};

export default UserDetailsProvider;
