import { Card } from 'antd';
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
      onClick={() => {
        navigate('/ppa-overview/' + powerPlant.id);
      }}
      title={powerPlant.name}
      actions={[
        // eslint-disable-next-line react/jsx-key
        <Link to={`powerplant/${powerPlant.id}/edit`}>
          <SettingOutlined />
        </Link>,
        // eslint-disable-next-line react/jsx-key
        <StatusDisplay live={powerPlant.live} />,
      ]}
    >
      <p>Location: {powerPlant.location}</p>
      <p>Type: {EnergyTypeEnum[powerPlant.type]}</p>
    </Card>
  );
}
