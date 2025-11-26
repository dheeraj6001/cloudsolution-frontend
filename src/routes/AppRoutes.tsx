import { useEffect } from "react";

import { Routes, Route } from 'react-router-dom';
import WebsiteRoutes from './WebsiteRoutes';
import StudentRoutes from './StudentRoutes';
import AdminRoutes from './AdminRoutes';
import SuperAdminRoutes from './SuperAdminRoutes';

import NotFound from '../pages/temp/NotFound';

import getVendor from "../utils/getVendor";


const AppRoutes = () => {

  const vendor = getVendor();

  useEffect(() => {
    console.log(vendor);
  }, [vendor.theme]);


  return (
    <Routes>
      {/* Public Website */}
      {WebsiteRoutes[vendor.id]}

      {/* Student Section */}
      {StudentRoutes}

      {/* Admin Section */}
      {AdminRoutes}

      {/* SuperAdmin Section */}
      {SuperAdminRoutes}

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
