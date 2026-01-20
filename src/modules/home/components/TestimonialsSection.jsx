import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialsSection = ({ data }) => {
    if (!data) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
                    <p className="text-xl text-gray-600">{data.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.items.map((r, i) => (
                        <div key={i} className="bg-gray-50 p-8 rounded-2xl relative shadow-sm hover:shadow-lg transition">
                            <FaQuoteLeft className="text-4xl text-blue-200 absolute top-6 left-6" />
                            <p className="text-gray-600 relative z-10 pt-8 mb-6 italic">"{r.text}"</p>
                            <div className="flex items-center text-yellow-500 mb-2">
                                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <h4 className="font-bold text-gray-900">{r.name}</h4>
                            <p className="text-sm text-gray-500">{r.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
