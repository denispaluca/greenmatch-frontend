import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStoreState } from '../../state';
import { Header } from '../Header/Header';

export function Layout() {
  const loggedIn = useStoreState('token') !== '';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Do not get automatically redirected to login if landing page is visited
    if (!loggedIn && location.pathname !== '/landing') {
      navigate('/login');
    }
  }, [loggedIn, navigate, location]);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
