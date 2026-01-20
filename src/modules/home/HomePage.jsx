import React, { useState, useEffect } from 'react';
import { HomeService } from './data/home.service';

import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import ProgramsSection from './components/ProgramsSection';
import FacilitiesSection from './components/FacilitiesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import LearningSection from './components/LearningSection';
import ResultsSection from './components/ResultsSection';
import FacultySection from './components/FacultySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import BlogSection from './components/BlogSection';

const HomePage = () => {
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await HomeService.getHomeData();
            setHomeData(data);
        };
        fetchData();
    }, []);

    if (!homeData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            <HeroSection data={homeData.hero} />
            <TrustSection data={homeData.hero} />
            {/* Note: Trust data is part of hero.stats in my data model, passing hero object which contains stats */}
            <ProgramsSection data={homeData.programs} />
            <FacilitiesSection data={homeData.facilities} />
            <WhyChooseUsSection data={homeData.whyChooseUs} />
            <LearningSection data={homeData.learningModel} />
            <ResultsSection data={homeData.results} />
            <FacultySection data={homeData.faculty} />
            <TestimonialsSection data={homeData.testimonials} />
            <CTASection data={homeData.cta} />
            <BlogSection data={homeData.blog} />
        </div>
    );
};

export default HomePage;
