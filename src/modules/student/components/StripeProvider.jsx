import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { FiX } from 'react-icons/fi';

// Make sure to replace with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_sample');

const StripeProvider = ({ clientSecret, onClose, onSuccess, amount }) => {
    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
        },
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Secure Payment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <FiX size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {clientSecret ? (
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm onSuccess={onSuccess} onClose={onClose} amount={amount} />
                        </Elements>
                    ) : (
                        <div className="flex justify-center p-8">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StripeProvider;
