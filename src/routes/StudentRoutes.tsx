import { Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import StudentLayout from '../layouts/student/StudentLayout';
import StudentLogin from '../pages/student/auth/Login';
import StudentSignUp from '../pages/student/auth/SignUp';


import StudentDashboard from '../pages/student/home/Dashboard';
import FreeTest from '../pages/student/tests/FreeTest';
import StartTest from '../pages/testpanel/StartTest';


import StudentProfile from '../pages/student/Profile';
import BuyPackage from '../pages/student/shopping/BuyPackage';
import PackageDetail from '../pages/student/packages/PackageDetail';
import BuyCourses from '../pages/student/packages/BuyCourses';
import BookMarksQuestions from '../pages/student/tests/BookMarksQuestions';
import TestReports from '../pages/student/tests/Reports';
import ReportDetail from '../pages/student/tests/ReportDetail';
import Documents from '../pages/student/documents/Documents';






const StudentRoutes = (
  <>
  <Route path="/student" element={<StudentLogin />} />
  <Route path="/student/login" element={<StudentLogin />} />
  <Route path="/student/signup" element={<StudentSignUp />} />

  <Route path="/student" element={<ProtectedRoute requiredRole="student" />}>
      <Route element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="freetest" element={<FreeTest />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="buy-courses" element={<BuyCourses />} />
        <Route path="buypackage/:packageId" element={<BuyPackage />} />
        <Route path="package-detail/:packageId" element={<PackageDetail />} />
        <Route path="book-marks-questions" element={<BookMarksQuestions />} />
        <Route path="reports" element={<TestReports />} />
        <Route path="reports/:id" element={<ReportDetail />} />
        <Route path="documents" element={<Documents />} />



      </Route>
  </Route>
  <Route path="/testpanel/starttest/:testId" element={<StartTest />} />
  </>
);

export default StudentRoutes;
