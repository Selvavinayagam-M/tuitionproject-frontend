import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import DashboardPage from '../pages/DashboardPage';
import AdmissionsPage from '../pages/AdmissionsPage';
import StudentsPage from '../pages/StudentsPage';
import FacultyPage from '../pages/FacultyPage';
import CoursesPage from '../pages/CoursesPage';
import ExamsPage from '../pages/ExamsPage';
import AttendancePage from '../pages/AttendancePage';
import FeesPage from '../pages/FeesPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/ProfilePage';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="admissions" element={<AdmissionsPage />} />
                <Route path="students" element={<StudentsPage />} />
                <Route path="faculty" element={<FacultyPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="exams" element={<ExamsPage />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="fees" element={<FeesPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
