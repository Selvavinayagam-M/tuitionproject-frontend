import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeSlideUp, scaleIn, staggerContainer, fadeIn } from '../../../shared/animations/motionVariants';

const HeroSection = ({ data }) => {
    if (!data) return null;

    return (
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="sm:text-center lg:text-left"
                        >
                            <motion.div variants={fadeSlideUp} className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {data.badge}
                                </span>
                                <span className="text-gray-500 text-xs font-medium flex items-center">
                                    <FaCheckCircle className="text-green-500 mr-1" /> {data.subBadge}
                                </span>
                            </motion.div>

                            <motion.h1 variants={fadeSlideUp} className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">{data.titlePrefix}</span>{' '}
                                <span className="block text-orange-600 xl:inline">{data.titleSuffix}</span>
                            </motion.h1>

                            <motion.p variants={fadeSlideUp} className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                {data.description}
                            </motion.p>

                            <motion.div variants={scaleIn} className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link
                                        to="/contact"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        {data.ctaPrimary}
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link
                                        to="/admissions"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 md:py-4 md:text-lg transition-all"
                                    >
                                        {data.ctaSecondary}
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.p variants={fadeIn} className="mt-4 text-sm text-gray-400">
                                {data.note}
                            </motion.p>
                        </motion.div>
                    </main>
                </div>
            </div>

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
            >
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src={data.image}
                    alt="Students studying in a smart classroom"
                />

                {data.secondaryImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="hidden lg:block absolute bottom-12 -left-20 z-20"
                    >
                        <img
                            src={data.secondaryImage}
                            alt="Feature"
                            className="w-48 h-40 rounded-lg shadow-2xl border-4 border-white object-cover"
                        />
                    </motion.div>
                )}

                <div className="absolute inset-0 bg-blue-900 opacity-20 lg:hidden"></div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
