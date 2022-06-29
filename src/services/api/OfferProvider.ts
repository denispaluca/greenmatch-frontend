import { get, list } from "./BaseProvider"

const RESOURCE = 'offers'
const OfferProvider = {
  list: (params: any) => list<any>(RESOURCE, params),
  get: (id: string) => get<any>(RESOURCE, id),
}

export default OfferProvider;