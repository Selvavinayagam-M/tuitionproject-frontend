import React from 'react';
import Card from '../../../shared/components/Card';
import { FaStar } from 'react-icons/fa';

const ResultsSection = ({ data }) => {
    if (!data) return null;

    return (
        <section className="py-20 bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">{data.title}</h2>
                    <p className="text-xl text-blue-200">{data.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.students.map((student, idx) => (
                        <Card key={idx} className="p-6 text-center cursor-pointer hover:shadow-2xl bg-white text-gray-900">
                            <div className="relative inline-block mb-4">
                                <img src={student.img} alt={student.name} className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-lg mx-auto object-cover" />
                                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow">
                                    <FaStar size={12} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold">{student.name}</h3>
                            <p className="text-gray-500 text-sm mb-3">{student.class}</p>
                            <div className="bg-blue-900 text-white py-1 px-4 rounded-full inline-block font-bold text-lg">
                                {student.score}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResultsSection;
