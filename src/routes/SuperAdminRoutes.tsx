import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import SuperAdminLogin from '../pages/superadmin/auth/Login';
import SuperAdminLayout from '../layouts/superadmin/SuperAdminLayout';
import SuperAdminDashboard from '../pages/superadmin/Dashboard';
import SuperUserManagement from '../pages/superadmin/Users';
import SuperAdminEnquiryList from '../pages/superadmin/enquiry/list';
import SuperAdminInstitutesList from '../pages/superadmin/institutes/instituteslist';



const SuperAdminRoutes = (
  <>
    {/* Public admin login route */}
    <Route path="/superadmin" element={<SuperAdminLogin />} />
    
    {/* Protected admin routes with layout */}
    <Route path="/superadmin" element={<ProtectedRoute requiredRole="superadmin" />}>
      <Route element={<SuperAdminLayout />}>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="users" element={<SuperUserManagement />} />
        <Route path="enquiry" element={<SuperAdminEnquiryList />} />
        <Route path="institutes" element={<SuperAdminInstitutesList />} />
      </Route>
    </Route>
  </>
);

export default SuperAdminRoutes;
