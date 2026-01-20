
import React from 'react';
import Card from '../../../shared/components/Card';
import { FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const FacultyCard = ({ faculty, onClick }) => {
    return (
        <Card
            className="p-0 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group"
            onClick={onClick}
        >
            <div className="h-48 overflow-hidden relative">
                <img src={faculty.img} alt={faculty.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="text-white text-sm font-bold border border-white px-4 py-1 rounded-full">View Profile</span>
                </div>
            </div>
            <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                <p className="text-orange-600 font-bold text-sm uppercase tracking-wide mb-3">{faculty.role}</p>
                <div className="flex justify-center items-center space-x-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
                    <span className="flex items-center"><FaChalkboardTeacher className="mr-1 text-blue-500" /> {faculty.exp}</span>
                    <span className="flex items-center"><FaGraduationCap className="mr-1 text-green-500" /> M.Sc/Ph.D</span>
                </div>
            </div>
        </Card>
    );
};

export default FacultyCard;
