/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
* Use the CSS tab above to style your Element's container.
*/
import React, { useState } from 'react';
import { IbanElement, useElements, useStripe } from '@stripe/react-stripe-js';

// Custom styling can be passed as options when creating an Element.
const IBAN_STYLE = {
  base: {
    'color': '#32325d',
    'fontSize': '16px',
    '::placeholder': {
      color: '#aab7c4',
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

export function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('Jenny Rosen');
  const [email, setEmail] = useState('jenny.rosen@example.com');
  // helper for displaying status messages.
  const [messages, setMessages] = useState<any[]>([]);
  const addMessage = (message: any) => {
    setMessages((messages) => [...messages, message]);
  };

  const getClientSecret = async () => {
    const response = await fetch(
      'http://localhost:8080/api/pay',
    );
    const data = await response.json();
    return data.client_secret;
  };

  const handleSubmit = async (e: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      addMessage('Stripe.js has not yet loaded.');
      return;
    }

    // const clientSecret = await getClientSecret();
    const iban = elements.getElement(IbanElement);
    const accountholderName: string = e.target['accountholder-name'].value;
    const email: string = e.target.email.value;
    const clientSecret = await getClientSecret();

    const result = await stripe.confirmSepaDebitPayment(clientSecret, {
      payment_method: {
        sepa_debit: iban!,
        billing_details: {
          name: accountholderName,
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      console.log('Payment Succeeded');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row inline">
          <div className="col">
            <label>
              Name
              <input
                name="accountholder-name"
                placeholder="Jenny Rosen"
                required
              />
            </label>
          </div>

          <div className="col">
            <label>
              Email Address
              <input
                name="email"
                type="email"
                placeholder="jenny.rosen@example.com"
                required
              />
            </label>
          </div>
        </div>

        <div className="form-row">
          <label>
            IBAN
            <IbanElement options={IBAN_ELEMENT_OPTIONS} />
          </label>
        </div>

        <button
          type="submit"
        >
          Set up SEPA Direct Debit
        </button>
        {/* Display mandate acceptance text. */}
        <div className="mandate-acceptance">
          By providing your payment information and confirming this payment,
          you authorise (A) Rocket Rides and Stripe, our payment service
          provider, to send instructions to your bank to debit your account and
          (B) your bank to debit your account in accordance with those
          instructions. As part of your rights, you are entitled to a refund
          from your bank under the terms and conditions of your agreement with
          your bank. A refund must be claimed within 8 weeks starting from the
          date on which your account was debited. Your rights are explained in
          a statement that you can obtain from your bank. You agree to receive
          notifications for future debits up to 2 days before they occur.
        </div>
      </form>
    </>
  );
}

export default Payment;
