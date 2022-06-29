import { PowerPlantType } from "../../types"
import { get, list, update, create, remove } from "./BaseProvider"

const RESOURCE = 'powerplants'
const PowerPlantProvider = {
  list: () => list<PowerPlantType>(RESOURCE),
  create: (body: any) => create<PowerPlantType>(RESOURCE, body),
  get: (id: string) => get<PowerPlantType>(RESOURCE, id),
  update: (id: string, body: any) => update<PowerPlantType>(RESOURCE, id, body),
  remove: (id: string) => remove<PowerPlantType>(RESOURCE, id)
}

export default PowerPlantProvider;