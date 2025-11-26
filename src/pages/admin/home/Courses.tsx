
import type { Course } from '@/types/common';

const CourseList = ({ list }: { list: Course[] }) => {
      {list.map((crs,index: number)=>(
      <li key={index} className="font-semibold">{crs.title}</li>
      ))}
}
export default CourseList;