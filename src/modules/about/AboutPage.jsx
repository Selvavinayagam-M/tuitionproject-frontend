import React, { useState, useEffect } from 'react';
import { AboutService } from './data/about.service';

import AboutHero from './components/AboutHero';
import VisionMission from './components/VisionMission';
import PhilosophySection from './components/PhilosophySection';
import MilestonesSection from './components/MilestonesSection';
import LeadershipSection from './components/LeadershipSection';
import InfrastructureSection from './components/InfrastructureSection';

const AboutPage = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await AboutService.getAboutData();
            setAboutData(data);
        };
        fetchData();
    }, []);

    if (!aboutData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full">
            <AboutHero data={aboutData.hero} />
            <VisionMission data={aboutData.visionMission} />
            <PhilosophySection data={aboutData.philosophy} />
            <MilestonesSection data={aboutData.milestones} />
            {/* Hidden to preserve original UI */}
            <LeadershipSection data={aboutData.leadership} />
            <InfrastructureSection data={aboutData.infrastructure} />
        </div>
    );
};

export default AboutPage;
