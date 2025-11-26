import { FC } from 'react';
import CourseCard from './CourseCard';
import { Course } from '@/types/common';

interface CourseListProps {
  courses: Course[];
}

const CourseList: FC<CourseListProps> = ({ courses }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </ul>
  );
};

export default CourseList;
