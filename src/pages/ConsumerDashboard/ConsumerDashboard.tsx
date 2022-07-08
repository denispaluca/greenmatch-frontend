import {
  Row,
  Col,
  Radio,
  CheckboxOptionType,
  InputNumber,
  Checkbox,
  Divider, Slider, Button,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { OffersTable } from '../../components';
import { EnergyTypes, PPADuration } from '../../types';
import OfferProvider from '../../services/api/OfferProvider';
import { EnergyOptions, Offer, OfferQuery } from '../../types/offer';

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

const encodeEnergyType = (acceptedTypes: EnergyTypes[]) => {
  const res: EnergyOptions = { wind: false, solar: false, hydro: false };
  acceptedTypes.forEach((element) => {
    if (element === 'wind') {
      res.wind = true;
    }
    if (element === 'solar') {
      res.solar = true;
    }
    if (element === 'hydro') {
      res.hydro = true;
    }
  });

  return res;
};

const YEARLY_MWH_PER_EMPLOYEE = 4;

const ConsumerDasboard: React.FC = () => {
  const [duration, setDuration] = useState<PPADuration>();
  const [priceStart, setPriceStart] = useState<number>();
  const [priceEnd, setPriceEnd] = useState<number>();
  const [acceptedEnergyTypes, setAcceptedEnergyTypes] =
    useState<EnergyTypes[]>(['solar', 'wind', 'hydro']);
  const [nrEmpolyees, setNrEmpolyees] = useState(10);
  const [yearlyConsumption, setYearlyConsumption] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [maxCapacity, setMaxCapacity] = useState(100000);
  const [offers, setOffers] = useState<Offer[]>([]);

  // Fetch offers based on filtering
  const filterOffers = () => {
    console.log('Accepted Types', acceptedEnergyTypes);
    const query: OfferQuery = {
      priceStart: priceStart,
      priceEnd: priceEnd,
      energyTypes: encodeEnergyType(acceptedEnergyTypes),
      availableCapacity: yearlyConsumption,
    };

    // Filter for duration if checked
    if (duration) {
      query.duration = duration;
    }

    // Fetch filtered offers
    OfferProvider.list(query)
      .then((offers) => {
        setOffers(offers);
      })
      .catch((error) => {
        console.log('Failed to fetch filtered Offers', error);
      });
  };

  useEffect(() => {
    fetchOffersSetRange();
  }, []);


  const fetchOffersSetRange = async () => {
    OfferProvider.list()
      .then((offers) => {
        setOffers(offers);
        const maxP = Math.max(...offers.map((o) => o.price));
        const minP = Math.min(...offers.map((o) => o.price));
        const maxC = Math.max(...offers.map((o) => o.capacity));
        setMinPrice(minP);
        setMaxPrice(maxP);
        setPriceStart(minP);
        setPriceEnd(maxP);
        setMaxCapacity(maxC);
      })
      .catch((error) => {
        console.log('Failed to fetch Offers', error);
      });
  };

  const onChangePriceStart = (value: number) => {
    if (priceEnd && value > maxPrice) {
      setPriceEnd(undefined);
    }
    setPriceStart(value);
  };

  const onChangePriceEnd = (value: number) => {
    if (priceStart && value < minPrice) {
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
      <Row>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <h3>PPA Duration</h3>
            </Col>

            <Col span={12}>
              <Radio.Group
                options={durationOptions}
                onChange={(e) => setDuration(e.target.value as PPADuration)}
                value={duration}
                optionType="button"
                buttonStyle="solid"
              />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <h3>Price Range</h3>
            </Col>

            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h3>From</h3>
                </Col>

                <Col span={12}>
                  <InputNumber
                    min={minPrice}
                    max={maxPrice}
                    value={priceStart}
                    onChange={onChangePriceStart}
                    addonAfter="Cent / kWh"
                    step={1}
                  />
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <h3>To</h3>
                </Col>

                <Col span={12}>
                  <InputNumber
                    min={minPrice}
                    max={maxPrice}
                    value={priceEnd}
                    onChange={onChangePriceEnd}
                    addonAfter="Cent / kWh"
                  />
                </Col>
              </Row>
            </Col>
          </Row>


          <Row>
            <Col span={12}>
              <h3>Type</h3>
            </Col>

            <Col span={12}>
              <Checkbox.Group
                options={energyOptions}
                onChange={(e) => setAcceptedEnergyTypes(e as EnergyTypes[])}
                value={acceptedEnergyTypes}
              />
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={12}>
              <h3>Consumption</h3>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h3>Employees</h3>
                </Col>
                <Col span={12}>
                  <InputNumber
                    min={1}
                    max={maxEmployees}
                    value={nrEmpolyees}
                    onChange={onChangeEmployees}
                  />
                </Col>
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
                  addonAfter="kWh"
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-evenly">
        <Button
          type="primary"
          onClick={reset}
        >Reset
        </Button>
        <Button
          type="primary"
          onClick={filterOffers}
        >
          Find
        </Button>
      </Row>
      <Divider />

      <OffersTable offers={offers} />
    </>);
};

export { ConsumerDasboard };
