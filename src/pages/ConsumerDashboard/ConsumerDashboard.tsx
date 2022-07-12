import {
  Row,
  Col,
  Radio,
  CheckboxOptionType,
  InputNumber,
  Checkbox,
  Divider, Slider, Button, Card,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { OffersTable } from '../../components';
import { EnergyTypes, PowerPlantOffer, PPADuration } from '../../types';

const durationOptions: CheckboxOptionType[] = [
  { label: '5 years', value: 5 },
  { label: '10 years', value: 10 },
  { label: '15 years', value: 15 },
];


const energyOptions: CheckboxOptionType[] = [
  { label: 'Wind', value: 'wind' },
  { label: 'Solar', value: 'solar' },
  { label: 'Hydro', value: 'hydro' },
];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
  // The maximum is exclusive and the minimum is inclusive
}


const YEARLY_MWH_PER_EMPLOYEE = 4;

const ConsumerDasboard: React.FC = () => {
  const [duration, setDuration] = useState<PPADuration>();
  const [priceStart, setPriceStart] = useState<number>();
  const [priceEnd, setPriceEnd] = useState<number>();
  const [acceptedEnergyTypes, setAcceptedEnergyTypes] =
    useState<EnergyTypes[]>([]);
  const [nrEmpolyees, setNrEmpolyees] = useState(10);
  const [yearlyConsumption, setYearlyConsumption] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [maxCapacity, setMaxCapacity] = useState(100000);
  const [offers, setOffers] = useState<PowerPlantOffer[]>([]);


  useEffect(() => {
    fetchPriceRange();
    fetchMaxCapacity();
    fetchOffers();
  }, []);

  const fetchPriceRange = async () => {
    // const response = await fetch('/api/price-range');
    const minPrice = getRandomInt(1, 50);
    const maxPrice = getRandomInt(minPrice, 100);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setPriceStart(minPrice);
    setPriceEnd(maxPrice);
  };

  const fetchMaxCapacity = async () => {
    // const response = await fetch('/api/max-capacity');
    const maxCapacity = getRandomInt(30000, 100000);
    setMaxCapacity(maxCapacity);
  };

  const fetchOffers = async () => {
    const offers = await fetch('https://62a44ae6259aba8e10e5a1d8.mockapi.io/deals');
    const durations: PPADuration[] = [5, 10, 15];
    const energyTYpes: EnergyTypes[] = ['wind', 'solar', 'hydro'];
    const offersJson: PowerPlantOffer[] =
      (await offers.json()).map((offer: PowerPlantOffer): PowerPlantOffer => {
        const duration = durations[getRandomInt(0, durations.length)];
        const energyType = energyTYpes[getRandomInt(0, energyTYpes.length)];
        const maxCapacity = getRandomInt(30000, 100000);
        const remainingCapacity = getRandomInt(0, maxCapacity);
        return {
          ...offer,
          duration,
          energyType,
          maxCapacity,
          remainingCapacity,
        };
      });

    setOffers(offersJson);
  };

  const onChangePriceStart = (value: number) => {
    if (priceEnd && value > priceEnd) {
      setPriceEnd(undefined);
    }
    setPriceStart(value);
  };

  const onChangePriceEnd = (value: number) => {
    if (priceStart && value < priceStart) {
      setPriceStart(undefined);
    }
    setPriceEnd(value);
  };

  const maxEmployees = Math.floor(maxCapacity / YEARLY_MWH_PER_EMPLOYEE);
  const onChangeEmployees = (value: number) => {
    setNrEmpolyees(value);
    setYearlyConsumption(value * YEARLY_MWH_PER_EMPLOYEE);
  };

  const reset = () => {
    setDuration(undefined);
    setPriceStart(undefined);
    setPriceEnd(undefined);
    setAcceptedEnergyTypes([]);
    setNrEmpolyees(10);
    setYearlyConsumption(0);
  };

  return (
    <>
      <h2>Find a suitable PPA partner</h2>
      <Card style={{ margin: 30 }}>
        <Row justify='space-around'>
          <Col span={8}>
            <Row justify='space-between'>
              <h3>Duration</h3>

              <Radio.Group
                options={durationOptions}
                onChange={(e) => setDuration(e.target.value as PPADuration)}
                value={duration}
                optionType="button"
                buttonStyle="solid"
              />
            </Row>

            <Row justify='space-between'>
              <h3>Price Range</h3>
              <div>
                <InputNumber
                  placeholder="From"
                  min={minPrice}
                  max={maxPrice}
                  value={priceStart}
                  onChange={onChangePriceStart}
                />
                <Divider type='vertical' />
                <InputNumber
                  placeholder='To'
                  min={minPrice}
                  max={maxPrice}
                  value={priceEnd}
                  onChange={onChangePriceEnd}
                />
                ¢ / KWh
              </div>
            </Row>


            <Row justify='space-between'>
              <h3>Type</h3>

              <Checkbox.Group
                options={energyOptions}
                onChange={(e) => setAcceptedEnergyTypes(e as EnergyTypes[])}
                value={acceptedEnergyTypes}
              />
            </Row>
          </Col>

          <Col span={8}>
            <Row justify='space-between'>
              <h3>Employees</h3>
              <InputNumber
                min={1}
                max={maxEmployees}
                value={nrEmpolyees}
                onChange={onChangeEmployees}
              />
            </Row>
            <Row justify="space-between">
              <Col>
                <UserOutlined style={{ fontSize: '150%' }} />
              </Col>
              <Col flex="auto">
                <Slider
                  min={1}
                  max={maxEmployees}
                  value={nrEmpolyees}
                  onChange={onChangeEmployees}
                />
              </Col>
              <Col >
                <TeamOutlined style={{ fontSize: '150%' }} />
              </Col>
            </Row>

            <Divider> OR </Divider>
            <Row justify="space-between">
              Yearly Consumption
              <InputNumber
                min={0}
                max={maxCapacity}
                value={yearlyConsumption}
                onChange={setYearlyConsumption}
                addonAfter="MWh"
              />
            </Row>
          </Col>
        </Row>
      </Card>
      <Row justify="space-evenly">
        <Button
          type="primary"
          onClick={reset}
        >Reset
        </Button>
        <Button type="primary">Find</Button>
      </Row>
      <Divider />

      <OffersTable offers={offers} />
    </>);
};

export { ConsumerDasboard };
