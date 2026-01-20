import React from 'react';

const PaymentSummary = ({ formData }) => {
  return (
    <div className="space-y-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
      <h5 className="font-bold text-blue-900 mb-2">Summary</h5>
      <p><span className="font-semibold">Student:</span> {formData.studentName}</p>
      <p><span className="font-semibold">Class:</span> {formData.studentClass}</p>
      <p><span className="font-semibold">Parent:</span> {formData.parentName}</p>
      <p><span className="font-semibold">Contact:</span> {formData.parentPhone}</p>
    </div>
  );
};

export default PaymentSummary;