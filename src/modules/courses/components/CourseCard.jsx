import React from 'react';
import { FaBook, FaCheckCircle, FaStar } from 'react-icons/fa';
import Button from '../../../shared/components/Button';

const CourseCard = ({ course, onAction }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group relative overflow-hidden">
            {/* Tag */}
            {course.tag && (
                <div className="absolute top-4 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-l-md shadow-sm z-10">
                    {course.tag}
                </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100 uppercase tracking-wide">
                        {course.classCategory}
                    </span>
                    <div className="flex text-yellow-400 text-xs">
                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="mb-4 space-y-2">
                    {course.subjects.slice(0, 3).map((sub, i) => (
                        <div key={i} className="flex items-center text-xs text-gray-600">
                            <FaBook className="mr-2 text-blue-400" /> {sub}
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Starting from</p>
                        <p className="text-lg font-bold text-gray-900">₹{course.fee.monthly.toLocaleString()} <span className="text-xs font-normal text-gray-500">/mo</span></p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAction('details', course)}
                        className="hover:bg-blue-50 border-blue-200 text-blue-700"
                    >
                        View Details
                    </Button>
                </div>
            </div>

            {/* Smart CTA Logic */}
            <div className="bg-gray-50 p-4 border-t border-gray-100">
                {course.enrollmentType === 'direct' ? (
                    <Button
                        width="full"
                        onClick={() => onAction('enroll', course)}
                        className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-100"
                    >
                        Enroll Now
                    </Button>
                ) : (
                    <Button
                        width="full"
                        onClick={() => onAction('counselling', course)}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100"
                    >
                        Request Counselling
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
