/* eslint-disable max-len */
import { Menu, Avatar, Dropdown, PageHeader, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { dispatch, useStoreState } from '../../state';
import { logout } from '../../services';

export function Header() {
  const email = useStoreState('email');
  const loginType = useStoreState('loginType');
  const location = useLocation();
  const loggedIn = email !== '';
  const isBuyer = loginType === 'Buyer';

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          disabled: isBuyer,
          label: (
            <Link to="/powerplants">
              <div>Dashboard</div>
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to="/offers">
              <div>Offers</div>
            </Link>
          ),
        },
        {
          key: '3',
          label: (
            // eslint-disable-next-line
            <Link to='/'
              onClick={async () => {
                const res = await logout();
                if (res.ok) {
                  console.log('ok logout');
                  dispatch({
                    type: 'logout',
                  });
                }
              }
              }
            >
              <div
                onKeyDown={() => null}
                role="button"
                tabIndex={0}
              >
                Logout
              </div>
            </Link>
          ),
        },
      ]}
    />
  );

  return (
    <PageHeader
      style={{ position: location.pathname === '/' ? 'fixed' : 'relative', backgroundColor: 'white', zIndex: 1, width: '100%' }}
      title={< Link to="/" > GreenMatch</Link >}
      subTitle="... where your PPA is just one click away!"
      extra={
        [
          /* If user is not logged in, show landing page header,
else show avatar dropdown menu */
          !loggedIn ? (
            <Space>
              <a href="#introduction">Introduction</a>
              <a href="#about">About</a>
              <a href="#team">Team</a>
              <a href="#faq">FAQs</a>
              <Button size={'middle'}>
                <Link to="/login">Login</Link>
              </Button>
            </Space>
          ) : (
            <Dropdown overlay={menu}>
              {/* eslint-disable-next-line */}
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div>{email}</div>
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                  />
                </Space>
              </a>
            </Dropdown>
          ),
        ]}
    />
  );
}
