import { useState, useMemo } from 'react';

const useFilters = (data = [], searchKeys = []) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({});

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Search logic
            const matchesSearch = searchKeys.some((key) =>
                String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
            );

            // Filter logic (exact match for now)
            const matchesFilters = Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                return String(item[key]) === String(value);
            });

            return matchesSearch && matchesFilters;
        });
    }, [data, searchQuery, filters, searchKeys]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        searchQuery,
        setSearchQuery,
        filters,
        updateFilter,
        filteredData,
    };
};

export default useFilters;
