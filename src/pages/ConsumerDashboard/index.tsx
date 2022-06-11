import { Row, Col, Radio, CheckboxOptionType, InputNumber, Checkbox, Divider, Slider, Button } from "antd";
import React, { useState, useEffect } from "react";

type PPADuration = 5 | 10 | 15;

const durationOptions: CheckboxOptionType[] = [
  { label: '5 years', value: 5 },
  { label: '10 years', value: 10 },
  { label: '15 years', value: 15 }
];

type EnergyTypes = 'wind' | 'solar' | 'hydro';

const energyOptions: CheckboxOptionType[] = [
  { label: 'Wind', value: 'wind' },
  { label: 'Solar', value: 'solar' },
  { label: 'Hydro', value: 'hydro' }
];

const ConsumerDasboard: React.FC = () => {
  const [duration, setDuration] = useState<PPADuration>();
  const [priceStart, setPriceStart] = useState<number>();
  const [priceEnd, setPriceEnd] = useState<number>();
  const [acceptedEnergyTypes, setAcceptedEnergyTypes] = useState<EnergyTypes[]>([]);
  const [nrEmpolyees, setNrEmpolyees] = useState(10);
  const [yearlyConsumption, setYearlyConsumption] = useState(0);

  const reset = () => {
    setDuration(undefined);
    setPriceStart(undefined);
    setPriceEnd(undefined);
    setAcceptedEnergyTypes([]);
    setNrEmpolyees(10);
    setYearlyConsumption(0);
  }

  return (<>
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
                <Row>
                  <InputNumber
                    min={0}
                    max={100000}
                    value={priceStart}
                    onChange={setPriceStart}
                  />

                  Cent / kWh
                </Row>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <h3>To</h3>
              </Col>

              <Col span={12}>
                <Row>
                  <InputNumber
                    min={0}
                    max={100000}
                    value={priceEnd}
                    onChange={setPriceEnd}
                  />

                  Cent / kWh
                </Row>
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
                  min={0}
                  max={1000}
                  value={nrEmpolyees}
                  onChange={setNrEmpolyees}
                />
              </Col>
            </Row>
            <Slider
              min={0}
              max={1000}
              value={nrEmpolyees}
              onChange={setNrEmpolyees}
            />

            <Divider> OR </Divider>
            <Row>
              Yearly Consumption
            </Row>
            <Row>
              <InputNumber
                min={0}
                max={100000}
                value={yearlyConsumption}
                onChange={setYearlyConsumption}
              />
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row justify="center">
      <Button type="primary" onClick={reset}>Reset</Button>
      <Button type="primary">Find</Button>
    </Row>
  </>);
}

export default ConsumerDasboard;