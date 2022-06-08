import { Menu, Avatar, Dropdown, PageHeader, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <Link to="/login"><div>Login</div></Link>
                ),
            },
            {
                key: '2',
                label: (
                    <Link to="/"><div>Dashboard</div></Link>
                ),
            },
            {
                key: '3',
                label: (
                    <Link to="/user-settings"><div>User Settings</div></Link>
                ),
            }
        ]}
    />
);

export function Header() {
    return (
        <PageHeader
            title={<Link to='/'>GreenMatch</Link>}
            subTitle="... where your PPA is just one click away!"
            extra={[
                <Dropdown overlay={menu}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Space>
                    </a>
                </Dropdown>
            ]}
        />
    )
};