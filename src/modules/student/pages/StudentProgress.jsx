import React from 'react';
import { performanceData } from '../data/student.data';
import { Bar } from 'react-chartjs-2';

const StudentProgress = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Performance Report</h1>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-6">Subject Statistics</h2>
                <div className="h-80">
                    <Bar
                        data={{
                            labels: performanceData.map(d => d.subject),
                            datasets: [{
                                label: 'Score (%)',
                                data: performanceData.map(d => d.score),
                                backgroundColor: performanceData.map(d => d.score >= 90 ? '#4ade80' : d.score >= 75 ? '#60a5fa' : '#fbbf24'),
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <h3 className="font-bold text-green-800 mb-2">Strengths 🌟</h3>
                    <p className="text-green-700 text-sm">You are excelling in <strong>Computer Science</strong> and <strong>English</strong>. Keep maintaining this consistency!</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                    <h3 className="font-bold text-yellow-800 mb-2">Areas for Improvement 📈</h3>
                    <p className="text-yellow-700 text-sm">Focus more on <strong>Physics</strong> concepts. Regular practice of numerical problems is recommended.</p>
                </div>
            </div>
        </div>
    );
};

export default StudentProgress;
