import React, { useState, useEffect } from 'react';
import { FaBook, FaLaptopCode, FaMicroscope, FaUserAstronaut, FaCheck, FaArrowRight } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeSlideUp, hoverLift } from '../../../shared/animations/motionVariants';

const iconMap = {
    book: <FaBook className="text-4xl" />,
    laptop: <FaLaptopCode className="text-4xl" />,
    microscope: <FaMicroscope className="text-4xl" />,
    astronaut: <FaUserAstronaut className="text-4xl" />
};

const ProgramsSection = ({ data }) => {
    const [activeTab, setActiveTab] = useState('primary');
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo === 'programs') {
            const section = document.getElementById('programs');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            if (location.state.tab) {
                setActiveTab(location.state.tab);
            }
        }
    }, [location]);

    if (!data) return null;

    // Helper to find current program data by id
    const currentProgram = data.tabs.find(p => p.id === activeTab);

    return (
        <section id="programs" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
                    <p className="text-xl text-gray-600">{data.subtitle}</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {data.tabs.map((prog) => (
                        <motion.button
                            key={prog.id}
                            onClick={() => setActiveTab(prog.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-sm border-2 ${activeTab === prog.id
                                ? `bg-${prog.color}-600 border-${prog.color}-600 text-white shadow-lg`
                                : `bg-white border-gray-200 text-gray-600 hover:border-${prog.color}-500 hover:text-${prog.color}-600`
                                }`}
                        >
                            {prog.label}
                        </motion.button>
                    ))}
                </div>

                {/* Content */}
                <div className="min-h-[600px]"> {/* Min height to prevent severe layout shift */}
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className={`p-10 lg:p-16 flex flex-col justify-center bg-${currentProgram.color}-50`}>
                                    {/* Contextual Image */}
                                    {currentProgram.image && (
                                        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg h-48 w-full relative group">
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                                            <img
                                                src={currentProgram.image}
                                                alt={currentProgram.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    )}
                                    <div className={`text-${currentProgram.color}-600 mb-6 p-4 bg-white rounded-2xl w-24 h-24 flex items-center justify-center shadow-md`}>
                                        {iconMap[currentProgram.icon]}
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{currentProgram.title}</h3>
                                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                        {currentProgram.desc}
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm">Key Focus Areas:</h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {currentProgram.subjects.map((subj, i) => (
                                                <li key={i} className="flex items-center text-gray-700">
                                                    <FaCheck className={`text-${currentProgram.color}-500 mr-2 flex-shrink-0`} /> {subj}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link to="/courses" className={`inline-flex items-center font-bold text-${currentProgram.color}-700 hover:text-${currentProgram.color}-900 transition`}>
                                        {data.ctaText && data.ctaText.replace('[Label]', currentProgram.label)} <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>

                                {/* Right Side - Features/Approach */}
                                <div className="p-10 lg:p-16 bg-white flex flex-col justify-center relative">


                                    <h4 className="text-2xl font-bold text-gray-900 mb-8">{data.methodologyTitle}</h4>
                                    <div className="space-y-8">
                                        {currentProgram.approach.map((item, idx) => (
                                            <div key={idx} className="flex">
                                                <div className={`flex-shrink-0 h-12 w-12 rounded-full bg-${currentProgram.color}-100 flex items-center justify-center text-${currentProgram.color}-600 font-bold text-xl`}>
                                                    {idx + 1}
                                                </div>
                                                <div className="ml-6">
                                                    <h5 className="text-lg font-bold text-gray-900">{item}</h5>
                                                    <p className="text-gray-500 mt-1">{data.methodologyDesc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-gray-100">
                                        <motion.div whileHover={hoverLift}>
                                            <Link to="/admissions" className={`block w-full text-center py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all bg-${currentProgram.color}-600`}>
                                                {data.trialText}
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ProgramsSection;
