import { MongoDocument } from './document';
import { SingleDuration } from './offer';

export interface PPAQuery {
  buyerId?: string;
  supplierId?: string;
  powerplantId?: string;
}

export interface PPACreate {
  powerplantId: string;
  duration: SingleDuration;
  amount: number;
}

/**
 * @typedef PPA - Power Purchase Agreement
 */
export interface PPA extends Required<PPAQuery>, PPACreate, MongoDocument {
  price: number;
  startDate: Date;
  canceled: boolean;
}
