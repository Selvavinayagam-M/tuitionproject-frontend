import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset, loginSuccess } from '../store/features/auth/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student', // Default role
        name: '',
        phone: '',
        grade: ''
    });

    const { email, password, role, name, phone, grade } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            if (user?.role === 'admin') navigate('/admin/dashboard');
            else if (user?.role === 'teacher') navigate('/teacher/dashboard');
            else if (user?.role === 'parent') navigate('/parent/dashboard');
            else if (user?.role === 'student') navigate('/student/dashboard');
            else navigate('/dashboard');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password, role, name, phone, grade };
        dispatch(login(userData));
    };

    // Demo Login Logic
    const handleDemoLogin = () => {
        const demoUser = {
            id: 'demo-user-123',
            name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            email: `demo.${role}@tuition.com`,
            role: role,
            token: 'demo-token'
        };

        // Update Redux directly
        dispatch(loginSuccess({ user: demoUser, role: role }));

        toast.success(`Welcome to Demo Mode as ${role}`);
    };

    return (
        <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[80vh]">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-gray-500">
                        {isLogin ? 'Sign in to access your dashboard' : 'Fill in your details to get started'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Role Selector */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">I am a...</label>
                        <select
                            name="role"
                            value={role}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="parent">Parent</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {!isLogin && (
                        <>
                            <div className="mb-4 animate-fadeIn">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                                <input
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    type="text"
                                    placeholder="John Doe"
                                    required={!isLogin}
                                />
                            </div>

                            <div className="mb-4 animate-fadeIn">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                                <input
                                    name="phone"
                                    value={phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    required={!isLogin}
                                />
                            </div>

                            {role === 'student' && (
                                <div className="mb-4 animate-fadeIn">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Grade / Class</label>
                                    <select
                                        name="grade"
                                        value={grade}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        required={!isLogin}
                                    >
                                        <option value="">Select Grade</option>
                                        <option value="9">Class 9</option>
                                        <option value="10">Class 10</option>
                                        <option value="11">Class 11</option>
                                        <option value="12">Class 12</option>
                                    </select>
                                </div>
                            )}
                        </>
                    )}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            type="email"
                            placeholder="user@example.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            type="password"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform active:scale-95 transition-all duration-200 disabled:opacity-50"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-900 font-bold hover:underline focus:outline-none"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors border border-gray-200"
                    >
                        Try Demo Login (No Credentials)
                    </button>
                    <p className="mt-2 text-center text-xs text-gray-500">
                        Automatically logs you in as a {role} for testing.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
