import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { StatusDisplay } from '../StatusDisplay/StatusDisplay';
import { EnergyTypeEnum, PowerPlantType } from '../../types';


interface PowerPlantProps {
  powerPlant: PowerPlantType;
}

export function PowerPlantCard({ powerPlant }: PowerPlantProps) {
  return (
    <Card
      style={{ borderRadius: "20px", overflow: "hidden" }}
      hoverable
      title={powerPlant.name}
      actions={[
        <Link to={`powerplant/${powerPlant.id}/edit`}><SettingOutlined /></Link>,
        <StatusDisplay live={powerPlant.live}/>
      ]}
    >
      <p>Location: {powerPlant.location}</p>
      <p>Type: {EnergyTypeEnum[powerPlant.type]}</p>
    </Card>
  )
}
