import React, { useState } from 'react';
import { childrenData, performanceSummary } from '../data/parent.data';
import { Bar } from 'react-chartjs-2';

const ParentPerformance = () => {
    const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id);
    const selectedChild = childrenData.find(c => c.id === selectedChildId);
    const performance = performanceSummary[selectedChildId];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Academic Performance</h1>
                <select
                    className="p-2 border border-gray-200 rounded-lg bg-white text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
                    value={selectedChildId}
                    onChange={(e) => setSelectedChildId(e.target.value)}
                >
                    {childrenData.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-6">Subject Statistics for {selectedChild.name}</h2>
                <div className="h-80">
                    <Bar
                        data={{
                            labels: performance.map(d => d.subject),
                            datasets: [{
                                label: 'Score (%)',
                                data: performance.map(d => d.score),
                                backgroundColor: performance.map(d => d.score >= 90 ? '#4ade80' : d.score >= 75 ? '#60a5fa' : '#fbbf24'),
                                borderRadius: 6,
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true, max: 100 } }
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performance.map((res, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase">{res.subject}</p>
                            <p className="text-2xl font-bold text-gray-800">{res.score}/{res.fullMark}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${res.score >= 90 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            {res.score >= 90 ? 'A+' : 'A'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParentPerformance;
