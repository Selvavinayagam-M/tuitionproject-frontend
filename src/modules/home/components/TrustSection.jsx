import React, { useEffect, useRef } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { motion, useInView, animate } from 'framer-motion';
import { staggerContainer, fadeSlideUp } from '../../../shared/animations/motionVariants';

const iconMap = {
    calendar: <FaCalendarAlt />,
    graduate: <FaUserGraduate />,
    trophy: <FaTrophy />,
    teacher: <FaChalkboardTeacher />
};

const Counter = ({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Extract numeric part and suffix (e.g. "1500+" -> num: 1500, suffix: "+")
    const numericValue = parseInt(value, 10);
    const isNumber = !isNaN(numericValue);
    const suffix = isNumber ? value.replace(numericValue.toString(), '') : '';

    useEffect(() => {
        if (isInView && isNumber) {
            const controls = animate(0, numericValue, {
                duration: 2,
                delay: 0.3, // Enterprise delay rule
                ease: [0.2, 0.8, 0.2, 1],
                onUpdate(latest) {
                    if (ref.current) {
                        ref.current.textContent = Math.floor(latest) + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, numericValue, suffix, isNumber]);

    return <span ref={ref} className="tabular-nums">{isNumber ? 0 + suffix : value}</span>;
};

const TrustSection = ({ data }) => {
    if (!data || !data.stats) return null;

    return (
        <section className="bg-gray-50 py-12 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 -mt-24 border-b-4 border-orange-600">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {data.stats.map((stat, idx) => (
                            <motion.div
                                variants={fadeSlideUp}
                                key={idx}
                                className="flex flex-col items-center text-center p-4 group hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="text-4xl text-blue-900 mb-4 group-hover:text-orange-600 transition-colors">
                                    {iconMap[stat.icon]}
                                </div>
                                <h3 className="text-3xl font-extrabold text-gray-900 mb-1">
                                    <Counter value={stat.value} />
                                </h3>
                                <p className="text-lg font-bold text-gray-800 mb-1">{stat.label}</p>
                                <p className="text-sm text-gray-500">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
