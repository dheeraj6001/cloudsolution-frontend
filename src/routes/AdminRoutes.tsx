import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import AdminLogin from '../pages/admin/auth/Login';
import AdminLayout from '../layouts/admin/AdminLayout';
import AdminDashboard from '../pages/admin/home/Dashboard';
import Students from '../pages/admin/students/Students';
import Courses from '../pages/admin/misc/Courses';
import Subjects from '../pages/admin/misc/Subjects';
import Topics from '../pages/admin/misc/Topics';
import Instructions from '../pages/admin/misc/Instructions';
import News from '../pages/admin/misc/News';
import Documents from '../pages/admin/misc/Documents';
import Notifications from '../pages/admin/misc/Notifications';
import Centers from '../pages/admin/misc/Centers';
import QuestionList from '../pages/admin/questions/Questions';
import Passages from '../pages/admin/questions/Passages';
import Tests from '../pages/admin/tests/Tests';
import TestSeries from '../pages/admin/testpackage/TestSeries';
import Reports from '../pages/admin/reports/Reports';
import Videos from '../pages/admin/videos/Videos';
import Message from '../pages/admin/settings/Message';
import Profile from '../pages/admin/settings/Profile';
import Banners from '../pages/admin/settings/Banners';
import Settings from '../pages/admin/settings/Settings';
import Template from '../pages/admin/settings/Template';
import Subcourse from '../pages/admin/misc/Subcourse';
import AddQuestion from '@/pages/admin/tests/AddQuestionPage'; 
import MediaLibrary from '@/pages/admin/media/Library'; 
import TestQuestions from '@/pages/admin/tests/TestQuestions'; 
import AddTestPage from "@/pages/admin/tests/AddTestPage";
import TsTests from "@/pages/admin/testpackage/TsTests";
import TestPackages from "@/pages/admin/testpackage/TestPackages";
import ExamReports from "@/pages/admin/tests/ExamReports";
import ViewSolutions from "@/pages/admin/tests/ViewSolutions";





import ImportFromDoc from '@/pages/admin/tests/imports/ImportFromDoc'; 
import ImportFromExcel from '@/pages/admin/tests/imports/ImportFromExcel'; 
import ManualQuestionEntry from '@/pages/admin/tests/imports/ManualQuestionEntry'; 








const AdminRoutes = (
  <>

    <Route path="/admin" element={<AdminLogin />} />
    
    <Route path="/admin" element={<ProtectedRoute requiredRole="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="packages" element={<TestPackages />} />
          <Route path="reports" element={<ExamReports />} />
          <Route path="view-solutions" element={<ViewSolutions />} />



          <Route path="courses" element={<Courses />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="topics" element={<Topics />} />
          <Route path="news" element={<News />} />
          <Route path="documents" element={<Documents />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="centers" element={<Centers />} />
          <Route path="questions" element={<QuestionList />} />
          <Route path="instructions" element={<Instructions />} />
          <Route path="passages" element={<Passages />} />
          <Route path="tests" element={<Tests />} />
          <Route path="test-series" element={<TestSeries />} />
          <Route path="test-series/:tsId/tests" element={<TsTests />} />
          <Route path="tests/:testId/viewquestion" element={<TestQuestions />} />

          <Route path="reports" element={<Reports />} />
          <Route path="videos" element={<Videos />} />
          <Route path="message" element={<Message />} />
          <Route path="banners" element={<Banners />} />
          <Route path="settings" element={<Settings />} />
          <Route path="templates" element={<Template />} />
          <Route path="subcourse" element={<Subcourse />} />
          <Route path="profile" element={<Profile />} />
          <Route path="library" element={<MediaLibrary />} />
          <Route path="tests/:testId/add-question" element={<AddQuestion />} />
          
          

          <Route path="tests/new" element={<AddTestPage />} />
          <Route path="tests/:testId/subjects/:subjectId/import-doc" element={<ImportFromDoc />} />
          <Route path="tests/:testId/subjects/:subjectId/import-excel" element={<ImportFromExcel />} />
          <Route path="tests/:testId/subjects/:subjectId/import-manual" element={<ManualQuestionEntry />} />


        </Route>
    </Route>


  </>
);

export default AdminRoutes;
