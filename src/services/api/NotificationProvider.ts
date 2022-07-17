import { Notification } from '../../types/notification';
import { list, update } from './BaseProvider';

const RESOURCE = 'notifications';

const NotificationProvider = {
  list: () => list<Notification>(RESOURCE),
  read: (id: string) => update<Notification>(RESOURCE, id, {}),
};

export default NotificationProvider;
