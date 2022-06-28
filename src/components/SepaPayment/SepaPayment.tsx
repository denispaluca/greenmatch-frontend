import { IbanElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Alert, Button, Col, Form, Input, Row } from 'antd';
import './SepaPayment.css';

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

type props = {
  onHandleBuy: () => void;
}

export default function SepaPayment(props: props) {
  const [paymentForm] = Form.useForm();
  const stripe = useStripe();
  const elements = useElements();

  // the following data are needed to create subscription
  const customer: string = 'cus_LxdND2EECX1eIf';
  const price: string = 'price_1LDTWwLY3fwx8Mq4aQkG4GfA';
  const cancelAt: string = '1662019200';
  const anchor: string = '1656662400';

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
          console.log('SEPA direct debit setup intent created!');
          console.log('Payment method added to setup intent!');
          console.log(result);
          const paymentMethod = String(result.setupIntent.payment_method);
          createSubscription(customer, anchor, cancelAt, price, paymentMethod);
          props.onHandleBuy();
        }
        // paymentForm.resetFields();
      })
      .catch((info) => {
        console.log('Validation failed: ', info);
      });
  };

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
                { required: true, message: 'Please input account owner!' },
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
              rules={[{ required: true, message: 'Please input IBAN!' }]}
            >
              <IbanElement options={IBAN_ELEMENT_OPTIONS} />
            </Form.Item>
            <Alert
              message={mandateAcceptance}
              type="warning"
            />
            <Button onClick={handleBuy}>
              Confirm Payment
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
