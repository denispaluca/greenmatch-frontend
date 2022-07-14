/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { Card, Space } from 'antd';
import Icon, { SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { StatusDisplay } from '../StatusDisplay/StatusDisplay';
import { PowerPlant } from '../../types/powerplant';
import drop from '../../assets/images/icons/drop.png';
import windmill from '../../assets/images/icons/windmill.png';
import sun from '../../assets/images/icons/sun.png';


interface PowerPlantProps {
  powerPlant: PowerPlant;
}

export function PowerPlantCard({ powerPlant }: PowerPlantProps) {
  const navigate = useNavigate();
  return (
    <Card
      style={{ borderRadius: '10px', overflow: 'hidden' }}
      hoverable
      onClick={(event) => {
        navigate('/ppa-overview/' + powerPlant._id);
      }}
      title={powerPlant.name}
      actions={[
        <Link
          to={`/powerplants/${powerPlant._id}/edit`}
          onClick={(e) => e.stopPropagation()}
        >
          <Space><SettingOutlined /><div>Settings</div></Space>
        </Link>,
        <div style={{ cursor: 'default' }}>
          <StatusDisplay live={powerPlant.live} />
        </div>,
      ]}
    >
      <p>Location: {powerPlant.location}</p>
      <Space>
        <span>Type:</span>
        <span />
        <span />
        <Icon
          component={() => (<img
            width={'20px'}
            src={sun}
            alt="drop"
          />)}
        />
        <span>{powerPlant.energyType}</span>
      </Space>
    </Card>
  );
}
