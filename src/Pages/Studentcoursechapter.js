import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Topnavbar from '../Components/Topnavbar'
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'



export default function Studentcoursechapter() {
   
    const { id } = useParams()
     const [enrollstudent,setEnrollstudent]=useState([]);
    
    const enrollStd=async()=>{
     // alert(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_all_student/${id}`);
        try{
     const enrollStd = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_all_student/${id}`);
     setEnrollstudent(enrollStd.data.response);
    // console.log(enrollstudent);
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
         <h6 className="m-0 font-weight-bold text-primary">Enroll Student</h6>
       </div>
       <div className="card-body">
         <div className="table-responsive">
           <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
             <thead>
               <tr>
               <th style={{width:"50px"}}>S.No</th>
               <th style={{width:"150px"}}>Student Name</th>
               <th style={{width:"150px"}}>Profile</th>
                 <th style={{width:"150px"}}>Mobile</th>
                 <th style={{width:"150px"}}>State</th>
                 <th style={{width:"150px"}}>Email</th>
                 <th style={{width:"150px"}}> Assignment </th>  
                 <th style={{width:"150px"}}> Attendance </th> 
              
               </tr>
             </thead>
             <tbody>
              {enrollstudent?.map((enrollstudents,index)=>{
                return (
                <>
                
                <tr key={index}>
                <td>{index+1}</td>
               
                <td>{enrollstudents?.name} </td>
                <td>{enrollstudents?.image}</td>
                <td>{enrollstudents?.mobile}</td>
                <td>{enrollstudents?.state}</td>
                <td>{enrollstudents?.email}</td>
               
                <td>
                {/* <button type="button" className='btn btn-primary'>View </button> */}
                   {/* <Link to={course.url} type='button' className={`blinking-button btn btn-primary btn-sm  ${isBlinking? 'blink' : 'disabled'}`}>LIve Class</Link> */}
                <Link to={`../Studentplaylistdetails/${enrollstudents._id}`} type='button' className={`blinking-button btn btn-primary btn-sm`}>View Details</Link>
               
                </td>

                <td>
                <Link to={`../Studentattendace/${enrollstudents._id}`} type='button' className={`blinking-button btn btn-primary btn-sm`}>View Details</Link>
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
