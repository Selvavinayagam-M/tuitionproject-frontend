
import React, { useState, useEffect } from 'react';
import PageHeader from '../../shared/components/PageHeader';
import AnalyticsChart from './components/AnalyticsChart';
import ResultsFilters from './components/ResultsFilters';
import ToppersSection from './components/ToppersSection';
import { ResultsService } from './data/results.service';

const ResultsPage = () => {
    const [pageData, setPageData] = useState(null);
    const [results, setResults] = useState([]);
    const [year, setYear] = useState('2025');
    const [standard, setStandard] = useState('Class 10');

    useEffect(() => {
        const fetchData = async () => {
            const data = await ResultsService.getPageData();
            const res = await ResultsService.getResults(year, standard);
            setPageData(data);
            setResults(res);
        };
        fetchData();
    }, [year, standard]); // Fetch on filter change if needed, currently simluated

    if (!pageData) return <div>Loading...</div>;

    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <PageHeader
                title={pageData.header.title}
                subtitle={pageData.header.subtitle}
                breadcrumb={pageData.header.breadcrumb}
            />
            <AnalyticsChart data={pageData.analytics} />
            <ResultsFilters
                year={year}
                setYear={setYear}
                standard={standard}
                setStandard={setStandard}
                options={pageData.filters}
            />
            <ToppersSection students={results} />
        </div>
    );
};

export default ResultsPage;
