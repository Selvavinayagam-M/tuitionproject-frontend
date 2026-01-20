import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Replace with actual environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if URL is valid to prevent crashes during dev/mock mode
const isValidUrl = (url) => url && (url.startsWith('http://') || url.startsWith('https://'));
export const supabase = isValidUrl(supabaseUrl) ? createClient(supabaseUrl, supabaseKey) : null;

const authService = {
    login: async (email, password) => {
        // --- BYPASS FOR SEEDED USERS (Local Dev / Preview) ---
        // Since seed script creates simple users in MongoDB but not in Supabase,
        // we allow these specific emails to bypass Supabase auth.
        const seededUsers = [
            { email: 'admin@example.com', role: 'admin', name: 'Admin User' },
            { email: 'teacher@tuition.com', role: 'teacher', name: 'John Teacher' },
            { email: 'student@tuition.com', role: 'student', name: 'Alice Student' }
        ];

        const seededMatch = seededUsers.find(u => u.email === email && password === 'password123'); // Simple mock password

        if (seededMatch) {
            console.log("Environment: Local Preview - Using Bypass for Seeded User:", seededMatch.email);
            return {
                user: {
                    id: 'seeded-' + seededMatch.role,
                    email: seededMatch.email,
                    role: seededMatch.role,
                    user_metadata: { full_name: seededMatch.name, role: seededMatch.role }
                },
                session: { access_token: 'mock-seeded-token-' + seededMatch.role }
            };
        }
        // -----------------------------------------------------

        if (!supabase) {
            console.warn("Supabase not configured. Using mock login.");
            return authService.mockLogin('teacher'); // Default fallack
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    logout: async () => {
        if (supabase) {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        }
        localStorage.removeItem('user'); // Clear local state if any
        localStorage.removeItem('token');
    },

    getCurrentUser: async () => {
        if (!supabase) return null;
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    // Mock login for development if Supabase not configured
    mockLogin: async (role) => {
        return {
            user: {
                id: 'mock-id',
                email: `mock${role}@example.com`,
                role: role,
                name: `Mock ${role.charAt(0).toUpperCase() + role.slice(1)}`
            },
            session: { access_token: 'mock-token' }
        };
    }
};

export default authService;

