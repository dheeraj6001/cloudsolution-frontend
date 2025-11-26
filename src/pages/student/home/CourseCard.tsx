import { Course } from '@/types/common';

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <li className="border p-4 rounded shadow">
      <h3 className="font-bold text-lg">{course.name}</h3>
      <p>Status: {course.status === 1 ? 'Active' : 'Inactive'}</p>
    </li>
  );
};

export default CourseCard;