import { Row, Col} from 'antd';
import {useEffect, useState} from 'react';
import {PowerPlantType, PowerPlantCard} from './components';

export function Dashboard() {

  const [powerPlants, setPowerPlants] = useState<PowerPlantType[]>([]);

  useEffect(()=>{
     setPowerPlants([{
    title: 'Power Plant 1',
    price: 100,
    capacity: 100,
  },
  {
    title: 'Power Plant 2',
    price: 200,
    capacity: 200,
  },
    {
      title: 'Power Plant 3',
      price: 300,
      capacity: 300,
    },
    {
      title: 'Power Plant 4',
      price: 300,
      capacity: 300,
    }
  ])

  },[])

  return (
    <>
      <Row gutter={16}>
        { powerPlants && powerPlants.map((powerPlant) => (
          <Col span={8}>
            <PowerPlantCard powerPlant={powerPlant}/>
          </Col>
        ))
        }
      </Row>
    </>
  );
}

export default Dashboard;


