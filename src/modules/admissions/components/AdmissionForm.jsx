
import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import { FaPaperPlane } from 'react-icons/fa';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '',
    parentName: '', phone: '', email: '',
    address: '', city: '', pincode: '',
    prevSchool: '', currClass: '', board: 'CBSE'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application Submitted Successfully! We will contact you shortly.');
  };

  return (
    <section className="py-20 bg-white" id="apply-now">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-blue-900 px-8 py-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Admission Application Form</h2>
            <p className="text-blue-200 text-sm">Session 2026-27</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Student Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Student Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">First Name *</label>
                  <input type="text" name="firstName" required className="input-field w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div>
                  <label className="label">Last Name *</label>
                  <input type="text" name="lastName" required className="input-field w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div>
                  <label className="label">Date of Birth *</label>
                  <input type="date" name="dob" required className="input-field w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div>
                  <label className="label">Gender *</label>
                  <select name="gender" className="input-field w-full p-2 border rounded" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Guardian Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Parent / Guardian Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Parent Name *</label>
                  <input type="text" name="parentName" required className="input-field w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div>
                  <label className="label">Relationship</label>
                  <select className="input-field w-full p-2 border rounded">
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Guardian</option>
                  </select>
                </div>
                <div>
                  <label className="label">Mobile Number *</label>
                  <input type="tel" name="phone" required className="input-field w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div>
                  <label className="label">Email ID</label>
                  <input type="email" name="email" className="input-field w-full p-2 border rounded" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Current School</label>
                  <input type="text" name="prevSchool" className="input-field w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div>
                  <label className="label">Admission Sought For Class *</label>
                  <select name="currClass" required className="input-field w-full p-2 border rounded" onChange={handleChange}>
                    <option value="">Select</option>
                    {[...Array(12).keys()].map(i => <option key={i} value={i + 1}>{i + 1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Current Board</label>
                  <select name="board" className="input-field w-full p-2 border rounded" onChange={handleChange}>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" width="full" className="bg-orange-600 hover:bg-orange-700 py-3 text-lg shadow-lg">
                <FaPaperPlane className="mr-2" /> Submit Application
              </Button>
              <p className="text-center text-xs text-gray-500 mt-4">
                By submitting this form, you agree to our terms and conditions.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdmissionForm;