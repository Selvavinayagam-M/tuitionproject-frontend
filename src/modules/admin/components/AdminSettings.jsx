import React, { useEffect, useState } from 'react';
import { settingsService } from '../services/settings.service';
import { FiSave, FiSettings, FiShield, FiLayout } from 'react-icons/fi';

const AdminSettings = () => {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const result = await settingsService.getSettings();
            setSettings(result);
            setLoading(false);
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await settingsService.updateSettings(settings);
        alert('Settings Saved!');
    };

    const [activeTab, setActiveTab] = useState('general');

    // Define Tabs
    const tabs = [
        { id: 'general', label: 'Branch Settings', icon: <FiSettings /> },
        { id: 'roles', label: 'Roles & Permissions', icon: <FiShield /> },
        { id: 'content', label: 'Content (CMS)', icon: <FiLayout /> },
    ];

    // Render Content Helper
    const renderContent = (tabId) => {
        switch (tabId) {
            case 'general':
                return (
                    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm space-y-4 border border-gray-100 dark:border-gray-700 animate-fadeIn">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 hidden md:block">Branch Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
                                <input
                                    type="text"
                                    name="siteName"
                                    value={settings.siteName || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2.5 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Academic Year</label>
                                <input
                                    type="text"
                                    name="academicYear"
                                    value={settings.academicYear || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2.5 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={settings.email || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2.5 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={settings.phone || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2.5 border"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={handleSave}
                                className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm w-full md:w-auto justify-center transition-transform active:scale-95"
                            >
                                <FiSave className="mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                );
            case 'content':
                return (
                    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm space-y-6 border border-gray-100 dark:border-gray-700 animate-fadeIn">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">Notice Board</h3>
                            <textarea
                                rows="6"
                                placeholder="Type a new announcement..."
                                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            ></textarea>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                                    Notify Students
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                    Notify Parents
                                </label>
                            </div>
                            <button className="flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 font-bold shadow-md w-full md:w-auto transition-transform active:scale-95">
                                Publish Notice
                            </button>
                        </div>
                    </div>
                );
            case 'roles':
                return (
                    <div className="space-y-4 animate-fadeIn">
                        {[
                            { role: 'Super Admin', access: 'Full Access', color: 'purple' },
                            { role: 'Teacher', access: 'Manage Students, Attendance', color: 'blue' },
                            { role: 'Accountant', access: 'Manage Fees, Invoices', color: 'green' }
                        ].map((role, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{role.role}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{role.access}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${role.color}-100 text-${role.color}-700 dark:bg-${role.color}-900/30 dark:text-${role.color}-400`}>
                                        Active
                                    </span>
                                    <button className="text-blue-600 font-bold text-sm">Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default: return null;
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

            {/* Desktop Tabs */}
            <div className="hidden md:flex gap-2 border-b border-gray-200 dark:border-gray-700">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${activeTab === tab.id ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Desktop Content */}
            <div className="hidden md:block">
                {renderContent(activeTab)}
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden space-y-3">
                {tabs.map(tab => (
                    <div key={tab.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                            className={`w-full flex items-center justify-between p-4 font-bold text-left transition-colors ${activeTab === tab.id ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            <span className="flex items-center gap-3">{tab.icon} {tab.label}</span>
                            <span className={`transform transition-transform ${activeTab === tab.id ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {activeTab === tab.id && (
                            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                                {renderContent(tab.id)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSettings;
