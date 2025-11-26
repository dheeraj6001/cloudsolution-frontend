import { useEffect, useState } from 'react';
import { courseList } from '@/services/admin/misc';
import { packageList } from '@/services/student/home';
import CourseList from '@/pages/student/home/Courses';
import PackageList from '@/pages/student/home/Packages';

import type { Package } from '@/types/common'; // ✅ this is correct now

import { Course } from '@/types/common';

const BuyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState<string | null>(null);

  const [packages, setPackages] = useState<Package[]>([]);
  const [packageLoading, setPackageLoading] = useState(true);
  const [packageError, setPackageError] = useState<string | null>(null);

  const [currentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courseList({ currentPage, pageSize });
        if (res.status) {
          setCourses(res.data.results);
        } else {
          throw new Error('No courses found');
        }
      } catch {
        setCourseError('Failed to load courses');
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, pageSize]);

  // Fetch packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await packageList();
        if (res.status) {
          setPackages(res.data.results);
        } else {
          throw new Error('No packages found');
        }
      } catch {
        setPackageError('Failed to load packages');
      } finally {
        setPackageLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="space-y-6">
      {/* Packages */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Buy Packages</h4>
        {packageLoading && <p>Loading packages...</p>}
        {packageError && <p className="text-red-500">{packageError}</p>}
        {!packageLoading && !packageError && <PackageList packages={packages} />}
      </div>

      {/* Courses */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Buy Courses</h4>
        {courseLoading && <p>Loading courses...</p>}
        {courseError && <p className="text-red-500">{courseError}</p>}
        {!courseLoading && !courseError && <CourseList courses={courses} />}
      </div>
    </div>
  );
};

export default BuyCourses;
