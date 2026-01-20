import React from 'react';
import { FaFilter } from 'react-icons/fa';

const CourseFilters = ({ activeFilters, onFilterChange }) => {
  // Dropdown constraints (could also come from props/data)
  const classes = ["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12"];
  const boards = ["CBSE", "ICSE", "State Board"];
  const modes = ["Offline Class", "Online Live", "Hybrid"];

  const updateFilter = (key, value) => {
    onFilterChange({ ...activeFilters, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 flex items-center">
          <FaFilter className="mr-2 text-orange-600" /> Filters
        </h3>
        {(activeFilters.classVal || activeFilters.board || activeFilters.mode) && (
          <button
            onClick={() => onFilterChange({ classVal: "", board: "", mode: "" })}
            className="text-xs text-red-500 hover:underline font-medium"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Class Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
          <select
            value={activeFilters.classVal}
            onChange={(e) => updateFilter('classVal', e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All Classes</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Board Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Board</label>
          <div className="space-y-2">
            {boards.map(board => (
              <label key={board} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="board"
                  checked={activeFilters.board === board}
                  onChange={() => updateFilter('board', board)}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <span className={`ml-2 text-sm ${activeFilters.board === board ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{board}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mode Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Learning Mode</label>
          <div className="flex flex-wrap gap-2">
            {modes.map(mode => (
              <button
                key={mode}
                onClick={() => updateFilter('mode', activeFilters.mode === mode ? "" : mode)}
                className={`px-3 py-1.5 text-xs rounded-full border transition ${activeFilters.mode === mode
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                  }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;