import React from 'react';
import AdminRoutes from './routes/admin.routes';

/**
 * Main Entry Point for the Admin Module.
 * This component should be lazy loaded in the main App.jsx
 * path: /admin/*
 */
const AdminPage = () => {
    return <AdminRoutes />;
};

export default AdminPage;
