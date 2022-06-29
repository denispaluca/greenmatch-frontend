import { PowerPlant, PowerPlantCreate, PowerPlantUpdate }
  from '../../types/powerplant';
import { get, list, update, create, remove } from './BaseProvider';

const RESOURCE = 'powerplants';
const PowerPlantProvider = {
  list: () => list<PowerPlant>(RESOURCE),
  create: (body: PowerPlantCreate) => create<PowerPlant>(RESOURCE, body),
  get: (id: string) => get<PowerPlant>(RESOURCE, id),
  update: (id: string, body: PowerPlantUpdate) =>
    update<PowerPlant>(RESOURCE, id, body),

  remove: (id: string) => remove<PowerPlant>(RESOURCE, id),
};

export default PowerPlantProvider;
