import React from 'react';
import { FaBrain, FaRegClipboard, FaUserFriends, FaLightbulb } from 'react-icons/fa';

const iconMap = {
    brain: <FaBrain />,
    clipboard: <FaRegClipboard />,
    friends: <FaUserFriends />,
    lightbulb: <FaLightbulb />
};

const PhilosophySection = ({ data }) => {
    if (!data) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
                    <p className="text-xl text-gray-600">{data.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {data.pillars.map((pillar, idx) => (
                        <div key={idx} className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-900 text-2xl">
                                    {iconMap[pillar.icon]}
                                </div>
                            </div>
                            <div className="ml-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{pillar.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
