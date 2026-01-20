
import React from 'react';
import Card from '../../../shared/components/Card';
import { FaStar, FaTrophy } from 'react-icons/fa';

const ResultCard = ({ student }) => {
    return (
        <Card className="p-6 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-transparent hover:border-orange-500 group">
            <div className="relative inline-block mb-4">
                <img src={student.img} alt={student.name} className="w-24 h-24 rounded-full border-4 border-gray-100 shadow-md mx-auto object-cover group-hover:border-orange-200 transition" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow border-2 border-white">
                    <FaStar size={10} />
                </div>
            </div>

            {student.rank && (
                <span className="block mb-2 text-xs font-bold text-orange-600 tracking-wider uppercase animate-pulse">
                    <FaTrophy className="inline mr-1" /> {student.rank}
                </span>
            )}

            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition">{student.name}</h3>
            <p className="text-gray-500 text-sm mb-3">{student.class}</p>

            <div className="bg-gray-100 text-gray-800 py-1 px-4 rounded-full inline-block font-extrabold text-lg border border-gray-200 group-hover:bg-blue-900 group-hover:text-white transition">
                {student.marks}
            </div>
        </Card>
    );
};

export default ResultCard;
