import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className = "", ...props }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-2xl bg-white border border-secondary-200 shadow-card transition-shadow duration-300 hover:shadow-2xl ${className}`}
            {...props}
        >
            <div
                style={{
                    transform: "translateZ(20px)",
                }}
                className="relative z-10" // Content pops out
            >
                {children}
            </div>

            {/* Glossy reflection gradient */}
            <motion.div
                style={{
                    opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.2]),
                    background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 50%, transparent 80%)"
                }}
                className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
            />
        </motion.div>
    );
};

export default TiltCard;
