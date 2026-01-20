import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import api from '../../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for active session
        const checkSession = async () => {
            try {
                // 1. Check for Supabase Session
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    await syncUserWithBackend(session);
                } else {
                    // 2. Check for Dev/Seeded Session (Bypass)
                    const token = localStorage.getItem('token');
                    const userInfo = localStorage.getItem('userInfo');
                    const authProvider = localStorage.getItem('authProvider');

                    if (token && userInfo && authProvider === 'dev') {
                        console.log("Restoring Dev Session");
                        setUser(JSON.parse(userInfo));
                    }
                }
            } catch (err) {
                console.error("Session check failed", err);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session) {
                // Valid Supabase Session
                localStorage.setItem('authProvider', 'supabase');
                await syncUserWithBackend(session);
            } else {
                // No Supabase Session - Check if we are using Dev Provider
                const authProvider = localStorage.getItem('authProvider');
                if (authProvider === 'dev') {
                    // Ignore Supabase logout event for Dev users
                    return;
                }

                // Real Logout
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('authProvider');
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const syncUserWithBackend = async (session) => {
        try {
            const token = session.access_token;
            localStorage.setItem('token', token); // Essential for axios interceptor

            // Sync with backend to get role and DB ID
            const response = await api.post('/auth/sync', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const dbUser = response.data.data;
            setUser({ ...dbUser, ...session.user }); // Merge Supabase user with DB user
            localStorage.setItem('userInfo', JSON.stringify({ ...dbUser, ...session.user }));
        } catch (err) {
            console.error("Backend sync failed", err);
            // If sync fails, force logout or handle gracefully
            setError("Failed to synchronize user data.");
        }
    };

    const login = async (email, password) => {
        setError(null);
        try {
            // Check for seeded check via authService
            const seededUsers = [
                { email: 'admin@example.com', role: 'admin', name: 'Admin User' },
                { email: 'teacher@tuition.com', role: 'teacher', name: 'John Teacher' },
                { email: 'student@tuition.com', role: 'student', name: 'Alice Student' }
            ];
            const seededMatch = seededUsers.find(u => u.email === email && password === 'password123');

            if (seededMatch) {
                console.log("Context: Using Seeded Bypass");

                // Call Backend Dev Login to get Real JWT
                try {
                    const response = await api.post('/auth/dev-login', { email });
                    const { token, user } = response.data.data;

                    setUser(user);
                    localStorage.setItem('userInfo', JSON.stringify(user));
                    localStorage.setItem('token', token);
                    localStorage.setItem('authProvider', 'dev'); // MARK AS DEV USER

                    return { user, session: { access_token: token } };
                } catch (devErr) {
                    console.error("Dev login failed", devErr);
                    throw new Error("Dev login failed: " + (devErr.response?.data?.message || devErr.message));
                }
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const register = async (name, email, password, role = 'student') => {
        setError(null);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name, role: role }
                }
            });

            if (error) throw error;
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            // Force verify clean up
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('authProvider');
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const demoLogin = (role = 'student') => {
        const demoUser = {
            id: 'demo-user-123',
            email: `demo.${role}@tuition.com`,
            name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            role: role
        };
        setUser(demoUser);
        localStorage.setItem('userInfo', JSON.stringify(demoUser));
        localStorage.setItem('token', 'demo-token');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, register, demoLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
