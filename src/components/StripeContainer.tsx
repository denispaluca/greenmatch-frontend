/* eslint-disable no-tabs */
/* eslint-disable indent */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import IbanForm from './IbanForm';

// eslint-disable-next-line max-len
const stripePromise = loadStripe('pk_test_51LDTGtLY3fwx8Mq44A7wpR1YFpeZmJQpxayq4JSR4FV46W11zHt8i0QDPMPaBJ3NTWFdEfVnTpuUOxoaxFUsEdpK00THi7Wfh9');

export function StripeContainer() {
	return (
		<>
			<Elements stripe={stripePromise}>
				<IbanForm />
			</Elements>
		</>
	);
}

export default StripeContainer;
