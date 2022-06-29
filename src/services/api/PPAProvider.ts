import { PowerPlantType } from "../../types"
import { get, list, update, create, remove } from "./BaseProvider"

const RESOURCE = 'ppas'
const PPAProvider = {
  list: (powerplantId?: string) => list<PowerPlantType>(
    RESOURCE,
    powerplantId ? new URLSearchParams({ powerplantId }) : undefined),

  create: (body: any) => create<PowerPlantType>(RESOURCE, body),
  get: (id: string) => get<PowerPlantType>(RESOURCE, id),
  cancel: (id: string) => update<PowerPlantType>(RESOURCE, id, {}),
}

export default PPAProvider;