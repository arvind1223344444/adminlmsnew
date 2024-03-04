import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Topnavbar from '../Components/Topnavbar'
import Footer from '../Components/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Studentcourse() {


    const user_id=localStorage.getItem('user_id');
   
    const [enrollstudent,setEnrollstudent]=useState({});

    const enrollStd=async()=>{
        try{
     const enrollStd = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/course_enroll_student/${user_id}`);
     setEnrollstudent(enrollStd.data.response);
   // console.log(enrollstudent);
    }catch(error){
        console.error("Error fetching enrolled students:", error);
    }
}

    useEffect(()=>{
        enrollStd();
    },[])

  return (
    <>
    
     <Navbar/>
     <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
    <Topnavbar/>
   
    <div className="container-fluid">
     

     <div className="d-sm-flex align-items-center justify-content-between mb-4">
     <h1 className="h5 mb-0 text-gray-800 font-weight-bold">Student Courses</h1>
    
   </div>

     

     <div className="card shadow mb-4">
       <div className="card-header py-3">
         <h6 className="m-0 font-weight-bold text-primary">Student Courses</h6>
       </div>
       <div className="card-body">
         <div className="table-responsive">
           <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
             <thead>
               <tr>
               <th style={{width:"150px"}}>Course Image</th>
                 <th style={{width:"150px"}}>Course Name</th>
                 <th style={{width:"150px"}}>Mode</th>
                 <th style={{width:"150px"}}>Enroll Student</th>
                 <th style={{width:"150px"}}>Start Date</th>
                 <th style={{width:"150px"}}>Course Describtion</th>  
                 <th style={{width:"150px"}}> Action</th>  
                
               </tr>
             </thead>
             <tbody>

              {enrollstudent?.assign_course?.map((course)=>{
               const assetPath = process.env.REACT_APP_SECRET_URL.slice(0,23);
                
                const startDate = new Date(course.startDate);
                const sdate = startDate.getDate(); 
                const smonth = startDate.toLocaleString("default", { month: "long" }); 
                const syears = startDate.getFullYear();
                const courseStartDate=`${syears} ${smonth} ${sdate}`;
                
                const today = new Date();
                const tdate = today.getDate();
                const tmonth = today.toLocaleString("default", { month: "long" });
                const tyear = today.getFullYear();
                const todayDate = `${tdate} ${tmonth} ${tyear}`;

               
                
                return (
                <>
            
                <tr key={course.index}>
                <td style={{width:"18%"}}> <img src={`${assetPath}${course.thumbnail}`} className='img-fluid'></img></td>
                <td> {course.playlist}</td>
                <td> {course.mode_playlist}</td>
                <td> {course.student.length}</td>
                <td> {courseStartDate}</td>
                <td style={{width:"550px"}}> {course.desc.slice(0 , 220)}...</td>
                <td>

                <Link to={`../Studentcoursechapter/${course._id}`} type='button' className='btn btn-primary'>  PlayList </Link>
                
                </td>
              
               </tr>
                </>
              )})}
               
            
              
               
             </tbody>
           
             
           </table>
         </div>
       </div>
     </div>
   </div>

     <Footer/>
   </div>
   </div>
    </>
  
  )
}
