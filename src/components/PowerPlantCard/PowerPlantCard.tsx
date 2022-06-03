import { Card } from 'antd';
export type PowerPlantType = {
  title: string,
  price: number,
  capacity: number,
}

interface PowerPlantProps {
  powerPlant: PowerPlantType;
}

export function PowerPlantCard({powerPlant}: PowerPlantProps){
  return (
          <Card title={powerPlant.title}>
            <p>Capacity: {powerPlant.capacity}</p>
            <p>Price: {powerPlant.price}</p>
          </Card>
  )
}
