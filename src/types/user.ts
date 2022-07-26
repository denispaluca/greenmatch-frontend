import { Company } from '.';
import { MongoDocument } from './document';

export interface UserInformation extends MongoDocument {
  email: string,
  password: string,
  role: string,
  company: Company,
  website: string,
  hrb: string,
}
