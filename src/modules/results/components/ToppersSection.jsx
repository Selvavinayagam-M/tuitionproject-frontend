
import React from 'react';
import ResultCard from './ResultCard';

const ToppersSection = ({ students }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {students.map((student, idx) => (
            <ResultCard key={idx} student={student} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-white border-2 border-gray-300 text-gray-600 font-bold py-2 px-8 rounded-full hover:bg-gray-50 hover:text-blue-900 transition">
            Load More Results
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToppersSection;