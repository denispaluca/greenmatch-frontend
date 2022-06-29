import { PPA, PPACreate } from "../../types/ppa";
import { get, list, update, create } from "./BaseProvider"

const RESOURCE = 'ppas'
const PPAProvider = {
  list: (powerplantId?: string) => list<PPA>(
    RESOURCE,
    powerplantId ? { powerplantId } : undefined),

  create: (body: PPACreate) => create<PPA>(RESOURCE, body),
  get: (id: string) => get<PPA>(RESOURCE, id),
  cancel: (id: string) => update<PPA>(RESOURCE, id, {}),
}

export default PPAProvider;