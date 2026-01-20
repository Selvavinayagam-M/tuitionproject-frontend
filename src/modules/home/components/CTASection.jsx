import React, { useState } from 'react';
import Button from '../../../shared/components/Button';

const CTASection = ({ data }) => {
    const [form, setForm] = useState({ name: '', phone: '', class: '', mode: 'Offline' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thanks ${form.name}! We will contact you at ${form.phone} for Class ${form.class}.`);
    };

    if (!data) return null;

    return (
        <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.title}</h2>
                        <p className="text-blue-100 text-lg mb-8">
                            {data.subtitle}
                        </p>
                        <ul className="space-y-4 mb-8">
                            {data.features.map((item, i) => (
                                <li key={i} className="flex items-center">
                                    <span className="bg-orange-500 rounded-full p-1 mr-3">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-2xl p-8 text-gray-900">
                        <h3 className="text-2xl font-bold mb-6 text-center text-blue-900">{data.formTitle}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                    <select
                                        name="class"
                                        required
                                        value={form.class}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                                    >
                                        <option value="">Select</option>
                                        {[...Array(12).keys()].map(i => <option key={i} value={i + 1}>{i + 1}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                                    <select
                                        name="mode"
                                        value={form.mode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                                    >
                                        <option value="Offline">Offline</option>
                                        <option value="Online">Online</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                            <Button type="submit" width="full" className="mt-4">
                                Submit Enquiry
                            </Button>
                        </form>
                        <p className="text-xs text-gray-500 text-center mt-4">
                            {data.formDisclaimer}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
