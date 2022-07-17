import { MongoDocument } from "./document";

export interface Notification extends MongoDocument {
  supplierName: string;
  ppaId: string;
  buyerId: string;
  cancellationDate: Date;
  read: boolean;
}