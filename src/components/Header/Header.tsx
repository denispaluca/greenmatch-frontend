import {Avatar, Dropdown, Menu, PageHeader, Space} from "antd";
import { UserOutlined, SmileOutlined, DownOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <Link to='/user-settings'>
            <div>
              User Settings
            </div>
          </Link>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);

export function Header(){
  return(

      <PageHeader
        title={<Link to='/'>Greenmatch</Link>}
        subTitle="Dashboard"
        extra={[
      <Dropdown overlay={menu}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a onClick={e => e.preventDefault()}>
      <Space>
        <Avatar size={32} icon={<UserOutlined/>}/>
        <DownOutlined style={{color: '#0af230'}}/>
      </Space>
    </a>
  </Dropdown>
        ]}
      />

  )
}
