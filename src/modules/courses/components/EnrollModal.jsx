import React, { useState } from 'react';
import { FaTimes, FaUser, FaUserTie, FaCreditCard, FaCheckCircle, FaLock } from 'react-icons/fa';
import Button from '../../../shared/components/Button';
import FeeBreakdown from './FeeBreakdown';
import PaymentSummary from './PaymentSummary';

const EnrollModal = ({ course, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '', studentClass: '', studentSchool: '',
    parentName: '', parentPhone: '', parentEmail: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    // API Call simulation
    alert(`Enrolled ${formData.studentName} for ${course.title}!`);
    onClose();
  };

  const steps = [
    { id: 1, label: 'Student Info', icon: <FaUser /> },
    { id: 2, label: 'Parent Details', icon: <FaUserTie /> },
    { id: 3, label: 'Fee Payment', icon: <FaCreditCard /> },
  ];

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Enrollment Form</h3>
            <p className="text-sm text-gray-500">Course: <span className="font-semibold text-blue-600">{course.title}</span></p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
            {steps.map((s) => (
              <div key={s.id} className={`flex flex-col items-center bg-white px-2 cursor-pointer`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= s.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110'
                  : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                  {step > s.id ? <FaCheckCircle /> : s.icon}
                </div>
                <span className={`text-xs mt-2 font-medium ${step >= s.id ? 'text-blue-600' : 'text-gray-400'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
          {step === 1 && (
            <div className="space-y-4 animate-slideIn">
              <h4 className="font-bold text-gray-900 text-lg mb-4">Student Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="input-field w-full p-2 border rounded-md" placeholder="Enter student name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Class</label>
                  <select name="studentClass" value={formData.studentClass} onChange={handleChange} className="input-field w-full p-2 border rounded-md bg-white">
                    <option value="">Select Class</option>
                    {[...Array(12).keys()].map(i => <option key={i} value={i + 1}>{i + 1}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                  <input type="text" name="studentSchool" value={formData.studentSchool} onChange={handleChange} className="input-field w-full p-2 border rounded-md" placeholder="Current school name" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-slideIn">
              <h4 className="font-bold text-gray-900 text-lg mb-4">Parent/Guardian Details</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
                  <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="input-field w-full p-2 border rounded-md" placeholder="Parent/Guardian Name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className="input-field w-full p-2 border rounded-md" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                    <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className="input-field w-full p-2 border rounded-md" placeholder="parent@example.com" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-slideIn">
              <h4 className="font-bold text-gray-900 text-lg mb-4">Review & Pay</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PaymentSummary formData={formData} />
                <div>
                  <FeeBreakdown fees={course.feeDetails || { tuition: 4000, material: 1000, admission: 500 }} />
                  <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                    <FaLock className="mr-1" /> Secure SSL Payment
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} className="px-6">Back</Button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <Button variant="primary" onClick={handleNext} className="px-8 bg-blue-600 hover:bg-blue-700">Next Step</Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit} className="px-8 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200">
              Proceed to Pay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollModal;