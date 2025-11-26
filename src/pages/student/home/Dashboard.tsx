import { useEffect, useState } from 'react';
import type { Package, Course} from '@/types/common';


import {courseList} from '@/services/admin/misc'
import {packageList} from '@/services/student/home'
import CourseList from '@/pages/student/home/Courses';
import PackageList from '@/pages/student/home/Packages';

const Dashboard = () => {
  const [list,setList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [packagelist,setPackage] = useState<Package[]>([]);
  const [_packageLoading, setPackageLoading] = useState(true);
  const [_packageerror, setpackageError] = useState<string | null>(null);



  const [currentPage, setCurrentPage] = useState(1);
  const [_totalPages, setTotalPages] = useState(1);
  const [pageSize, _setPageSize] = useState(10);

   useEffect(()=>{
    try{
      const fetchData = async () =>{
           try {
              const res = await courseList({ pageSize, currentPage });
              if(res.status){
                 setList(res.data.results);
                 setTotalPages(Math.ceil(res.data.total / pageSize));
                  if (res.data.total && res.data.total < (currentPage - 1) * pageSize) {
                    setCurrentPage(1);
                  }
              }else{
                 throw new Error('No Data Found');
              }
           } catch (err) {
              setError('Failed to load students');
           } finally {
            setLoading(false);
          }
      }


     fetchData();
    } catch (err){

    }
  },[currentPage, pageSize]);


      useEffect(()=>{
    try{
      const fetchPackage = async () =>{
           try {
              const res = await packageList();
              if(res.status){
                 setPackage(res.data.results);
              }else{
                 throw new Error('No Data Found');
              }
           } catch (err) {
              setpackageError('Failed to load students');
           } finally {
            setPackageLoading(false);
          }
      }


     fetchPackage();
    } catch (err){

    }
  },[]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <>
    <div>
      <div>
        <div className="mb-2"><h4>Buy Packages</h4></div>
        <PackageList packages={packagelist} />
      </div>

      <CourseList courses={list} />



    </div>
  </>;
};

export default Dashboard;
