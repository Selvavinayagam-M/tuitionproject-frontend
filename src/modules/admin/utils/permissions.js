export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student'
};

export const PERMISSIONS = {
    VIEW_DASHBOARD: 'view_dashboard',
    MANAGE_STUDENTS: 'manage_students',
    MANAGE_FACULTY: 'manage_faculty',
    MANAGE_COURSES: 'manage_courses',
    MANAGE_FEES: 'manage_fees',
    VIEW_REPORTS: 'view_reports',
    MANAGE_SETTINGS: 'manage_settings',
};

export const ROLE_PERMISSIONS = {
    [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
    [ROLES.ADMIN]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.MANAGE_STUDENTS,
        PERMISSIONS.MANAGE_FACULTY,
        PERMISSIONS.MANAGE_COURSES,
        PERMISSIONS.MANAGE_FEES,
        PERMISSIONS.VIEW_REPORTS,
    ],
    [ROLES.FACULTY]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.MANAGE_STUDENTS,
    ]
};
