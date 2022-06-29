/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import {
  Button,
  Row,
  Col,
  Steps,
  Form,
  Radio,
  InputNumber,
  Result,
  Alert,
  Input,
} from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContractDetails } from '../../components';
import { IbanElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './SepaPayment.css';
import {
  EnergyTypes,
  PowerPlantOffer,
  PpaContractDetails,
  UserData,
} from '../../types';

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

// Mandate acceptance text
const mandateAcceptance =
  < div >
    By providing your payment information and confirming this payment, you
    authorise (A) GreenMatch and Stripe, our payment service provider
    and/or PPRO, its local service provider, to send instructions to your
    bank to debit your account and (B) your bank to debit your account in
    accordance with those instructions. As part of your rights, you are
    entitled to a refund from your bank under the terms and conditions of
    your agreement with your bank. A refund must be claimed within 8 weeks
    starting from the date on which your account was debited. Your rights
    are explained in a statement that you can obtain from your bank. You
    agree to receive notifications for future debits up to 2 days before
    they occur.
  </div >;

// Custom styling can be passed as options when creating an Element.
const IBAN_STYLE = {
  base: {
    'color': '#32325d',
    'fontSize': '14px',
    'fontWeight': '100',
    '::placeholder': {
      color: '#BFBFBF',
    },
    ':-webkit-autofill': {
      color: '#32325d',
    },
  },
  invalid: {
    'color': '#fa755a',
    'iconColor': '#fa755a',
    ':-webkit-autofill': {
      color: '#fa755a',
    },
  },
};

const IBAN_ELEMENT_OPTIONS = {
  supportedCountries: ['SEPA'],
  // Elements can use a placeholder as an example IBAN that reflects
  // the IBAN format of your customer's country. If you know your
  // customer's country, we recommend that you pass it to the Element as the
  // placeholderCountry.
  placeholderCountry: 'DE',
  style: IBAN_STYLE,
};

// creates setup intent and returns client secret
const createSetupIntent = async (custId: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer: custId }),
  };
  const response = await fetch(
    'http://localhost:8080/api/stripe/setupIntent',
    requestOptions);
  const data = await response.json();
  return data.client_secret;
};

// creates subscription
const createSubscription = async (
  customer: string,
  anchor: string,
  cancelAt: string,
  price: string,
  paymentMethod: string,
) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: customer,
      price,
      cancel_at: cancelAt,
      billing_cycle_anchor: anchor,
      default_payment_method: paymentMethod,
    }),
  };
  await fetch(
    'http://localhost:8080/api/stripe/subscribe',
    requestOptions);
  console.log('Subscription created!');
};

// In order to set filter values as
// default handover of this parameters is necessary
export function Conclusion() {
  const [step, setStep] = useState(0);
  const [ppaForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [ppaProps, setPpaProps] = useState<PpaContractDetails>();
  const { id } = useParams();
  const [ppDetails, setPpDetails] = useState<PowerPlantOffer>();
  const [durationOptions, setDurationOptions] = useState<RadioOptions[]>();
  const stripe = useStripe();
  const elements = useElements();

  // the following data are needed to create subscription
  const customer: string = 'cus_LxdND2EECX1eIf';
  const price: string = 'price_1LDTWwLY3fwx8Mq4aQkG4GfA';
  const cancelAt: string = '1662019200';
  const anchor: string = '1656662400';

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
  const handleBuy = () => {
    paymentForm
      .validateFields()
      .then(async (values) => {
        /*
        * Stripe.js has not yet loaded.
        * Make sure to disable form submission until Stripe.js has loaded.
        */
        if (!stripe || !elements) {
          return;
        }

        const email: string = values.email;
        const owner: string = values.owner;
        const iban = elements.getElement(IbanElement);
        const clientSecret = await createSetupIntent(customer);

        // confirm setup intent and store iban information from customer
        const result = await stripe.confirmSepaDebitSetup(clientSecret, {
          payment_method: {
            sepa_debit: iban!,
            billing_details: {
              name: owner,
              email: email,
            },
          },
        });
        if (result.error) {
          // error when confirming setup intent
          console.log(result.error.message);
        } else {
          console.log('IBAN added to setup intent');
          ppaForm.resetFields();
          paymentForm.resetFields();
          console.log(result);
          const paymentMethod = String(result.setupIntent.payment_method);
          createSubscription(customer, anchor, cancelAt, price, paymentMethod);
          setStep((prev) => prev + 1);
        }
      })
      .catch((info) => {
        console.log('Validation failed: ', info);
      });
  };

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
          <Row justify="center">
            <Col
              offset={6}
              span={12}
            >
              <h2>Payment Details</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col
              offset={4}
              span={16}
            >
              <Form
                name="payment"
                form={paymentForm}
                layout="vertical"
                wrapperCol={{ span: 18 }}
                autoComplete="off"
              >
                <Form.Item
                  label="E-Mail"
                  name="email"
                  rules={[{ required: true, message: 'Please input your E-Mail!' }]}
                >
                  <Input
                    placeholder="jane@example.com"
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Account Owner"
                  name="owner"
                  rules={[
                    { required: true, message: 'Please input the account owner!' },
                  ]}
                >
                  <Input
                    placeholder="Jane Doe"
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="IBAN"
                  name="iban"
                  rules={[{ required: true, message: 'Please input your IBAN!' }]}
                >
                  <IbanElement options={IBAN_ELEMENT_OPTIONS} />
                </Form.Item>
                <Alert
                  message={mandateAcceptance}
                  type="warning"
                />
              </Form>
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
                onClick={handleBuy}
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
          subTitle={`Congratulations, your PPA has been concluded. 
          You will find a corresponding acknowledgement E-Mail in your postbox`}
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
