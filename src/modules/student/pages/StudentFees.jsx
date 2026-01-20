import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiCreditCard, FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import financeService from '../../../services/finance.service';
import useAuth from '../../../shared/hooks/useAuth';
import StripeProvider from '../components/StripeProvider';

const StudentFees = () => {
    // State
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Fees
    useEffect(() => {
        const fetchFees = async () => {
            try {
                const data = await financeService.getStudentFees();
                setFees(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching fees:", error);
                // Fallback to empty or toast error
                setLoading(false);
            }
        };
        fetchFees();
    }, []);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [selectedFee, setSelectedFee] = useState(null);

    const handlePay = async (fee) => {
        try {
            setLoading(true);
            const data = await financeService.createOrder(fee._id);
            setClientSecret(data.clientSecret);
            setSelectedFee(fee);
            setShowPaymentModal(true);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to initiate payment");
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async (paymentIntent) => {
        try {
            // Verify payment on backend to update status
            await financeService.verifyPayment(paymentIntent.id, selectedFee._id);

            toast.success("Payment Verified & Recorded!");
            // Update local state
            setFees(prev => prev.map(f => f._id === selectedFee._id ? { ...f, status: 'Paid' } : f));

            // Close modal
            setShowPaymentModal(false);
            setClientSecret('');
            setSelectedFee(null);
        } catch (error) {
            console.error(error);
            toast.error("Payment recorded locally but verification failed. Please contact support.");
        }
    };

    const generateReceipt = (fee) => {
        const doc = new jsPDF();

        // Receipt Header
        doc.setFillColor(34, 197, 94); // Green
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("PAYMENT RECEIPT", 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text("Tuition Management System", 105, 30, { align: 'center' });

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Transaction ID: TXN_${fee._id.substring(0, 8).toUpperCase()}`, 20, 60);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);

        doc.setLineWidth(0.5);
        doc.line(20, 80, 190, 80);

        doc.setFontSize(14);
        doc.text(`Fee Title: ${fee.title}`, 20, 95);
        doc.text(`Amount Paid: Rs. ${fee.amount}`, 20, 105);
        doc.text(`Payment Status: ${fee.status}`, 20, 115);

        doc.setTextColor(34, 197, 94);
        doc.setFontSize(16);
        doc.text("PAID", 160, 105, { angle: -15 });

        doc.save(`Receipt_${fee._id}.pdf`);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Fees & Payments 💳</h1>
                <p className="text-gray-500 text-sm">Manage your tuition fees securely.</p>
            </div>

            <div className="grid gap-4">
                {fees.map(fee => (
                    <div key={fee._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center transition hover:shadow-md">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${fee.status === 'Paid' ? 'bg-green-100 text-green-600' :
                                fee.status === 'Overdue' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                }`}>
                                <FiDollarSign />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">{fee.title}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <FiClock /> Due: {new Date(fee.dueDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="text-right flex items-center gap-6">
                            <div>
                                <span className="block text-2xl font-bold text-gray-900">₹{fee.amount}</span>
                                <span className={`text-xs font-bold uppercase tracking-wide ${fee.status === 'Paid' ? 'text-green-600' :
                                    fee.status === 'Overdue' ? 'text-red-600' : 'text-orange-500'
                                    }`}>
                                    {fee.status}
                                </span>
                            </div>

                            {fee.status !== 'Paid' && (
                                <button
                                    onClick={() => handlePay(fee)}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transform active:scale-95 transition-all"
                                >
                                    Pay Now
                                </button>
                            )}

                            {fee.status === 'Paid' && (
                                <button
                                    onClick={() => generateReceipt(fee)}
                                    className="text-gray-400 hover:text-green-600 font-medium text-sm flex items-center gap-1 transition-colors"
                                >
                                    <FiCheckCircle /> Receipt
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showPaymentModal && clientSecret && (
                <StripeProvider
                    clientSecret={clientSecret}
                    amount={selectedFee?.amount}
                    onClose={() => setShowPaymentModal(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};

export default StudentFees;
