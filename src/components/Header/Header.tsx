import { Menu, Avatar, Dropdown, PageHeader, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { dispatch, useStoreState } from "../../state";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <Link to="/login">
            <div>Login</div>
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link to="/">
            <div>Dashboard</div>
          </Link>
        ),
      },
      {
        key: "3",
        label: (
          <Link to="/user-settings">
            <div>User Settings</div>
          </Link>
        ),
      },
      {
        key: "4",
        label: (
          <div
            onClick={() =>
              dispatch({
                type: "logout",
              })
            }
          >
            Logout
          </div>
        ),
      },
    ]}
  />
);

export function Header() {
  const loggedIn = useStoreState("loggedIn");
  return (
    <PageHeader
      /* 
      Fixed page header:
      style={{ position: "fixed", zIndex: 1, width: "100%" }} 
      */
      title={<Link to="/">GreenMatch</Link>}
      subTitle="... where your PPA is just one click away!"
      extra={[
        /* If user is not logged in, show landing page header, else show avatar dropdown menu */
        !loggedIn ? (
          <Space>
            <a href="#introduction">Introduction</a>
            <a href="#about">About</a>
            <a href="#team">Team</a>
            <Button size={"middle"}>
              <Link to="/login">Login</Link>
            </Button>
          </Space>
        ) : (
          <Dropdown overlay={menu}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        ),
      ]}
    />
  );
}
