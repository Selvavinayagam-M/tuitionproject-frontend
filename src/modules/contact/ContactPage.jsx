
import React, { useState, useEffect } from 'react';
import PageHeader from '../../shared/components/PageHeader';
import OfficeInfo from './components/OfficeInfo';
import BranchList from './components/BranchList';
import BranchMap from './components/BranchMap';
import ContactForm from './components/ContactForm';
import { ContactService } from './data/contact.service';

const ContactPage = () => {
    const [pageData, setPageData] = useState(null);
    const [activeBranch, setActiveBranch] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await ContactService.getPageData();
            setPageData(data);
        };
        fetchData();
    }, []);

    // Set initial active branch once data is loaded
    useEffect(() => {
        if (pageData && pageData.locator.branches.length > 0 && !activeBranch) {
            setActiveBranch(pageData.locator.branches[0]);
        }
    }, [pageData, activeBranch]);

    if (!pageData) return <div>Loading...</div>;

    return (
        <div className="flex flex-col w-full bg-white">
            <PageHeader
                title={pageData.header.title}
                subtitle={pageData.header.subtitle}
                breadcrumb={pageData.header.breadcrumb}
            />

            <OfficeInfo info={pageData.info} />

            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{pageData.locator.title}</h2>
                        <p className="text-gray-600">{pageData.locator.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px] lg:h-[500px]">
                        <BranchList
                            branches={pageData.locator.branches}
                            activeBranch={activeBranch || {}}
                            onSelect={setActiveBranch}
                        />
                        <BranchMap activeBranch={activeBranch} />
                    </div>
                </div>
            </section>

            <ContactForm />
        </div>
    );
};

export default ContactPage;
