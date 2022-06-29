import { PowerPlantType } from "../../types"
import { get, list, update, create, remove } from "./BaseProvider"

const RESOURCE = 'powerplants'
const PowerPlantProvider = {
  get: (id: string) => get<PowerPlantType>(RESOURCE, id),
  list: (params: any) => list<PowerPlantType>(RESOURCE, params),
  create: (body: any) => create<PowerPlantType>(RESOURCE, body),

}

export default PowerPlantProvider;