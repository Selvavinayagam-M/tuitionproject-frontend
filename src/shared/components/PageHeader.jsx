import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const PageHeader = ({ title, subtitle, breadcrumb }) => {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-12 sm:py-16 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/3 -translate-y-1/3">
                <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
                        {title}
                    </h1>
                    <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-8">
                        {subtitle}
                    </p>

                    {/* Breadcrumbs */}
                    {breadcrumb && (
                        <nav className="flex justify-center" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-2 text-sm text-blue-300">
                                <li>
                                    <Link to="/" className="hover:text-white transition">Home</Link>
                                </li>
                                {breadcrumb.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <FaChevronRight className="flex-shrink-0 h-3 w-3 text-blue-400" />
                                        <li>
                                            {item.link ? (
                                                <Link to={item.link} className="hover:text-white transition">{item.label}</Link>
                                            ) : (
                                                <span className="text-white font-medium">{item.label}</span>
                                            )}
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ol>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
