import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/features/auth/authSlice';

const LogoutButton = ({ className = "", showText = true, iconClassName = "w-5 h-5", textClassName = "font-medium" }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout()); // Dispatch redux action

            // Manual check to ensure sync
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
            // Fallback
            navigate('/login');
        }
    };

    return (
        <button
            onClick={handleLogout}
            title="Sign Out"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent hover:border-red-200 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group ${className}`}
        >
            <FiLogOut className={`transition-transform group-hover:scale-110 ${iconClassName}`} />
            {showText && <span className={`hidden md:inline ${textClassName}`}>Logout</span>}
        </button>
    );
};

export default LogoutButton;
