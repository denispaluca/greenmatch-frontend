/* eslint-disable indent */
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
  Spin,
} from 'antd';
import {
  RightOutlined,
  LeftOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContractDetails } from '../../components';
import { IbanElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './IBANelement.css';
import { PpaContractDetails } from '../../types';
import { SetupIntentResult } from '@stripe/stripe-js';
import { createSetupIntent } from '../../services/api/StripeProvider';
import PPAProvider from '../../services/api/PPAProvider';
import { Offer, SingleDuration } from '../../types/offer';
import { PPADurations } from '../../types/powerplant';
import OfferProvider from '../../services/api/OfferProvider';
import UserDetailsProvider from '../../services/api/userDetailsProvider';
import { UserInformation } from '../../types/user';
import { ownerValidator } from '../../validators/accountOwner';
import styles from '../Conclusion/Conclusion.module.scss';

const { Step } = Steps;
const LINK_CONSUMER_DASHBOARD = '/offers';

type RadioOptions = {
  label: string;
  value: number;
  disabled?: boolean;
};

// Unused
/* const radioOptionConf: RadioOptions[] = [
  { label: '5 Years', value: 5 },
  { label: '10 Years', value: 10 },
  { label: '15 Years', value: 15 },
]; */

const configuredFilter = {
  amount: 1500,
  duration: 5,
};

// Filters based on given number
// array the options a user can choose during ppa negotiation
const setPossibleDurations = (durations: PPADurations) => {
  const res: RadioOptions[] = [];

  // Five
  if (durations.five) {
    res.push({ label: '5 Years', value: 5 });
  } else {
    res.push({ label: '5 Years', value: 5, disabled: true });
  }

  // Ten
  if (durations.ten) {
    res.push({ label: '10 Years', value: 10 });
  } else {
    res.push({ label: '10 Years', value: 10, disabled: true });
  }

  // Fifteen
  if (durations.fifteen) {
    res.push({ label: '15 Years', value: 15 });
  } else {
    res.push({ label: '15 Years', value: 15, disabled: true });
  }

  return res;
};

// Get next possible starting date
// for ppa !!Never use this date in backend for ppa contract - user input!!
const getStartDate = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};


// Init Contract Details with fetched data
const initPpaDetails = (ppo: Offer, buyerInfo: UserInformation) => {
  const ppaDetails: PpaContractDetails = {
    supplier: ppo.supplierName,
    supplierId: ppo.supplierId,
    buyer: buyerInfo.company.name,
    buyerId: buyerInfo._id,
    buyerEmail: buyerInfo.email,
    type: ppo.energyType,
    plant: ppo.name,
    plantId: ppo._id,
    price: ppo.price,
    start: getStartDate(),
  };

  return ppaDetails;
};

// mandate acceptance text
const mandateAcceptanceText =
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

/*
* Elements can use a placeholder as an example IBAN that reflects
* the IBAN format of your customer's country. If you know your
* customer's country, we recommend that you pass it to the Element as the
* placeholderCountry.
*/
const IBAN_ELEMENT_OPTIONS = {
  supportedCountries: ['SEPA'],
  placeholderCountry: 'DE',
  style: IBAN_STYLE,
};

// In order to set filter values as
// default handover of this parameters is necessary
export function Conclusion() {
  const [step, setStep] = useState(0);
  const [ppaForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [ppaProps, setPpaProps] = useState<PpaContractDetails>();
  const { id } = useParams();
  const [offerDetails, setOfferDetails] = useState<Offer>();
  const [durationOptions, setDurationOptions] = useState<RadioOptions[]>();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch PowerPlant Details
  useEffect(() => {
    OfferProvider.get(id!)
      .then((offer) => {
        console.log('Loaded Offer Det', offer);
        setOfferDetails(offer);
        setDurationOptions(setPossibleDurations(offer.durations));
        UserDetailsProvider.get()
          .then((uData) => {
            console.log('UData', uData);
            setPpaProps(initPpaDetails(offer, uData));
          })
          .catch((error) => {
            console.log('Failed to fetch User Data', error);
          });
      })
      .catch((error) => {
        console.log('Failed to fetch PP Details', error);
      });
  }, [id]);

  const handleNext = async () => {
    ppaForm
      .validateFields()
      .then((values) => {
        console.log('Form Values ', values);
        setStep((prev) => prev + 1);
        setPpaProps((prev) => Object.assign(prev!, values));
        console.log(ppaProps);
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
      // To do: error handling
      .then(async (values) => {
        setIsLoading(true);
        /*
        * Stripe.js has not yet loaded.
        * Make sure to disable form submission until Stripe.js has loaded.
        */
        if (!stripe || !elements) {
          return;
        }

        // create setup intent
        const setupIntent = await createSetupIntent();
        console.log('Stripe client secret: ' + setupIntent.client_secret);

        // iban information
        const owner = values.owner;
        const iban = elements.getElement(IbanElement);

        // confirm setup intent and store iban information from customer
        const stripeSetupIntent: SetupIntentResult =
          await stripe.confirmSepaDebitSetup(setupIntent.client_secret, {
            payment_method: {
              sepa_debit: iban!,
              billing_details: {
                name: owner,
                email: ppaProps!.buyerEmail,
              },
            },
          });
        console.log('Confirmed setup intent: ' + stripeSetupIntent);

        if (!stripeSetupIntent.error) {
          // get payment method id
          const stripePaymentMethod: string =
            String(stripeSetupIntent.setupIntent.payment_method);
          console.log('Stripe payment method id: ' + stripePaymentMethod);

          // create PPA
          const params = {
            powerplantId: ppaProps!.plantId,
            duration: ppaProps!.duration! as SingleDuration,
            amount: ppaProps!.amount!,
            stripePaymentMethod: stripePaymentMethod,
          };
          await PPAProvider.create(params);

          ppaForm.resetFields();
          paymentForm.resetFields();
          setIsLoading(false);
          setStep((prev) => prev + 1);
        } else {
          // error when confirming setup intent
          console.log(stripeSetupIntent.error.message);
        }
      })
      .catch((info) => {
        console.log('Validation failed: ', info);
      });
  };

  // Returns the corresponding form element depending on the step
  const conclusionForm = useMemo(() => {
    if (!offerDetails || !durationOptions || !ppaProps) {
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
                  (at max ${offerDetails.availableCapacity} kWh)`}
                  name="amount"
                  rules={[
                    { required: true, message: 'Please specify amount!' },
                  ]}
                >
                  <InputNumber
                    type="number"
                    style={{ width: '100%' }}
                    min={0}
                    max={offerDetails.availableCapacity}
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
                  label="Account Owner"
                  name="owner"
                  rules={[
                    {
                      validator: (_, value) => {
                        return ownerValidator(value);
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="Name"
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="IBAN"
                  name="iban"
                  rules={[{
                    required: true,
                    message: 'Please input your IBAN!',
                  }]}
                >
                  <IbanElement options={IBAN_ELEMENT_OPTIONS} />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row justify='center'>
            {(isLoading) ?
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 40 }}
                  />}
              /> :
              <Alert
                message={mandateAcceptanceText}
                type="success"
                style={{ width: '80%' }}
              />}
          </Row>
          <Row>
            <Col
              span={4}
              offset={4}
            >
              <Button
                type="text"
                onClick={() => setStep((prev) => prev - 1)}
                disabled={isLoading}
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
                disabled={isLoading}
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
          You will find a corresponding acknowledgement email in your postbox`}
          extra={[
            // eslint-disable-next-line react/jsx-key
            <Link to={LINK_CONSUMER_DASHBOARD}>
              <Button type="primary">Back to PPA Listing</Button>
            </Link>,
          ]}
        />
      );
    }
  }, [step, offerDetails, durationOptions, ppaProps, isLoading]);

  return (
    <div className={styles.supplierdashboard}>
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
    </div>
  );
}
