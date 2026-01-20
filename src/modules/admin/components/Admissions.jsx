import React, { useState, useEffect } from 'react';
import EnquiryKanban from './Admissions/EnquiryKanban';
import LeadForm from './Admissions/LeadForm';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';
import { mockService } from '../../../services/api';

const Admissions = () => {
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [viewMode, setViewMode] = useState('pipeline'); // pipeline | list
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await mockService.getEnquiries();
                setEnquiries(data);
            } catch (err) {
                console.error("Failed to load enquiries", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSaveLead = (newLead) => {
        // Optimistic Update: Append new lead directly to state
        console.log("New Lead Saved:", newLead);
        setEnquiries(prev => [newLead, ...prev]);
        setShowLeadForm(false);
    };

    const handleStatusUpdate = (id, newStatus) => {
        setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admissions Pipeline</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage enquiries, counselling, and enrollments.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search enquiry..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={() => setShowLeadForm(true)}
                        className="flex justify-center items-center bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition shadow-lg w-full md:w-auto"
                    >
                        <FaPlus className="mr-2" /> New Enquiry
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {loading ? (
                    <div className="flex h-full items-center justify-center text-gray-400">Loading pipeline...</div>
                ) : (
                    <EnquiryKanban
                        enquiries={enquiries}
                        onStatusUpdate={handleStatusUpdate}
                    />
                )}
            </div>

            {/* Modals */}
            {showLeadForm && (
                <LeadForm
                    onClose={() => setShowLeadForm(false)}
                    onSave={handleSaveLead}
                />
            )}
        </div>
    );
};

export default Admissions;
