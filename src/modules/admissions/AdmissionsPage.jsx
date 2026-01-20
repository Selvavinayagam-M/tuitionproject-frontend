
import React, { useState, useEffect } from 'react';
import PageHeader from '../../shared/components/PageHeader';
import CalendarSection from './components/CalendarSection';
import AdmissionSteps from './components/AdmissionSteps';
import EligibilitySection from './components/EligibilitySection';
import AdmissionForm from './components/AdmissionForm';
import { AdmissionsService } from './data/admissions.service';

const AdmissionsPage = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await AdmissionsService.getPageData();
            setPageData(data);
        };
        fetchData();
    }, []);

    if (!pageData) {
        return <div>Loading...</div>; // Or a skeleton loader
    }

    return (
        <div className="flex flex-col w-full">
            <PageHeader
                title={pageData.header.title}
                subtitle={pageData.header.subtitle}
                breadcrumb={pageData.header.breadcrumb}
            />
            <CalendarSection data={pageData.dates} />
            <AdmissionSteps data={pageData.process} />
            <EligibilitySection data={pageData.eligibility} />
            <AdmissionForm />
        </div>
    );
};

export default AdmissionsPage;
