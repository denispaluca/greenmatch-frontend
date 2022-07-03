/* eslint-disable react/jsx-key */
import { Card, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { StatusDisplay } from '../StatusDisplay/StatusDisplay';
import { EnergyTypeEnum, PowerPlantType } from '../../types';


interface PowerPlantProps {
  powerPlant: PowerPlantType;
}

export function PowerPlantCard({ powerPlant }: PowerPlantProps) {
  const navigate = useNavigate();
  return (
    <Card
      style={{ borderRadius: '20px', overflow: 'hidden' }}
      hoverable
      onClick={(event) => {
        navigate('/ppa-overview/' + powerPlant.id);
      }}
      title={powerPlant.name}
      actions={[
        <Link
          to={`powerplant/${powerPlant.id}/edit`}
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
      <p>Type: {EnergyTypeEnum[powerPlant.type]}</p>
    </Card>
  );
}
