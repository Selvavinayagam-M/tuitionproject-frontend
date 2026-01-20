
import React from 'react';

const AdmissionSteps = ({ data }) => {
    if (!data) return null;

    const { title, subtitle, steps } = data;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {steps.map((step) => (
                            <div key={step.id} className="relative bg-white lg:bg-transparent p-6 rounded-xl border border-gray-100 lg:border-none shadow-sm lg:shadow-none text-center">
                                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 border-4 border-white shadow-lg z-10 relative">
                                    {step.id}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdmissionSteps;
