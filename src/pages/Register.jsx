import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../modules/admin/context/AdminContext';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAdmin();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student' // Default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/register`, formData);

            if (data.success) {
                localStorage.setItem('token', data.token);
                // Optionally auto-login
                login(data.data || { name: formData.name, email: formData.email });
                navigate('/');
            }
        } catch (error) {
            alert(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900">Create Account</h1>
                    <p className="text-gray-500">Join our learning platform</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            type="text"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            type="email"
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            type="password"
                            placeholder="Create a password"
                            required
                            minLength="6"
                        />
                    </div>

                    <button
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform active:scale-95 transition-all duration-200"
                        type="submit"
                    >
                        Sign Up
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-900 font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
