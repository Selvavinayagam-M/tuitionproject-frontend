
import React from 'react';
import FacultyCard from './FacultyCard';

const FacultyGrid = ({ facultyList, onSelect }) => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {facultyList.map((f) => (
                        <FacultyCard
                            key={f.id}
                            faculty={f}
                            onClick={() => onSelect(f)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FacultyGrid;
