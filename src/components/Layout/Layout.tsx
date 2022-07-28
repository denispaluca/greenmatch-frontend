import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { Button, notification } from 'antd';
import { useStoreState } from '../../state';
import { Notification } from '../../types/notification';
import NotificationProvider from '../../services/api/NotificationProvider';
import { io, Socket } from 'socket.io-client';

const openNotification = (notif: Notification) => {
  const key = notif._id;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={async () => {
        await NotificationProvider.read(key);
        notification.close(key);
      }}
    >
      Mark as read
    </Button>
  );
  notification.open({
    message: 'PPA Cancelled',
    description:
      `PPA with supplier ${notif.supplierName} has been cancelled.`,
    btn,
    key,
    duration: 0,
  });
};

let socket: Socket | null = null;
export function Layout() {
  /*
  * Set your secret key. Remember to switch to your live secret key
  * in production. See your keys here: https://dashboard.stripe.com/apikeys
  * Make sure to call `loadStripe` outside of a component’s render to avoid
  * recreating the `Stripe` object on every render.
  */
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK!);

  const loginType = useStoreState('loginType');
  useEffect(() => {
    if (loginType !== 'Buyer') {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      return;
    }

    if (!socket) {
      socket = io('http://localhost:8080', { withCredentials: true });

      socket.on('notification', (notif: Notification) => {
        openNotification(notif);
      });
    }

    fetchNotifications();
  }, [loginType, socket]);

  const fetchNotifications = async () => {
    const notifcations = await NotificationProvider.list();
    notifcations.forEach(openNotification);
  };

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Header />
        <main>
          <Outlet />
        </main>
      </Elements>
    </div>
  );
}
