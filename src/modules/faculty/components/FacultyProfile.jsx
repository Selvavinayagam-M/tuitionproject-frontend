
import React from 'react';
import { FaTimes, FaQuoteLeft, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const FacultyProfile = ({ faculty, onClose }) => {
  if (!faculty) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row animate-scaleIn" onClick={e => e.stopPropagation()}>

        {/* Left: Image & Quick Info */}
        <div className="w-full md:w-1/3 bg-gray-100 relative">
          <img src={faculty.img} alt={faculty.name} className="w-full h-64 md:h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-900/90 to-transparent md:bg-none flex flex-col justify-end p-6 md:p-0">
            {/* Mobile Overlay Text */}
            <div className="md:hidden text-white">
              <h3 className="text-2xl font-bold">{faculty.name}</h3>
              <p className="text-orange-400 font-bold">{faculty.role}</p>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-2/3 p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <FaTimes size={24} />
          </button>

          <div className="hidden md:block mb-6">
            <h3 className="text-3xl font-bold text-gray-900">{faculty.name}</h3>
            <p className="text-xl text-orange-600 font-bold">{faculty.role}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0 mr-4">
                <FaGraduationCap />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Qualifications</h4>
                <p className="text-gray-600">{faculty.quals}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mr-4">
                <FaChalkboardTeacher />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Experience</h4>
                <p className="text-gray-600">{faculty.exp} of Academic Mentorship</p>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 relative mt-4">
              <FaQuoteLeft className="text-4xl text-orange-200 absolute top-4 left-4 -z-10" />
              <h4 className="font-bold text-orange-900 mb-2">Teaching Philosophy</h4>
              <p className="text-gray-700 italic">"{faculty.philosophy}"</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">About</h4>
              <p className="text-gray-600 leading-relaxed text-sm">{faculty.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;