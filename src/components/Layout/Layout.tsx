import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStoreState } from '../../state';
import { Header } from '../Header/Header';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export function Layout() {
  const loggedIn = useStoreState('loggedIn');
  const navigate = useNavigate();
  const location = useLocation();
  /*
  * Set your secret key. Remember to switch to your live secret key
  * in production. See your keys here: https://dashboard.stripe.com/apikeys
  * Make sure to call `loadStripe` outside of a component’s render to avoid
  * recreating the `Stripe` object on every render.
  */
  // eslint-disable-next-line max-len
  const stripePromise = loadStripe('pk_test_51LDTGtLY3fwx8Mq44A7wpR1YFpeZmJQpxayq4JSR4FV46W11zHt8i0QDPMPaBJ3NTWFdEfVnTpuUOxoaxFUsEdpK00THi7Wfh9');

  useEffect(() => {
    // Do not get automatically redirected to login if landing page is visited
    if (!loggedIn && location.pathname !== '/landing') {
      navigate('/login');
    }
  }, [loggedIn, navigate, location]);

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
