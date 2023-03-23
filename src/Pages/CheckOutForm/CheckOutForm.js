import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CheckOutForm = () => {
        const [cardError, setCardError] = useState('');
        const stripe = useStripe();
        const elements = useElements();
        const handleSubmit = async (event) => {
                event.preventDefault();

                if (!stripe || !elements) {
                        // Stripe.js has not loaded yet. Make sure to disable
                        // form submission until Stripe.js has loaded.
                        return;
                }

                const card = elements.getElement(CardElement);

                if (card == null) {
                        return;
                }

                // Use your card Element with other Stripe.js APIs
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                        type: 'card',
                        card,
                });
                if (error) {
                        setCardError(error.message);
                }
                else {
                        setCardError('');
                        let sure = window.confirm('Are you sure to pay?');
                        if (sure) {
                                toast.success('Successfully Paid!')
                        }
                        else {
                                toast.error('Please Try Again!')
                        }
                }
        }
        return (
                <div>
                        <form className='bg-white mx-auto p-12 card shadow-lg mt-8' onSubmit={handleSubmit}>
                                <CardElement
                                        options={{
                                                style: {
                                                        base: {
                                                                fontSize: '16px',
                                                                color: '#424770',
                                                                '::placeholder': {
                                                                        color: '#aab7c4',
                                                                },
                                                        },
                                                        invalid: {
                                                                color: '#9e2146',
                                                        },
                                                },
                                        }}
                                />
                                <button className="btn btn-dark bg-yellow-500 border mt-8" type="submit" disabled={!stripe}>
                                        Pay
                                </button>
                                <div className="pt-2 ms-2 text-red-600">
                                        {
                                                cardError ? <p>{cardError}</p> : ''
                                        }
                                </div>
                        </form>
                </div>
        );
};

export default CheckOutForm;