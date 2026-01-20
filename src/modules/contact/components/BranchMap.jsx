
import React from 'react';
import { FaDirections } from 'react-icons/fa';

const BranchMap = ({ activeBranch }) => {
  if (!activeBranch) return null;

  return (
    <div className="lg:col-span-2 bg-gray-200 rounded-xl overflow-hidden border border-gray-200 h-full relative">
      <iframe
        src={activeBranch.mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Branch Map"
      ></iframe>
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg flex justify-between items-center md:hidden">
        <div>
          <h4 className="font-bold text-gray-900">{activeBranch.name}</h4>
          <p className="text-xs text-gray-600">{activeBranch.address}</p>
        </div>
        <a
          href={`https://maps.google.com/?q=${activeBranch.address}`}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 text-white p-2 rounded-full shadow-lg"
        >
          <FaDirections />
        </a>
      </div>
    </div>
  );
};

export default BranchMap;