import { useState, useEffect } from 'react';
import { ROLES } from '../utils/permissions';

const useAdminAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock check auth
        setTimeout(() => {
            setUser({
                id: 1,
                name: 'Admin User',
                role: ROLES.ADMIN,
                email: 'admin@tuition.com'
            });
            setLoading(false);
        }, 500);
    }, []);

    return { user, loading };
};

export default useAdminAuth;
