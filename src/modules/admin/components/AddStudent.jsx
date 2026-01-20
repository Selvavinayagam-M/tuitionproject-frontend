import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import { FaUser, FaPhoneAlt, FaGraduationCap } from 'react-icons/fa';
import { studentsService } from '../services/students.service';
import { toast } from 'react-toastify';

const AddStudent = ({ onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', gender: 'Male', dob: '',
        parentName: '', phone: '', email: '', address: '',
        class: '', board: 'CBSE', batch: '',
        status: 'Active', feesStatus: 'Pending',
        discount: 0
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First Name is required";
        if (!formData.lastName) newErrors.lastName = "Last Name is required";
        if (!formData.dob) newErrors.dob = "Date of Birth is required";
        if (!formData.parentName) newErrors.parentName = "Parent Name is required";
        if (!formData.phone) newErrors.phone = "Mobile Number is required";
        if (!formData.class) newErrors.class = "Class is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true);
        try {
            await studentsService.create({
                name: `${formData.firstName} ${formData.lastName}`,
                ...formData
            });
            toast.success("Student Enrolled Successfully");
            if (onSuccess) onSuccess();
            if (onClose) onClose();
        } catch (error) {
            console.error("Enrollment Error:", error);
            toast.error(error.response?.data?.message || "Failed to enroll student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-full flex flex-col bg-white">
            {/* Fixed Header */}
            <div className="px-6 py-6 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-2xl font-bold text-gray-800">Add New Student (v3)</h2>
                <p className="text-sm text-gray-500">Enroll a new student into the system.</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth overscroll-contain min-h-0">
                {/* Section 1: Personal Details */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center uppercase tracking-wide"><FaUser className="mr-2" /> Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">First Name <span className="text-red-500">*</span></label>
                            <input
                                name="firstName"
                                value={formData.firstName}
                                className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Last Name <span className="text-red-500">*</span></label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Gender</label>
                            <select name="gender" value={formData.gender} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date of Birth <span className="text-red-500">*</span></label>
                            <input
                                name="dob"
                                type="date"
                                value={formData.dob}
                                className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.dob ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                                onChange={handleChange}
                            />
                            {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
                        </div>
                    </div>
                </div>

                {/* Section 2: Contact Information */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center uppercase tracking-wide"><FaPhoneAlt className="mr-2" /> Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Parent Name <span className="text-red-500">*</span></label>
                            <input
                                name="parentName"
                                value={formData.parentName}
                                className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.parentName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                                onChange={handleChange}
                            />
                            {errors.parentName && <p className="text-xs text-red-500 mt-1">{errors.parentName}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Mobile Number <span className="text-red-500">*</span></label>
                            <input
                                name="phone"
                                value={formData.phone}
                                className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email (Optional)</label>
                            <input name="email" type="email" value={formData.email} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Address</label>
                            <textarea name="address" rows="2" value={formData.address} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* Section 3: Academic Details */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center uppercase tracking-wide"><FaGraduationCap className="mr-2" /> Academic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Class <span className="text-red-500">*</span></label>
                            <select
                                name="class"
                                value={formData.class}
                                className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.class ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {[...Array(12).keys()].map(i => <option key={i} value={i + 1}>Class {i + 1}</option>)}
                            </select>
                            {errors.class && <p className="text-xs text-red-500 mt-1">{errors.class}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Board</label>
                            <select name="board" value={formData.board} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange}>
                                <option>CBSE</option>
                                <option>ICSE</option>
                                <option>State Board</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Assign Batch</label>
                            <select name="batch" value={formData.batch} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange}>
                                <option value="">Select</option>
                                <option>Morning-A</option>
                                <option>Evening-B</option>
                                <option>Weekend-C</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section 4: Status & Fees */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center uppercase tracking-wide">Status & Fees</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Student Status</label>
                            <select name="status" value={formData.status} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Fee Status</label>
                            <select name="feesStatus" value={formData.feesStatus} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange}>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Unpaid">Unpaid</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0 bg-gray-50 rounded-b-xl">
                <Button variant="outline" type="button" onClick={onClose} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Enrolling...' : 'Complete Enrollment'}
                </Button>
            </div>
        </form>
    );
};

export default AddStudent;
