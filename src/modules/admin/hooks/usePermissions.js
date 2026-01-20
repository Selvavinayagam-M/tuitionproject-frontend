import { ROLE_PERMISSIONS } from '../utils/permissions';
import useAdminAuth from './useAdminAuth';

const usePermissions = () => {
    const { user } = useAdminAuth();

    const hasPermission = (permission) => {
        if (!user) return false;
        const userPermissions = ROLE_PERMISSIONS[user.role] || [];
        return userPermissions.includes(permission);
    };

    return { hasPermission };
};

export default usePermissions;
