// Enterprise Animation Constants
const ENTERPRISE_EASE = [0.2, 0.8, 0.2, 1]; // Calm, professional easing
const ENTERPRISE_DURATION = 0.4; // 200ms - 400ms rule
const ENTERPRISE_DELAY = 0.1;

export const ENTERPRISE_TRANSITION = {
    duration: ENTERPRISE_DURATION,
    ease: ENTERPRISE_EASE
};

// 1. Fade In (Opacity Only) - Page Entry / Results
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: ENTERPRISE_TRANSITION
    },
    exit: { opacity: 0 }
};

// 2. Fade + Slide Up (The Workhorse) - Hero Text, Sections
export const fadeSlideUp = {
    hidden: { opacity: 0, y: 16 }, // Max 24px movement rule
    visible: {
        opacity: 1,
        y: 0,
        transition: ENTERPRISE_TRANSITION
    },
    exit: { opacity: 0, y: 16 }
};

// 3. Subtle Scale In - CTAs, Modals (No Bounce)
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: ENTERPRISE_TRANSITION
    },
    exit: { opacity: 0, scale: 0.98 }
};

// 4. Stagger Container - Lists, Grids
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

// 5. Enterprise Hover Lift (Micro-interaction)
export const hoverLift = {
    y: -4, // Max 4px
    transition: { duration: 0.2, ease: "easeOut" }
};

// 6. Expand / Collapse - FAQs, Filters
export const expand = {
    hidden: { height: 0, opacity: 0, overflow: 'hidden' },
    visible: {
        height: 'auto',
        opacity: 1,
        transition: ENTERPRISE_TRANSITION
    },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }
};

// 7. Navbar Slide Down
export const navSlideDown = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: ENTERPRISE_EASE }
    }
};

