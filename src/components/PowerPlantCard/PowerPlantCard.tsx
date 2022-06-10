import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { StatusDisplay } from '../StatusDisplay/StatusDisplay';

export enum EnergyType {
  Solar,
  Wind,
  Hydro
}

export type PowerPlantType = {
  id: number,
  name: string,
  location: string,
  type: EnergyType,
  live: Boolean,
  currentPrice?: number,
  capacity?: number,
  duration?: number[],
}

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
      <p>Type: {EnergyType[powerPlant.type]}</p>
    </Card>
  )
}
