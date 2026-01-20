
import React, { useState, useEffect } from 'react';
import PageHeader from '../../shared/components/PageHeader';
import FacultyGrid from './components/FacultyGrid';
import FacultyProfile from './components/FacultyProfile';
import FacultyFilters from './components/FacultyFilters';
import { FacultyService } from './data/faculty.service';

const FacultyPage = () => {
    const [pageData, setPageData] = useState(null);
    const [selectedFaculty, setSelectedFaculty] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await FacultyService.getPageData();
            setPageData(data);
        };
        fetchData();
    }, []);

    if (!pageData) return <div>Loading...</div>;

    return (
        <div className="flex flex-col w-full bg-white">
            <PageHeader
                title={pageData.header.title}
                subtitle={pageData.header.subtitle}
                breadcrumb={pageData.header.breadcrumb}
            />

            <FacultyFilters />

            <section className="bg-white py-12 text-center max-w-4xl mx-auto px-4">
                <p className="text-xl text-gray-600">
                    {pageData.intro.text}
                </p>
            </section>

            <FacultyGrid
                facultyList={pageData.facultyList}
                onSelect={setSelectedFaculty}
            />

            <FacultyProfile
                faculty={selectedFaculty}
                onClose={() => setSelectedFaculty(null)}
            />
        </div>
    );
};

export default FacultyPage;
