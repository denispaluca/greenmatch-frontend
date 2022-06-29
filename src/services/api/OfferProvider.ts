import { Offer, OfferQuery } from '../../types/offer';
import { get, list } from './BaseProvider';

const RESOURCE = 'offers';

const stringifyProps = (obj: any) => {
  if (!obj) return undefined;

  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!value) continue;

    if (typeof value === 'object') {
      result[key] = JSON.stringify(value);
      continue;
    }

    result[key] = String(value);
  }

  return result;
};

const OfferProvider = {
  list: (params?: OfferQuery) => list<Offer>(RESOURCE, stringifyProps(params)),
  get: (id: string) => get<any>(RESOURCE, id),
};

export default OfferProvider;
