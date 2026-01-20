import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import { AdminProvider } from './modules/admin/context/AdminContext';
import ProtectedRoute from './shared/components/ProtectedRoute';
import ScrollToTop from './shared/components/ScrollToTop';

// Public Layout
import PublicLayout from './shared/components/Layout/PublicLayout';

// Public Pages
import Home from './modules/home/HomePage';
import About from './modules/about/AboutPage';
import Courses from './modules/courses/CoursesPage';
import PublicAdmissions from './modules/admissions/AdmissionsPage';
import Results from './modules/results/ResultsPage';
import Faculty from './modules/faculty/FacultyPage';
import Contact from './modules/contact/ContactPage';

// Auth & Common Pages
import Login from './pages/Login';
import Register from './pages/Register';
// import Dashboard from './pages/Dashboard'; // Legacy Dashboard, replaced by modules

// Student Module
import StudentLayout from './modules/student/components/Layout/StudentLayout';
import StudentDashboard from './modules/student/StudentDashboard';
import StudentCourses from './modules/student/pages/StudentCourses';
import StudentAttendance from './modules/student/pages/StudentAttendance';
import StudentAssignments from './modules/student/pages/StudentAssignments';
import StudentExams from './modules/student/pages/StudentExams';
import StudentProgress from './modules/student/pages/StudentProgress';
import StudentFees from './modules/student/pages/StudentFees';
import StudentSupport from './modules/student/pages/StudentSupport';
import StudentProfile from './modules/student/pages/StudentProfile';
import StudentSyllabus from './modules/student/pages/StudentSyllabus';

// Parent Module
import ParentLayout from './modules/parent/components/Layout/ParentLayout';
import ParentDashboard from './modules/parent/ParentDashboard';
import ParentChildren from './modules/parent/pages/ParentChildren';
import ParentCourses from './modules/parent/pages/ParentCourses';
import ParentPerformance from './modules/parent/pages/ParentPerformance';
import ParentAttendance from './modules/parent/pages/ParentAttendance';
import ParentFees from './modules/parent/pages/ParentFees';
import ParentCommunication from './modules/parent/pages/ParentCommunication';
import ParentSettings from './modules/parent/pages/ParentSettings';

// Teacher Module
import TeacherLayout from './modules/teacher/components/Layout/TeacherLayout';
import TeacherDashboard from './modules/teacher/TeacherDashboard';
// Duplicate removed
import TeacherStudents from './modules/teacher/pages/TeacherStudents';
import TeacherAttendance from './modules/teacher/pages/TeacherAttendance';
import TeacherAssignments from './modules/teacher/pages/TeacherAssignments';
import TeacherGrading from './modules/teacher/pages/TeacherGrading';
import TeacherExams from './modules/teacher/pages/TeacherExams';
import TeacherSchedule from './modules/teacher/pages/TeacherSchedule';
import TeacherCommunication from './modules/teacher/pages/TeacherCommunication';
import TeacherCourses from './modules/teacher/pages/TeacherCourses';
import TeacherSettings from './modules/teacher/pages/TeacherSettings';

// Admin Module
import AdminLayout from './modules/admin/components/Layout/AdminLayout';
import AdminDashboard from './modules/admin/components/AdminDashboard';
import StudentsPage from './modules/admin/pages/StudentsPage';
import AddStudent from './modules/admin/components/AddStudent';
import AdminAdmissions from './modules/admin/components/Admissions';
import CourseManager from './modules/admin/components/CourseManager';
import FacultyManager from './modules/admin/components/FacultyManager';
import AttendanceManager from './modules/admin/components/AttendanceManager';
import ExamManager from './modules/admin/components/ExamManager';
import FeeManager from './modules/admin/components/FeeManager';
import ReportAnalytics from './modules/admin/components/ReportAnalytics';
import AdminSettings from './modules/admin/components/AdminSettings';
import BatchManager from './modules/admin/components/Academic/BatchManager';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AdminProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/admissions" element={<PublicAdmissions />} />
              <Route path="/results" element={<Results />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route element={<StudentLayout />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="attendance" element={<StudentAttendance />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="exams" element={<StudentExams />} />
                <Route path="progress" element={<StudentProgress />} />
                <Route path="fees" element={<StudentFees />} />
                <Route path="support" element={<StudentSupport />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="syllabus" element={<StudentSyllabus />} />
                <Route path="notices" element={<StudentDashboard />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>

            {/* Parent Routes */}
            <Route path="/parent" element={<ProtectedRoute allowedRoles={['parent']} />}>
              <Route element={<ParentLayout />}>
                <Route path="dashboard" element={<ParentDashboard />} />
                <Route path="children" element={<ParentChildren />} />
                <Route path="courses" element={<ParentCourses />} />
                <Route path="performance" element={<ParentPerformance />} />
                <Route path="attendance" element={<ParentAttendance />} />
                <Route path="fees" element={<ParentFees />} />
                <Route path="communication" element={<ParentCommunication />} />
                <Route path="settings" element={<ParentSettings />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>

            {/* Teacher Routes */}
            <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']} />}>
              <Route element={<TeacherLayout />}>
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="students" element={<TeacherStudents />} />
                <Route path="attendance" element={<TeacherAttendance />} />
                <Route path="assignments" element={<TeacherAssignments />} />
                <Route path="exams" element={<TeacherExams />} />
                <Route path="schedule" element={<TeacherSchedule />} />
                <Route path="communication" element={<TeacherCommunication />} />
                <Route path="courses" element={<TeacherCourses />} />
                <Route path="grading" element={<TeacherGrading />} />
                <Route path="settings" element={<TeacherSettings />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="students" element={<StudentsPage />} />
                <Route path="students/add" element={<AddStudent />} />
                <Route path="admissions" element={<AdminAdmissions />} />
                <Route path="leads" element={<AdminAdmissions />} />
                <Route path="courses" element={<CourseManager />} />
                <Route path="batches" element={<BatchManager />} />
                <Route path="faculty" element={<FacultyManager />} />
                <Route path="attendance" element={<AttendanceManager />} />
                <Route path="exams" element={<ExamManager />} />
                <Route path="fees" element={<FeeManager />} />
                <Route path="reports" element={<ReportAnalytics />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AdminProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
