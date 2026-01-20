import React from 'react';
import { FaWifi, FaVideo, FaBookReader, FaChalkboard, FaUserShield, FaHeadset } from 'react-icons/fa';

const iconMap = {
  chalkboard: <FaChalkboard />,
  video: <FaVideo />,
  bookreader: <FaBookReader />,
  shield: <FaUserShield />,
  wifi: <FaWifi />,
  headset: <FaHeadset />
};

const FacilitiesSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
          <p className="text-xl text-gray-600">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {data.items.map((fac, idx) => (
            <div key={idx} className="flex items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-900 text-2xl mr-4 mt-1">
                {iconMap[fac.icon]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{fac.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default FacilitiesSection;