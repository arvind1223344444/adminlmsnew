import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Topnavbar from '../Components/Topnavbar'
import axios from 'axios';
import { useState, useEffect} from 'react'

export default function Studentattendace() {
   
    const {id} = useParams()
     
    const [studetnplaylsit,setStudetnplaylsit]=useState([]);
    const studetnplaylsitfun=async()=>{
     
        try{
     const  response= await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_playlist/${id}`);
     setStudetnplaylsit(response.data.response);
  // console.log(studetnplaylsit);
    } catch(error){
        console.error(error);
    }
}
    useEffect(()=>{
        studetnplaylsitfun();
    },[])

    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [stdatd,setstdatd]=useState([]);

    const handleformSubmit=async(e)=>{
        e.preventDefault();
    try{
        
        if(selectedPlaylist){
            const stdatdren=await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_student_attendance/${id}/${selectedPlaylist}`);
            // alert(selectedPlaylist);
            setstdatd(stdatdren.data);
            
        }
        else{
            alert('Please select a playlist');
        }
   
        }catch(error){
        console.log(error);
        }
        }
    


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
                 <th style={{width:"150px"}}>Student  </th>
                 <th style={{width:"150px"}}>Course Playlist  </th>
                 <th style={{width:"150px"}}>Chapter </th>
                 <th style={{width:"150px"}}> Date</th>
                 <th style={{width:"150px"}}> Status</th>
                 <th style={{width:"150px"}}>In Time</th>
                 <th style={{width:"150px"}}>Out Time</th> 
                 <th style={{width:"150px"}}>Hours</th>  
             
               </tr>
             </thead>

             <tbody>
                {stdatd?.map((stdatdlist, index)=>{
                //date get
                const clsdates = stdatdlist?.in_time;
                const clsdate = new Date(clsdates).toISOString().split('T')[0];
                
                // class in timer
                const imtimes = stdatdlist?.in_time;
                const imtimesobj = new Date(imtimes);

                const sthours = imtimesobj.getHours();
                const stminutes = imtimesobj.getMinutes();
                const stseconds = imtimesobj.getSeconds();

                const intime = `${sthours}:${stminutes}:${stseconds}`;

              
                  // class out timer
                  const ottimes = stdatdlist?.out_time;
                  const outimesobj = new Date(ottimes);
  
                  const outhours = outimesobj.getHours();
                  const outminutes = outimesobj.getMinutes();
                  const outseconds = outimesobj.getSeconds();
  
                  const outtime = `${outhours}:${outminutes}:${outseconds}`;
  
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
                  

                    return(
                    
                    <>
              <tr>
             <td> {index+1}</td>
             <td> {stdatdlist?.student_name}</td>
             <td> {stdatdlist?.playlist_name}</td>
             <td> {stdatdlist?.chapter_name} </td>
             <td> {clsdate}</td>
             <td> {stdatdlist?.status? 
              <span className="rbt-badge-5 " style={{backgroundColor:'#F6F6F6', color:'#3EB75E', padding:'5px 7px',fontSize:'14px'}}>Present</span>
             :
             <span className="rbt-badge-5 " style={{backgroundColor:'#ff000310', color:'#ff0003', padding:'5px 7px',fontSize:'14px'}}> Absent</span>
              }</td>
             <td> {intime}</td>
             <td> {outtime}</td>
             <td>{timeDuration}</td>
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
