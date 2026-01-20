import React from 'react';
import { FaUserClock, FaChartLine, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

const iconMap = {
    users: <FaUsers className="text-4xl text-orange-500" />,
    teacher: <FaChalkboardTeacher className="text-4xl text-blue-500" />,
    chart: <FaChartLine className="text-4xl text-green-500" />,
    clock: <FaUserClock className="text-4xl text-purple-500" />
};

const WhyChooseUsSection = ({ data }) => {
    if (!data) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center mb-16">
                    <h2 className="text-base text-orange-600 font-semibold tracking-wide uppercase">{data.subtitle}</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        {data.title}
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        {data.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {data.features.map((feature, idx) => (
                        <div key={idx} className="flex relative items-start p-6 border-l-4 border-transparent hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 rounded-r-xl group">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-white shadow-md border border-gray-100 group-hover:scale-110 transition-transform">
                                    {iconMap[feature.icon]}
                                </div>
                            </div>
                            <div className="ml-6">
                                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                                <p className="mt-2 text-base text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
