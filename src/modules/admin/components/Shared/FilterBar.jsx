import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaFileExport, FaPlus } from 'react-icons/fa';
import Button from '../../../../shared/components/Button';
import _ from 'lodash';

const FilterBar = ({
    onSearch,
    searchPlaceholder = "Search...",
    filters, // Array of { name, label, options: ['All', ...] }
    onFilterChange,
    onExport,
    onAdd,
    addLabel = "Add New"
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce search
    const debouncedSearch = React.useCallback(
        _.debounce((query) => onSearch(query), 500),
        []
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">
            {/* Left: Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative group min-w-[250px]">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                </div>

                {/* Filters */}
                {filters && filters.map((filter, idx) => (
                    <div key={idx} className="relative">
                        <select
                            onChange={(e) => onFilterChange(filter.name, e.target.value)}
                            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 pr-8 cursor-pointer hover:bg-gray-100 transition"
                        >
                            {filter.options.map((opt, i) => (
                                <option key={i} value={opt}>{opt === 'All' ? `All ${filter.label}s` : opt}</option>
                            ))}
                        </select>
                        <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none" />
                    </div>
                ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {onExport && (
                    <Button variant="outline" onClick={onExport} className="flex items-center gap-2">
                        <FaFileExport /> Export
                    </Button>
                )}
                {onAdd && (
                    <Button onClick={onAdd} className="flex items-center gap-2">
                        <FaPlus /> {addLabel}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default FilterBar;
