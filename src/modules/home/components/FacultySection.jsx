import React from 'react';
import Card from '../../../shared/components/Card';
import { FaChalkboardTeacher } from 'react-icons/fa';

const FacultySection = ({ data }) => {
    if (!data) return null;

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
                    <p className="text-xl text-gray-600">{data.subtitle}</p>
                </div>

                {/* Group Image */}
                {data.groupImage && (
                    <div className="relative w-full max-w-4xl mx-auto h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl mb-16 border-4 border-white">
                        <img
                            src={data.groupImage}
                            alt="Expert Faculty Team"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6">
                            <p className="text-white text-lg font-medium opacity-90">"Dedicated to sculpting the minds of tomorrow."</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-8">
                    {data.members.map((f, i) => (
                        <Card key={i} className="p-8 w-full md:w-80 text-center hover:bg-orange-50 transition-colors cursor-pointer border-t-4 border-transparent hover:border-orange-500">
                            <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-gray-400 overflow-hidden">
                                {f.img ? (
                                    <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                                ) : (
                                    <FaChalkboardTeacher />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{f.name}</h3>
                            <p className="text-orange-600 font-semibold">{f.role}</p>
                            <p className="text-gray-500 text-sm mt-2">Exp: {f.exp}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FacultySection;
