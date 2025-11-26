// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  requiredRole?: 'superadmin' | 'admin' | 'student' | 'teacher';
};

const tokenKeyMap: Record<string, string> = {
  superadmin: 'superAdminToken',
  admin: 'adminToken',
  student: 'studentToken',
  teacher: 'teacherToken',
};

const ProtectedRoute = ({ requiredRole }: Props) => {
  const role = requiredRole || 'admin'; // default to admin
  const tokenKey = tokenKeyMap[role];
  const token = localStorage.getItem(tokenKey);

  return token ? <Outlet /> : <Navigate to={`/${role}`} replace />;
};

export default ProtectedRoute;
