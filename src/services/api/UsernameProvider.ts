import { get } from "./BaseProvider"

const RESOURCE = 'username'
const OfferProvider = {
  get: (email: string) => get<{ available: boolean }>(RESOURCE, email),
}

export default OfferProvider;