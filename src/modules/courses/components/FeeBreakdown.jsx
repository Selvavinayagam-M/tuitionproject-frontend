import React from 'react';

const FeeBreakdown = ({ fees }) => {
  // fees object: { tuition: 5000, material: 1000, admission: 500 }

  const subtotal = fees.tuition + fees.material + fees.admission;
  const gst = subtotal * 0.18; // Assuming 18% GST
  const total = subtotal + gst;

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Fee Structure</h4>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Tuition Fee (Monthly)</span>
          <span className="font-medium">₹{fees.tuition.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Study Material Charges</span>
          <span className="font-medium">₹{fees.material.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Admission Fee (One-time)</span>
          <span className="font-medium">₹{fees.admission.toLocaleString()}</span>
        </div>

        <div className="border-t border-gray-100 my-2"></div>

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>GST (18%)</span>
          <span>₹{gst.toFixed(0).toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-gray-300 my-4"></div>

      <div className="flex justify-between items-end">
        <span className="font-bold text-gray-900">Total Payable</span>
        <span className="text-2xl font-extrabold text-blue-900">₹{total.toFixed(0).toLocaleString()}</span>
      </div>

      <p className="text-xs text-center text-gray-500 mt-4 bg-yellow-50 p-2 rounded border border-yellow-100">
        100% Refundable if cancelled within 7 days of enrollment.
      </p>
    </div>
  );
};

export default FeeBreakdown;