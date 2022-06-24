/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import { IbanElement } from '@stripe/react-stripe-js';
import './IbanFormStyles.css';
import { Alert, Button, Col, Form, Input, Row } from 'antd';

const warning =
  < div >
    By providing your payment information and confirming this payment,
    you authorise (A) GreenMatch and Stripe, our payment service
    provider, to send instructions to your bank to debit your account and
    (B) your bank to debit your account in accordance with those
    instructions. As part of your rights, you are entitled to a refund
    from your bank under the terms and conditions of your agreement with
    your bank. A refund must be claimed within 8 weeks starting from the
    date on which your account was debited. Your rights are explained in
    a statement that you can obtain from your bank. You agree to receive
    notifications for future debits up to 2 days before they occur.
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

export default function IbanForm({ onSubmit, disabled }: any) {
  const [paymentForm] = Form.useForm();

  const handleBuy = () => {
    paymentForm
      .validateFields()
      .then((values) => {
        console.log('Details: ', values);
        paymentForm.resetFields();
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
                name="accountholder-name"
                placeholder="jenny.rosen@example.com"
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
                name="accountholder-name"
                placeholder="Jenny Rosen"
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
            {/* Display mandate acceptance text. */}
            <Alert
              message={warning}
              type="warning"
            />
            <Button onClick={handleBuy}>
              OK
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
