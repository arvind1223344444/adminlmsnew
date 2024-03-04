import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Topnavbar from '../Components/Topnavbar'
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'



export default function Studentcoursemodule() {
   
    const { id } = useParams()
     const [enrollstudent,setEnrollstudent]=useState({});

    const enrollStd=async()=>{
        try{
     const enrollStd = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login//get_teacher_chapter/${id}`);
     setEnrollstudent(enrollStd?.data?.response);
   //  console.log(enrollstudent);
    }catch(error){
        console.error("Error fetching enrolled students:", error);
    }
}

    useEffect(()=>{
        enrollStd();
    },[id])

    
  return (

    <> 
    

  <Navbar/>
     <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
    <Topnavbar/>

    <div className="container-fluid">
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
     <h6 className="h4 mb-0 text-gray-800 font-weight-bold">Course Playlist</h6>
   </div>

   

     <div className="card shadow mb-4">
       <div className="card-header py-3">
         <h6 className="m-0 font-weight-bold text-primary">Playlist</h6>
       </div>
       <div className="card-body">
         <div className="table-responsive">
           <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
             <thead>
               <tr>
               <th style={{width:"150px"}}>Course Image</th>
                 <th style={{width:"150px"}}>Course Playlist </th>
                 <th style={{width:"150px"}}>Mode</th>
                 <th style={{width:"150px"}}>Start Date</th>
                 <th style={{width:"150px"}}>Start Time</th>
                 <th style={{width:"150px"}}>Course Describtion</th>  
                 <th style={{width:"150px"}}> Action</th>  
                
               </tr>
             </thead>
             <tbody>
              {enrollstudent?.chapters?.map((course)=>{
              
                const assetPath = process.env.REACT_APP_SECRET_URL.slice(0,23);
                
                
          
            
               const targetDate = new Date(course?.lesstionStartDate);
               let hours = targetDate?.getUTCHours(); // Changed from const to let
               const minutes = targetDate?.getUTCMinutes();
               
               let ampm = 'AM';
               
               if (hours >= 12) {
                   ampm = 'PM';
                   if (hours > 12) {
                       hours -= 12;
                   }
               }
              const currentTime = `${hours}:${minutes} ${ampm}`;
             
           //course start date-------------
            const crsstart = course?.lesstionStartDate;
            const crsstartymd = crsstart.split('T')[0];
         
               //Today  date-------------
            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
            const day = String(currentDate.getDate()).padStart(2, '0');

            const currenttodaydate = `${year}-${month}-${day}`;

               //Button blick option
              const isBlinking = crsstartymd === currenttodaydate;
               
              const coursecheck=()=>{
                alert('Not class Today');
              }


                return (
                <>
               
                <tr key={course}>
                <td style={{width:"18%"}}> <img src={`${assetPath}${course?.lessionThumbnail}`} className='img-fluid'></img></td>
                <td> {course?.chapter_name}  </td>
                <td> {course?.mode}</td>
                <td> {crsstartymd}</td>
                <td>{currentTime}</td>
                <td style={{width:"550px"}}> {course?.chapterDscription.slice(0 , 220)}...</td>
                <td>
                {/* <Link to={course.url} type='button' className={`blinking-button btn btn-primary btn-sm  ${isBlinking? 'blink' : 'disabled'}`}>LIve Class</Link> */}
                {/* <Link to={ `../Liveclass/${course?._id}`} type='button' className={`blinking-button btn btn-primary btn-sm  ${isBlinking? 'blink' : ''}`}>LIve Class</Link>
                */}
                 
              <Link
              to={ currenttodaydate  < crsstartymd ? '#' :  `../Liveclass/${course?._id}`}
              onClick={() => {
              if (currenttodaydate < crsstartymd) {
              coursecheck();
              }
              }}
              type='button'
              className={`blinking-button btn btn-primary btn-sm ${isBlinking ? 'blink' : ''}`}
              >
              Live Class
              </Link>
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
