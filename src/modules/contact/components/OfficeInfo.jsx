
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const OfficeInfo = ({ info }) => {
  if (!info) return null;

  return (
    <section className="py-12 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Phone */}
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-orange-400 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
              <FaPhoneAlt size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">{info.phone.title}</h3>
              {info.phone.lines.map((line, i) => (
                <p key={i} className="text-blue-100">{line}</p>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-orange-400 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
              <FaEnvelope size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">{info.email.title}</h3>
              {info.email.lines.map((line, i) => (
                <p key={i} className="text-blue-100">{line}</p>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-orange-400 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
              <FaClock size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">{info.hours.title}</h3>
              {info.hours.lines.map((line, i) => (
                <p key={i} className="text-blue-100">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeInfo;