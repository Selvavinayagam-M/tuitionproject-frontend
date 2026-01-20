import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const PublicLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isAuthPage = ['/login', '/register', '/signup'].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && <Navbar />}
            <main className={`flex-grow ${!isHome && !isAuthPage ? 'pt-20' : ''}`}>
                <Outlet />
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default PublicLayout;
