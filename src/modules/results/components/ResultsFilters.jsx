
import React from 'react';

const ResultsFilters = ({ year, setYear, standard, setStandard, options }) => {
  if (!options) return null;

  return (
    <div className="bg-gray-50 py-8 border-y border-gray-200 sticky top-20 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center space-x-4">
            <label className="font-bold text-gray-700">Year:</label>
            <div className="flex bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
              {options.years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-6 py-2 text-sm font-bold transition ${year === y
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-bold text-gray-700">Class:</label>
            <div className="flex bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
              {options.classes.map((c) => (
                <button
                  key={c}
                  onClick={() => setStandard(c)}
                  className={`px-6 py-2 text-sm font-bold transition ${standard === c
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsFilters;