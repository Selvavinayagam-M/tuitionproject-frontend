import React from 'react';
import { FaTimes, FaCheck, FaBook, FaChalkboardTeacher, FaClock } from 'react-icons/fa';
import Button from '../../../shared/components/Button';
import FeeBreakdown from './FeeBreakdown';

const CourseDetails = ({ course, onClose, onEnroll }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Side Panel */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto animate-slideInRight flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full text-gray-500 hover:text-gray-800 transition z-10"
        >
          <FaTimes size={20} />
        </button>

        {/* Hero */}
        <div className="bg-blue-900 text-white p-8 pt-16">
          <div className="flex gap-2 mb-4">
            <span className="bg-orange-500 text-xs font-bold px-3 py-1 rounded-full uppercase">{course.board}</span>
            <span className="bg-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">{course.classCategory}</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
          <p className="text-blue-200 text-lg">{course.description}</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 flex-grow">
          {/* Key Info Grid */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase mb-1">Mode</p>
              <p className="font-semibold text-gray-900 flex items-center"><FaChalkboardTeacher className="mr-2 text-blue-500" /> {course.mode}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase mb-1">Timing</p>
              <p className="font-semibold text-gray-900 flex items-center"><FaClock className="mr-2 text-green-500" /> {course.batchType}</p>
            </div>
          </div>

          {/* Syllabus */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FaBook className="mr-2 text-orange-500" /> Syllabus Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.syllabus?.map((topic, i) => (
                <div key={i} className="flex items-center text-gray-700 bg-white border border-gray-200 p-3 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {topic}
                </div>
              )) || <p className="text-gray-500">Contact us for detailed syllabus.</p>}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Course Includes</h3>
            <ul className="space-y-2">
              {course.features?.map((feat, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <FaCheck className="text-green-500 mr-3" /> {feat}
                </li>
              )) || <li>Comprehensive Study Material</li>}
            </ul>
          </div>

          {/* Fees */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Fee Structure</h3>
            <FeeBreakdown fees={course.feeDetails || { tuition: 4000, material: 1000, admission: 500 }} />
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0">
          <Button
            width="full"
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 shadow-xl"
            onClick={() => onEnroll(course)}
          >
            {course.enrollmentType === 'counselling' ? 'Book Free Counselling Session' : 'Enroll Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;