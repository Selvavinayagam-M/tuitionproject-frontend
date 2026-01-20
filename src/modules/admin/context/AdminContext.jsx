import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const navigate = useNavigate();

    // Global Admin State
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminUser')) || null);
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem('adminBranch') || 'Head Office');
    const [theme, setTheme] = useState(localStorage.getItem('adminTheme') || 'light');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Persist State
    useEffect(() => {
        localStorage.setItem('adminBranch', selectedBranch);
        localStorage.setItem('adminTheme', theme);
    }, [selectedBranch, theme]);

    // Auth Actions
    const login = (userData) => {
        // In real app, this would come from API response
        const userWithRole = { ...userData, role: userData.email.includes('super') ? 'Super Admin' : 'Branch Admin' };
        setUser(userWithRole);
        localStorage.setItem('adminUser', JSON.stringify(userWithRole));
        navigate('/admin/dashboard');
    };

    const logout = () => {
        if (window.confirm("Are you sure you want to secure logout?")) {
            setUser(null);
            localStorage.removeItem('adminUser');
            navigate('/login');
        }
    };

    // Branch Switching (Enterprise Feature)
    const switchBranch = (branchName) => {
        // Verify RBAC for branch switching
        if (user?.role !== 'Super Admin' && user?.branch !== branchName) {
            alert("Access Denied: You do not have permission to view other branches.");
            return;
        }
        setSelectedBranch(branchName);
        // In real app, this would trigger a refetch of all branch-specific data
        window.location.reload(); // Simulating a fresh load for the new branch context
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <AdminContext.Provider value={{
            user,
            login,
            logout,
            selectedBranch,
            switchBranch,
            theme,
            setTheme,
            isSidebarOpen,
            toggleSidebar,
            branches: ['Head Office', 'Naini Branch', 'Jhunsi Branch'] // Config driven
        }}>
            {children}
        </AdminContext.Provider>
    );
};
