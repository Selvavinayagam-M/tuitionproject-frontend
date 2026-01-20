
import React from 'react';
import { FaGlobe, FaLightbulb, FaHeart } from 'react-icons/fa';

const VisionMission = ({ data }) => {
    if (!data) return null;

    const { vision, mission, values } = data;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {/* Vision */}
                    <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            <FaGlobe />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{vision.title}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {vision.description}
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="p-8 rounded-2xl bg-orange-50 border border-orange-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            <FaLightbulb />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{mission.title}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {mission.description}
                        </p>
                    </div>

                    {/* Values */}
                    <div className="p-8 rounded-2xl bg-green-50 border border-green-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            <FaHeart />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{values.title}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {values.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
