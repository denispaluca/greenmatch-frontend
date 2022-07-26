import { get } from './BaseProvider';

const RESOURCE = 'email';
const EmailProvider = {
  get: (email: string) => get<{ available: boolean }>(RESOURCE, email),
};

export default EmailProvider;
