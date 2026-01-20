import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const CheckoutForm = ({ onSuccess, onClose, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL is required for some payment methods, but we can handle it 
                // if we don't redirect. However, for PaymentElement, redirect is often default 
                // unless we use redirect: 'if_required'.
                return_url: window.location.origin + '/student/fees',
            },
            redirect: 'if_required'
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Manual success handling if not redirected
            toast.success("Payment Successful!");
            onSuccess(paymentIntent);
            setIsProcessing(false);
        } else {
            // Unexpected state
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="mb-4 text-center">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-3xl font-bold text-gray-800">₹{amount}</p>
                </div>
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                    {errorMessage}
                </div>
            )}

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isProcessing}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isProcessing ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        "Pay Now"
                    )}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
