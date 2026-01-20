import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail-safe for development without keys - Prevents app crash
const isValidUrl = (url) => {
    try { return Boolean(new URL(url)); } catch (e) { return false; }
};

export const supabase = (isValidUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: () => Promise.reject(new Error("Supabase keys missing! Check .env")),
            signUp: () => Promise.reject(new Error("Supabase keys missing! Check .env")),
            signOut: () => Promise.resolve(),
        }
    };

