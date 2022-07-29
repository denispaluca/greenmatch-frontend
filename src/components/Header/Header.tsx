import {
  Menu,
  Avatar,
  Dropdown,
  PageHeader,
  Space,
  Button,
  Divider,
} from 'antd';
import {
  BookOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
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
              <Space><DashboardOutlined /><div>Dashboard</div></Space>
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to="/offers">
              <Space><BookOutlined /><div>Offers</div></Space>
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
                <Space><PoweroffOutlined />Logout</Space>
              </div>
            </Link>
          ),
        },
      ]}
    />
  );

  return (
    /*
    // Header CSS border
    borderBottom: 'solid',
    borderColor: '#f8f8f8',
    borderWidth: 'thin',
    */
    <PageHeader
      style={{
        position: location.pathname === '/' ? 'fixed' : 'relative',
        backgroundColor: 'white',
        zIndex: 1,
        width: '100%',
        boxShadow: '2px 2px 4px 1px rgba(0, 0, 0, 0.1)',
      }}
      title={
        < Link to="/" >
          <div
            style={{
              color: '#28dead',
              fontWeight: '900',
              textDecoration: 'underline',
              textDecorationThickness: '5px',
            }}
          >
            GreenMatch
          </div>
        </ Link >}
      extra={
        [
          // If user is not logged in, show landing page header with login btn
          (!loggedIn && location.pathname === '/') ? (
            <Space>
              <a href="#introduction">Introduction</a>
              <a href="#about">About</a>
              <a href="#team">Team</a>
              <a href="#faq">FAQs</a>
              <Divider type="vertical" />
              <Button
                size={'middle'}
                type='primary'
              >
                <Link to="/login">Login</Link>
              </Button>
            </Space>
          ) :
            // if user is logged in, show landing page header with dropdown
            (loggedIn && location.pathname === '/') ? (
              <Space>
                <a href="#introduction">Introduction</a>
                <a href="#about">About</a>
                <a href="#team">Team</a>
                <a href="#faq">FAQs</a>
                <Divider type="vertical" />
                <Dropdown overlay={menu}>
                  {/* eslint-disable-next-line */}
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <div>{email}</div>
                      <Avatar
                        size='default'
                        icon={<UserOutlined />}
                      />
                    </Space>
                  </a>
                </Dropdown>
              </Space>
            ) :
              // show dropdown only on pages other than landing page
              (loggedIn) ? (
                <Dropdown overlay={menu}>
                  {/* eslint-disable-next-line */}
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <div>{email}</div>
                      <Avatar
                        size='default'
                        icon={<UserOutlined />}
                      />
                    </Space>
                  </a>
                </Dropdown>
              ) :
                // else, show only login button
                (
                  <Button
                    size={'middle'}
                    type='primary'
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                ),
        ]}
    />
  );
}
