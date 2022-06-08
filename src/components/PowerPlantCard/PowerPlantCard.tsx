import { Card, Space } from 'antd';
import { SettingOutlined, CloseCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export enum EnergyType {
  Solar,
  Wind,
  Hydro
}

export type PowerPlantType = {
  name: string,
  location: string,
  type: EnergyType,
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
        <Link to="/login"><SettingOutlined /></Link>,
        <Space style={{color:'#ff8178'}}><CloseCircleFilled/>Offline</Space>
      ]}
    >
      <p>Location: {powerPlant.location}</p>
      <p>Type: {EnergyType[powerPlant.type]}</p>
    </Card>
  )
}
