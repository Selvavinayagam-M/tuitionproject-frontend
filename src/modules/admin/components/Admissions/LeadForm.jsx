import React, { useState } from 'react';
import Button from '../../../../shared/components/Button';
import { FaPlus, FaTimes, FaUser, FaPhoneAlt, FaGraduationCap } from 'react-icons/fa';

const LeadForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', class: 'Class 10', source: 'Walk-in', status: 'New', notes: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: Date.now(), date: new Date().toISOString().split('T')[0] });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg text-gray-800">Add New Enquiry</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500"><FaTimes /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label text-xs">Student Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-gray-400" size={12} />
                                <input name="name" required className="input-field pl-9 w-full border p-2 rounded" placeholder="Rahul Kumar" onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <label className="label text-xs">Phone Number</label>
                            <div className="relative">
                                <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" size={12} />
                                <input name="phone" required className="input-field pl-9 w-full border p-2 rounded" placeholder="9876543210" onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label text-xs">Class</label>
                            <select name="class" className="input-field w-full border p-2 rounded" onChange={handleChange}>
                                {[...Array(12).keys()].map(i => <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label text-xs">Source</label>
                            <select name="source" className="input-field w-full border p-2 rounded" onChange={handleChange}>
                                <option>Walk-in</option>
                                <option>Phone Call</option>
                                <option>Referral</option>
                                <option>Website</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="label text-xs">Initial Notes</label>
                        <textarea name="notes" rows="3" className="input-field w-full border p-2 rounded" placeholder="Interested in Maths & Science..." onChange={handleChange}></textarea>
                    </div>

                    <div className="pt-2 flex justify-end space-x-3">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Create Enquiry</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadForm;
