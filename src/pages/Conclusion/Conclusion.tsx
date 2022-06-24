import {
  Button,
  Row,
  Col,
  Steps,
  Form,
  Radio,
  InputNumber,
  Result,
} from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContractDetails } from '../../components';
import {
  EnergyTypes,
  PowerPlantOffer,
  PpaContractDetails,
  UserData,
} from '../../types';
import StripeContainer from '../../components/StripeContainer';

const { Step } = Steps;
const LINK_CONSUMER_DASHBOARD = '/offers';

type RadioOptions = {
  label: string;
  value: number;
  disabled?: boolean;
};

const radioOptionConf: RadioOptions[] = [
  { label: '5 Years', value: 5 },
  { label: '10 Years', value: 10 },
  { label: '15 Years', value: 15 },
];

const configuredFilter = {
  amount: 1500,
  duration: 5,
};

// Filters based on given number
// array the options a user can choose during ppa negotiation
const setPossibleDurations = (durations: number[]) => {
  const possibleDurations: RadioOptions[] = radioOptionConf.map((e) => {
    if (durations.includes(e.value)) {
      return e;
    } else {
      return { ...e, disabled: true };
    }
  });

  return possibleDurations;
};

// Get next possible starting date
// for ppa !!Never use this date in backend for ppa contract - user input!!
const getStartDate = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

// Fetches Power Plant props from backend - since
// using dummy backend some data is added manualy e.g. duration
const fetchPlantDetails = async (id: any) => {
  const powerplant = await fetch(
    `https://62a44ae6259aba8e10e5a1d8.mockapi.io/deals/${id}`,
  );
  const ppJSON = await powerplant.json();
  const energyTypes: EnergyTypes[] = ['wind', 'solar', 'hydro'];
  const duration = [5, 15];
  const energyType = energyTypes[1];
  const remainingCapacity = 2000;
  return {
    ...ppJSON,
    duration,
    energyType,
    remainingCapacity,
  };
};

// fetch user data from backend - right now just dummy data TODO
const fetchUserData = async () => {
  return { companyName: 'Energiesucher GmbH', companyId: 2 };
};

// Init Contract Details with fetched data
const initPpaDetails = (ppo: PowerPlantOffer, buyerInfo: UserData) => {
  const ppaDetails: PpaContractDetails = {
    supplier: ppo.companyName,
    supplierId: 1,
    buyer: buyerInfo.companyName,
    buyerId: buyerInfo.companyId,
    type: ppo.energyType,
    plant: ppo.powerplantName,
    plantId: Number(ppo.id),
    price: ppo.price,
    start: getStartDate(),
  };

  return ppaDetails;
};

// In order to set filter values as
// default handover of this parameters is necessary
export function Conclusion() {
  const [step, setStep] = useState(0);
  const [ppaForm] = Form.useForm();
  // const [paymentForm] = Form.useForm();
  const [ppaProps, setPpaProps] = useState<PpaContractDetails>();
  const { id } = useParams();
  const [ppDetails, setPpDetails] = useState<PowerPlantOffer>();
  const [durationOptions, setDurationOptions] = useState<RadioOptions[]>();

  // Fetch Power Plant Details from backend
  useEffect(() => {
    fetchPlantDetails(id)
      .then((details) => {
        console.log('Got PP Details', details);
        setPpDetails(details);
        setDurationOptions(setPossibleDurations(details.duration));
      })
      .catch((info) => {
        console.log('Fetching of Plant Data failed', info);
      });
  }, []);

  // Fetch User Data an init contract details
  useEffect(() => {
    fetchUserData()
      .then((uData) => {
        console.log(ppDetails);
        setPpaProps(initPpaDetails(ppDetails!, uData));
      })
      .catch((info) => {
        console.log('Fetching of User Data and Initial PPA Setup failed', info);
      });
  }, [ppDetails]);

  const handleNext = () => {
    ppaForm
      .validateFields()
      .then((values) => {
        console.log('Form Values ', values);
        setStep((prev) => prev + 1);
        setPpaProps((prev) => Object.assign(prev!, values));
      })
      .catch((info) => {
        console.log('Validate failed: ', info);
      });
  };

  // Use this function to init payment
  // process in the backend + store newly created ppa in db
  /* const handleBuy = () => {
    paymentForm
      .validateFields()
      .then((values) => {
        setPpaProps((prev) => Object.assign(prev!, values));
        console.log('PPA Contract Details: ', ppaProps);
        setStep((prev) => prev + 1);
        ppaForm.resetFields();
        paymentForm.resetFields();
      })
      .catch((info) => {
        console.log('Validation failed: ', info);
      });
  }; */

  // Returns the corresponding form element depending on the step
  const conclusionForm = useMemo(() => {
    if (!ppDetails || !durationOptions || !ppaProps) {
      return <div>Loading</div>;
    } else if (step === 0) {
      return (
        <>
          <Row justify="center">
            <Col
              offset={6}
              span={12}
            >
              <h2>PPA Properties</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col
              offset={6}
              span={12}
            >
              <Form
                name="ppa_props"
                layout="vertical"
                form={ppaForm}
                wrapperCol={{ span: 18 }}
                initialValues={configuredFilter}
                autoComplete="off"
              >
                <Form.Item
                  label="Duration"
                  name="duration"
                  rules={[
                    { required: true, message: 'Please select duration' },
                  ]}
                >
                  <Radio.Group
                    options={durationOptions}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </Form.Item>

                <Form.Item
                  label={`Amount per Year in kWh 
                  (at max ${ppDetails.remainingCapacity} kWh)`}
                  name="amount"
                  rules={[
                    { required: true, message: 'Please specify amount!' },
                  ]}
                >
                  <InputNumber
                    type="number"
                    style={{ width: '100%' }}
                    min={0}
                    max={ppDetails.remainingCapacity}
                    addonAfter="kWh/year"
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col
              span={4}
              offset={4}
            >
              <Link to={LINK_CONSUMER_DASHBOARD}>
                <Button type="text">
                  <LeftOutlined /> Listing
                </Button>
              </Link>
            </Col>
            <Col
              span={4}
              offset={12}
            >
              <Button
                type="text"
                onClick={handleNext}
              >
                {' '}
                Next <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    } else if (step === 1) {
      return (
        <>
          <Row justify="center">
            <Col
              offset={6}
              span={12}
            >
              <h2>Confirm Contract Details</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col
              offset={6}
              span={12}
            >
              <ContractDetails
                ppaData={ppaProps}
                labelWidth={8}
                contentWidth={12}
              />
            </Col>
          </Row>
          <Row>
            <Col
              span={4}
              offset={4}
            >
              <Button
                type="text"
                onClick={() => setStep((prev) => prev - 1)}
              >
                <LeftOutlined /> Back
              </Button>
            </Col>
            <Col
              span={4}
              offset={12}
            >
              <Button
                type="text"
                onClick={handleNext}
              >
                Confirm <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <StripeContainer />
          <Row>
            <Col
              span={4}
              offset={4}
            >
              <Button
                type="text"
                onClick={() => setStep((prev) => prev - 1)}
              >
                <LeftOutlined /> Back
              </Button>
            </Col>
            <Col
              span={4}
              offset={12}
            >
              <Button
                type="text"
              >
                Buy <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <Result
          status="success"
          title="Successfully concluded PPA!"
          subTitle={`Congratulations your PPA has been concluded. 
          You will find a corresponding acknowledement E-mail in your postbox`}
          extra={[
            // eslint-disable-next-line react/jsx-key
            <Link to={LINK_CONSUMER_DASHBOARD}>
              <Button type="primary">Back to PPA Listing</Button>
            </Link>,
          ]}
        />
      );
    }
  }, [step, ppDetails, durationOptions, ppaProps]);

  return (
    <>
      <Row>
        <Col
          span={12}
          offset={6}
        >
          <Steps current={step}>
            <Step title="PPA Properties" />
            <Step title="Confirm" />
            <Step title="Payment" />
            <Step title="Done" />
          </Steps>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          offset={6}
        >
          {conclusionForm}
        </Col>
      </Row>
    </>
  );
}
