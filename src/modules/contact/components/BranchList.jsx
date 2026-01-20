
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const BranchList = ({ branches, activeBranch, onSelect }) => {
  return (
    <div className="bg-gray-50 rounded-xl overflow-y-auto border border-gray-200 p-4 space-y-4 h-full custom-scrollbar">
      {branches.map(branch => (
        <div
          key={branch.id}
          onClick={() => onSelect(branch)}
          className={`p-4 rounded-lg cursor-pointer transition-all ${activeBranch.id === branch.id
            ? 'bg-white shadow-md border-l-4 border-orange-500'
            : 'hover:bg-white hover:shadow-sm border border-transparent'
            }`}
        >
          <h3 className={`font-bold text-lg mb-1 ${activeBranch.id === branch.id ? 'text-blue-900' : 'text-gray-700'}`}>
            {branch.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2 flex items-start">
            <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
            {branch.address}
          </p>
          <p className="text-sm font-bold text-gray-600 flex items-center">
            <FaPhoneAlt className="mr-2" /> {branch.phone}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BranchList;