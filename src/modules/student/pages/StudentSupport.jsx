import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import supportService from '../../../services/support.service';
import { FiMessageSquare, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const StudentSupport = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        subject: '',
        category: 'General Inquiry',
        message: ''
    });

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const data = await supportService.getMyTickets();
            setTickets(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load tickets");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await supportService.createTicket(formData);
            toast.success("Ticket created successfully!");
            setFormData({ subject: '', category: 'General Inquiry', message: '' });
            loadTickets(); // Refresh list
        } catch (error) {
            toast.error("Failed to submit ticket");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'text-green-600 bg-green-50';
            case 'In Progress': return 'text-blue-600 bg-blue-50';
            default: return 'text-orange-600 bg-orange-50';
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Support & Help Desk 🤝</h1>
                <p className="text-gray-500">Raises issues and track their status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Ticket Form */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FiMessageSquare /> New Ticket
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full border-gray-200 rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option>General Inquiry</option>
                                <option>Technical Issue</option>
                                <option>Academic Doubt</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full border-gray-200 rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Brief summary..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                rows="5"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full border-gray-200 rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Describe your issue in detail..."
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl active:scale-95 transform">
                            Submit Ticket
                        </button>
                    </form>
                </div>

                {/* Ticket History */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FiClock /> Ticket History
                    </h2>
                    {loading ? (
                        <div className="text-center py-8 text-gray-500">Loading tickets...</div>
                    ) : tickets.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                            <FiCheckCircle className="mx-auto text-4xl text-gray-300 mb-2" />
                            <p className="text-gray-500">No tickets raised yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tickets.map(ticket => (
                                <div key={ticket._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-800">{ticket.subject}</h3>
                                        <div className="flex items-center gap-2">
                                            {ticket.status === 'Open' && (
                                                <button
                                                    onClick={() => {
                                                        toast.info("Ticket cancelled.");
                                                        setTickets(prev => prev.filter(t => t._id !== ticket._id));
                                                    }}
                                                    className="text-xs px-2 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ticket.message}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-50 pt-2">
                                        <span>{ticket.category}</span>
                                        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentSupport;
