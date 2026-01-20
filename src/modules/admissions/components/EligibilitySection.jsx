
import React from 'react';
import { FaFileAlt, FaCheckCircle } from 'react-icons/fa';

const EligibilitySection = ({ data }) => {
    if (!data) return null;

    const { title, description, documentsTitle, documents, scholarship } = data;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            {description}
                        </p>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <FaFileAlt className="text-blue-500 mr-2" /> {documentsTitle}
                            </h3>
                            <ul className="space-y-3">
                                {documents.map((doc, i) => (
                                    <li key={i} className="flex items-start text-gray-700">
                                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span>{doc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                            <h3 className="text-2xl font-bold text-orange-800 mb-4">{scholarship.title}</h3>
                            <p className="text-orange-900 mb-6">
                                We believe that merit should be rewarded. Appear for our <strong>Excellence Scholarship Test (EST)</strong> and avail up to 100% waiver on tuition fees.
                            </p>
                            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center">
                                <span className="font-bold text-gray-800">EST Exam Date</span>
                                <span className="bg-orange-600 text-white text-sm px-3 py-1 rounded-full font-bold">{scholarship.examDate}</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                                <span className="font-bold text-gray-800">Eligibility</span>
                                <span className="text-gray-600 text-sm">{scholarship.eligibility}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EligibilitySection;
