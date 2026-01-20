import React, { useState, useMemo, useEffect } from 'react';
import PageHeader from '../../shared/components/PageHeader';
import CourseFilters from './components/CourseFilters';
import CourseCard from './components/CourseCard';
import CourseDetails from './components/CourseDetails';
import EnrollModal from './components/EnrollModal';
import { CoursesService } from './data/courses.service';
import { FaSearch } from 'react-icons/fa';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [filters, setFilters] = useState({ classVal: "", board: "", mode: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null); // For Details Panel
    const [enrollingCourse, setEnrollingCourse] = useState(null); // For Modal

    useEffect(() => {
        const fetchData = async () => {
            const coursesData = await CoursesService.getCourses();
            const pData = await CoursesService.getPageData();
            setCourses(coursesData);
            setPageData(pData);
        };
        fetchData();
    }, []);

    // Filter Logic
    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesClass = filters.classVal ? course.classCategory === filters.classVal : true;
            const matchesBoard = filters.board ? course.board === filters.board : true;
            const matchesMode = filters.mode ? course.mode === filters.mode : true;
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

            return matchesClass && matchesBoard && matchesMode && matchesSearch;
        });
    }, [filters, searchTerm, courses]);

    // Handlers
    const handleCardAction = (action, course) => {
        if (action === 'details') {
            setSelectedCourse(course);
        } else if (action === 'enroll' || action === 'counselling') {
            setEnrollingCourse(course);
        }
    };

    if (!pageData || courses.length === 0) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-50">
            <PageHeader
                title={pageData.header.title}
                subtitle={pageData.header.subtitle}
                breadcrumb={pageData.header.breadcrumb}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-1/4 flex-shrink-0">
                        <CourseFilters
                            activeFilters={filters}
                            onFilterChange={setFilters}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search Bar */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex items-center">
                            <FaSearch className="text-gray-400 ml-2" />
                            <input
                                type="text"
                                placeholder="Search for courses, subjects or keywords..."
                                className="w-full ml-4 p-2 focus:outline-none text-gray-700"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Course Grid */}
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCourses.map(course => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        onAction={handleCardAction}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                <h3 className="text-xl font-bold text-gray-600 mb-2">No Courses Found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                                <button
                                    onClick={() => { setFilters({ classVal: "", board: "", mode: "" }); setSearchTerm(""); }}
                                    className="mt-4 text-orange-600 font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Slide-over Detail Panel */}
            {selectedCourse && (
                <CourseDetails
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                    onEnroll={(c) => {
                        setSelectedCourse(null);
                        setEnrollingCourse(c);
                    }}
                />
            )}

            {/* Enrollment Modal */}
            {enrollingCourse && (
                <EnrollModal
                    course={enrollingCourse}
                    onClose={() => setEnrollingCourse(null)}
                />
            )}
        </div>
    );
};

export default CoursesPage;
