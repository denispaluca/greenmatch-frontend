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
import styles from './ConsumerDashboard.module.scss';

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

const ConsumerDashboard: React.FC = () => {
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
    setAcceptedEnergyTypes(['solar', 'wind', 'hydro']);
    setNrEmpolyees(10);
    setYearlyConsumption(0);
  };

  return (
    <>
      <div className={styles.filter}>
        <Row>
          <div className={styles.text}>
            <h2>Find a suitable PPA partner</h2>
          </div>
        </Row>
        <Row>
          <Col
            offset={3}
            span={18}
          >
            <Row>
              <Col
                span={12}
              >
                <Row className={styles.filterrow}>
                  <Col span={24}>
                    <h3>PPA Duration</h3>
                    <Radio.Group
                      options={durationOptions}
                      onChange={(e) =>
                        setDuration(e.target.value as PPADuration)}
                      value={duration}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Col>
                </Row>
                <Row className={styles.filterrow}>
                  <Col span={20}>
                    <h3>Price Range</h3>
                    <Row justify="space-between">
                      <Col span={9}>
                        <InputNumber
                          min={minPrice}
                          max={maxPrice}
                          value={priceStart}
                          onChange={onChangePriceStart}
                          addonAfter="Cent / kWh"
                          step={1}
                        />
                      </Col>
                      <Col
                        span={2}
                      >
                        <h3>to</h3>
                      </Col>
                      <Col
                        span={9}
                      >
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
                <Row className={styles.filterrow}>
                  <Col span={24}>
                    <h3>Type</h3>
                    <Row>
                      <Col span={12}>
                        <Checkbox.Group
                          options={energyOptions}
                          onChange={(e) =>
                            setAcceptedEnergyTypes(e as EnergyTypes[])}
                          value={acceptedEnergyTypes}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <h3>Consumption</h3>
                <Row>
                  <Col span={24}>
                    <Row justify="space-between">
                      <Col>
                        <UserOutlined style={{ fontSize: '150%' }} />
                      </Col>
                      <Col span={9}>
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
                      <Col span={5}>
                        <InputNumber
                          min={1}
                          max={maxEmployees}
                          value={nrEmpolyees}
                          onChange={onChangeEmployees}
                          addonAfter="Employees"
                        />
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

            <Row justify='space-evenly'>
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
          </Col>
        </Row>
      </div>

      <div className={styles.text}>
        <p>Showing {offers.length} PPA offerings</p>
      </div>
      <OffersTable offers={offers} />
    </>);
};

export { ConsumerDashboard };
