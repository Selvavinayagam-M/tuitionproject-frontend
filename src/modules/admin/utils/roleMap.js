import { ROLES } from './permissions';

export const getRoleLabel = (role) => {
    switch (role) {
        case ROLES.SUPER_ADMIN: return 'Super Administrator';
        case ROLES.ADMIN: return 'Administrator';
        case ROLES.FACULTY: return 'Faculty Member';
        case ROLES.STUDENT: return 'Student';
        default: return 'User';
    }
};

export const getRoleColor = (role) => {
    switch (role) {
        case ROLES.SUPER_ADMIN: return 'text-purple-600 bg-purple-100';
        case ROLES.ADMIN: return 'text-blue-600 bg-blue-100';
        case ROLES.FACULTY: return 'text-green-600 bg-green-100';
        default: return 'text-gray-600 bg-gray-100';
    }
};
