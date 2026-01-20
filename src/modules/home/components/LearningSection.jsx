import React from 'react';
import { FaLaptop, FaChalkboard, FaSyncAlt } from 'react-icons/fa';

const iconMap = {
    chalkboard: <FaChalkboard className="text-2xl text-white" />,
    laptop: <FaLaptop className="text-2xl text-white" />,
    sync: <FaSyncAlt className="text-2xl text-white" />
};

const LearningSection = ({ data }) => {
    if (!data) return null;

    return (
        <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{data.title}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
                        {data.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.models.map((model) => (
                        <div
                            key={model.id}
                            className={`bg-gray-800 rounded-2xl p-8 border border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 group ${model.id === 'offline' ? 'hover:border-orange-500' :
                                    model.id === 'online' ? 'hover:border-blue-500' :
                                        'hover:border-purple-500 relative overflow-hidden'
                                }`}
                        >
                            {model.badge && (
                                <div className="absolute top-0 right-0 bg-purple-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    {model.badge}
                                </div>
                            )}
                            <div className={`h-14 w-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${model.id === 'offline' ? 'bg-orange-600' :
                                    model.id === 'online' ? 'bg-blue-600' :
                                        'bg-purple-600'
                                }`}>
                                {iconMap[model.icon]}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{model.title}</h3>
                            <p className="text-gray-400 mb-6">{model.desc}</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                {model.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearningSection;
