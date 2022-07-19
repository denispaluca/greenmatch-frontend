/* eslint-disable indent */
import Icon from '@ant-design/icons';
import drop from '../../assets/images/icons/drop.png';
import windmill from '../../assets/images/icons/windmill.png';
import sun from '../../assets/images/icons/sun.png';
import { Space } from 'antd';
import { EnergyType } from '../../types/powerplant';

interface EnergyTypeDisplayProps {
  type: EnergyType;
  size: string;
}

// return corresponding energy type symbol
const getSymbol = (type: EnergyType) => {
  switch (type) {
    case 'hydro':
      return drop;
    case 'solar':
      return sun;
    default:
      return windmill;
  }
};

export function EnergyTypeDisplay({ type, size }: EnergyTypeDisplayProps) {
  return (
    <Space>
      <Icon
        component={() => (<img
          width={size}
          src={getSymbol(type)}
          alt="icon"
        />)}
      />
      <span>{type}</span>
    </Space>
  );
}
