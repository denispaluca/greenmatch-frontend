/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { Card, Space } from 'antd';
import Icon, { SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { StatusDisplay } from '../StatusDisplay/StatusDisplay';
import { PowerPlant } from '../../types/powerplant';
import { EnergyTypeDisplay } from '../EnergyTypeDisplay/EnergyTypeDisplay';


interface PowerPlantProps {
  powerPlant: PowerPlant;
}

export function PowerPlantCard({ powerPlant }: PowerPlantProps) {
  const navigate = useNavigate();

  return (
    <Card
      style={{ borderRadius: '10px', overflow: 'hidden' }}
      headStyle={{ fontWeight: '200' }}
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
        <EnergyTypeDisplay
          type={powerPlant.energyType}
          size={'20'}
        />
      </Space>
    </Card>
  );
}
