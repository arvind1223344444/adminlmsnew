import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Topnavbar from '../Components/Topnavbar'
import axios from 'axios';
import { useState, useEffect} from 'react'

export default function Teachercours() {
 
        
    const userid=localStorage.getItem('user_id');
  
    const [studetnplaylsit,setStudetnplaylsit]=useState([]);
    const studetnplaylsitfun=async()=>{
       try{
     const  response= await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/teacher_assign_courses/${userid}`);
     setStudetnplaylsit(response.data.response);
   //console.log(studetnplaylsit);
    } catch(error){
        console.error(error);
    }
}

    useEffect(()=>{
        studetnplaylsitfun();
    },[])


     
    const [studentchapter,setstudentchapter]=useState([]);
    const [allstudent,setallstudent]=useState([]);

    const playlistget = async (playlistId) => {
        // alert(playlistId);
        try {
          const response1 = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_chapter/${playlistId}`);
          setstudentchapter(response1.data.response);
         // console.log(studentchapter);
      
          //all student fetch this api
          const response2 = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/student_enroll_list/${playlistId}`);
         
          setallstudent(response2.data);
          //console.log(allstudent);
          setSelectedChapter('');
        } catch (error) {
          console.error(error);
        }
      };

     

   
        const [selectedPlaylist, setSelectedPlaylist] = useState('');
        const [selectedChapter, setSelectedChapter] = useState('');
      
        const [studentdetails,setStudentdetails]=useState({});

        const handleformSubmit = async (event) => {
            event.preventDefault();

            try {
        // alert(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/present_student/${selectedChapter}`)
            const  response= await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/present_student/${selectedChapter}`);
              setStudentdetails(response.data.presentStudent);
             
              //alert()
            } catch (error) {
              console.error(error);
            }
           // }
          };


  return (

    <> 
   

  <Navbar/>
     <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
    <Topnavbar/>

    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
     <h6 className="h4 mb-0 text-gray-800 font-weight-bold">Student Details</h6>
    </div>

     <div className="card shadow mb-4">
       <div className="card-header py-3">
        <div className='row'>
            <h6 className='font-weight-bold'>Select Course</h6>
        </div>
        <form onSubmit={handleformSubmit}>
        <div className='row'>
          <div className='col-md-3 my-1'>
            
            <select
              className="form-control"
              value={selectedPlaylist}
              onChange={(e) => {
                setSelectedPlaylist(e.target.value);
                playlistget(e.target.value);
              }}
            >
              <option value="" disabled>Select Playlist</option>
              {studetnplaylsit?.assign_course?.map((studentplaylist, index) => (
                <option key={index} value={studentplaylist._id}>
                  {studentplaylist.playlist}
                </option>
              ))}
            </select>
          </div>

          <div className='col-md-3 my-1'>
            <select
              className="form-control"
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                // chaptid(e.target.value)
              }}
            >
              <option value=""  selected>Select Chapter</option>
              {studentchapter?.map((chapterstudent, index) => (
                <option key={index} value={chapterstudent._id}>
                  {chapterstudent.chapter_name}
                </option>
              ))}
            </select>
          </div>

         
          <div className='col-md-3 my-1'>
            <button type='submit' className='btn-block btn-warning text-dark font-weight-bold'>Search </button>
          </div>
        </div>
      </form>
     
    
       </div>




       <div className="card-body">
         <div className="table-responsive">
           <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
             <thead>
               <tr>
               <th style={{width:"150px"}}>S.No</th>
                 <th style={{width:"150px"}}>Student Name </th>
                 <th style={{width:"150px"}}> Chapter</th>
                 <th style={{width:"150px"}}>Status</th> 
                 <th style={{width:"150px"}}>In time</th>
                 <th style={{width:"150px"}}>Out time</th>    
                 <th style={{width:"150px"}}>Total time</th>  
               </tr>
             </thead>
             
             <tbody>
                

  {allstudent?.students?.map((student, index) => {
    // Ensure studentdetails is properly initialized as an array
    const studentDetail = Array.isArray(studentdetails) ? studentdetails.find(detail => detail?.student_id === student?._id) : null;
    


 // class in timer
 const imtimes = studentDetail?.in_time;
 const imtimesobj = new Date(imtimes);

 const sthours = imtimesobj.getHours();
 const stminutes = imtimesobj.getMinutes();
 const stseconds = imtimesobj.getSeconds();

 const intime = `${sthours}:${stminutes}:${stseconds}`;


   // class out timer
   const ottimes = studentDetail?.out_time;
   const outimesobj = new Date(ottimes);

   const outhours = outimesobj.getHours();
   const outminutes = outimesobj.getMinutes();
   const outseconds = outimesobj.getSeconds();

   const outtime = `${outhours}:${outminutes}:${outseconds}`;
 

  //  total time caculation
   const intimeParts = intime.split(':').map(part => parseInt(part));
   const outtimeParts = outtime.split(':').map(part => parseInt(part));
  
   const inTotalSeconds = intimeParts[0] * 3600 + intimeParts[1] * 60 + intimeParts[2];
  const outTotalSeconds = outtimeParts[0] * 3600 + outtimeParts[1] * 60 + outtimeParts[2];

   const timeDurationSeconds = outTotalSeconds - inTotalSeconds;

  const hours = Math.floor(timeDurationSeconds / 3600);
  const remainingSeconds = timeDurationSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const timeDuration = `${hours}:${minutes}:${seconds}`;
    
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{student.name}</td>
        <td>{studentDetail ? studentDetail?.chapter_name : "N/A"}</td>
        
        <td>
          {studentDetail ? 
            <span className="rbt-badge-5 " style={{backgroundColor:'#F6F6F6', color:'#3EB75E', padding:'5px 7px',fontSize:'14px'}}>Present</span>
            :
            <span className="rbt-badge-5 " style={{backgroundColor:'#ff000310', color:'#ff0003', padding:'5px 7px',fontSize:'14px'}}> Absent</span>
          }
        </td>
        <td>{studentDetail ? intime : "N/A"}</td>
        <td>{studentDetail ? outtime : "N/A"}</td>
        <td> {timeDuration} </td>
      </tr>
    );
  })}
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
