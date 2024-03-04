import React, { useEffect, useRef, useState } from 'react'
import Topnavbar from '../Components/Topnavbar'
import Footer from '../Components/Footer'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Conference from '../Components/Conference'



export default function Liveclass() {

   const { id } = useParams()
   
    // const user_id=localStorage.getItem('user_id');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [enrollstudent,setEnrollstudent]=useState({});

//alert(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_chapter_details/${id}`)
    const enrollStd=async()=>{
        try{
     const enrollStd = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_chapter_details/${id}`);
     setEnrollstudent(enrollStd.data.response);
    // console.log(enrollstudent);
    }catch(error){
        console.error("Error fetching enrolled students:", error);
    }
}

    useEffect(()=>{
        enrollStd();
    },[])

    
    const [absentstudentd,setabsentstudentd]=useState([]);

    const absentstudent=async()=>{
      try{
      const absentstudentresponse= await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/view_absence/${id}`);
      setabsentstudentd(absentstudentresponse.data.response);
      //console.log(absentstudentresponse);
    }catch(error){
      console.error('error');
    }
  }

  useEffect(()=>{
    absentstudent();
  },[])

  const assignmentButClick = useRef();
   const [stuedntliveass,setstuedntliveass]=useState([]);
   
    const stdIdget = async (student_id) => {
     
      try {
        setSelectedUserId(student_id);
        const response = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/view_all_assignment/${student_id}/${id}`);
        //console.log(response.data.response);
        setstuedntliveass(response.data.response);

        
        assignmentButClick.current.click();
        
       // console.log(stuedntliveass);
        // Further logic with the fetched data, if needed
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately
      }
    };

      const [intervalId, setIntervalId] = useState(null);
    const [assiddd, setassiddd] = useState("");
    const [studentshowassign,setstudentshowassign]=useState([]);
    const studentshowassignment=async (assid)=>{
      
      try{
        const response=await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/view_all_assignment_allquestion/${assid}`)
        setstudentshowassign(response.data.response);
      // console.log(studentshowassign);
       setassiddd(assid)
      }catch(error){
      //  console.error("Error fetching assignment details:", error);
      }
    }


    // useEffect(() => {
    //    studentshowassignment(assiddd);
    //    const id = setInterval(() => {
    //     studentshowassignment(assiddd);
    //   }, 1000); 
  
      
    //   return () => clearInterval(id);
    // }, [assiddd]);


    // YE WALA THAA NICHE
   
    // useEffect(() => {
    //   // Initial fetch
    //   studentshowassignment(assiddd);
  
    //   // Set up the interval and store its ID in the state
    //   const id = setInterval(() => {
    //     studentshowassignment(assiddd);
    //   }, 5000); // 5000 milliseconds = 5 seconds
  
    //   setIntervalId(id);
  
    //   return () => clearInterval(id);
    // }, [assiddd]);
  
    const handleButtonClickIntervalclose = () => {
      // Clear the interval when the button is clicked
      clearInterval(intervalId);
    };

    

    const [studentassignmenttt, setStudentassignmenttt] = useState([]);

    const studentassignments = async () => {
      try {
        const studentassignmentsget = await axios.get(`${process.env.REACT_APP_SECRET_URL}/assignment/get_assignment/${id}/class_work`);
        setStudentassignmenttt(studentassignmentsget.data.response);
      // console.log(studentassignmenttt); // Log the updated state here
      } catch (error) {
        console.error("Error fetching assignment details: ", error);
      }
    }
    
    useEffect(() => {
      studentassignments();
    }, []);


    const [studentclsoral,setstudentclsoral]=useState([]);

    const studentclsoralqry=async()=>{
      try{
        const studentoralcls= await axios.get(`${process.env.REACT_APP_SECRET_URL}/assignment/get_assignment/${id}/class_work_oral`);
        setstudentclsoral(studentoralcls.data.response);
        console.log(studentclsoral);
      }catch(error){
        console.log("Error fetching oral details".error);
      }
    }
   
    useEffect(()=>{
      studentclsoralqry();
    },[]);





    // class work data
    const [formDataAssign, setFormDataAssign] = useState({});
    const [formcourse, setcourseAssign] = useState({});

    const handleCheckboxStudentAssignment = (event) => {
      const { name, checked } = event.target;
      
      setFormDataAssign({
        ...formDataAssign,
        [name]: checked,
      });
    };


    const handleCheckboxcoure = (event) => {
      const { name, checked } = event.target;
      
      setcourseAssign({
        ...formcourse,
        [name]: checked,
      });
    };
  
   
    

    const teacheraggisgnSubmit = async (e) => {
      e.preventDefault();
     
      const selectedIDs = Object.keys(formDataAssign).filter((key) => formDataAssign[key]);
      const selectform = Object.keys(formcourse).filter((key) => formcourse[key]);

      // console.log(selectedIDs);
     //  console.log(selectform);
 
       const assigndatasend = { 'student_id':selectedIDs, 'assignment_id': selectform , 'chapter_id':id }
       console.log(assigndatasend);
      if (selectedIDs.length === 0 || selectform.length === 0) {
        alert('Please select at least one student or one assignment.');
      }else{
      
      try {
        const response = await axios.postForm( `${process.env.REACT_APP_SECRET_URL}/assignment/assign_assignment_to_student`,assigndatasend);
       // console.log('Assign Successfully:', response.data);
        alert(`${response.data.response}` );
        
        // Handle the response data as needed
      } catch (error) {
        console.error('Error submitting form:', error);
        console.log('Response Data:', error.response.data);
        // Handle errors
      }
    };
  };



    // assignstudent form 

    const [homeworkassign,sethomeworkassign]=useState([]);

    const handleCheckboxassign = (event) => {
      const { name, checked } = event.target;
      
      sethomeworkassign({
        ...homeworkassign,
        [name]: checked,
      });
    };
  
    const assignstudentsubmit=async(e)=>{
      e.preventDefault();
     
      const selectedIDs = Object.keys(formDataAssign).filter((key) => formDataAssign[key]);
      const selecthomeworkassign = Object.keys(homeworkassign).filter((key) => homeworkassign[key]);

      //  console.log(selectform);
 
       const assigndatasend = { 'student_id':selectedIDs, 'assignment_id': selecthomeworkassign , 'chapter_id':id }
       console.log(assigndatasend);
      if (selectedIDs.length === 0 || selecthomeworkassign.length === 0) {
        alert('Please select at least one student or Home Work.');
      }else{
      try {
        const response = await axios.postForm( `${process.env.REACT_APP_SECRET_URL}/assignment/assign_assignment_to_student`,assigndatasend);
       //console.log('Assign Successfully:', response.data);
        alert(`${response.data.response}`);
        
        // Handle the response data as needed
      } catch (error) {
        console.error('Error submitting form:', error);
        console.log('Response Data:', error.response.data);
        // Handle errors
      }
    };
    }

  const refreshStudentActive=()=>{
   // alert("fdf");
   enrollStd();
  }
 


  const [studenthomeworkk, setstudenthomeworkk] = useState([]);

  const setstudenthomework = async () => {
    
    try {
      const studentassignmentsget = await axios.get(`${process.env.REACT_APP_SECRET_URL}/assignment/get_assignment/${id}/home_work`);
      setstudenthomeworkk(studentassignmentsget.data.response);
   // console.log(studenthomeworkk); // Log the updated state here
    } catch (error) {
      console.error("Error fetching assignment details: ", error);
    }
  }
  
  useEffect(() => {
    setstudenthomework();
  }, []);

// new api integration
  const [hworalst,sethworalst]=useState([]);

  const hworalstfun=async()=>{
  
    try{
      const hworalstfunqry= await axios.get(`${process.env.REACT_APP_SECRET_URL}/assignment/get_assignment/${id}/home_work_oral`);
      sethworalst(hworalstfunqry.data.response);
      console.log(hworalst)
    }catch(error){
      console.error("Error fetching assignment details: ", error);
    }
  }

  useEffect(()=>{
    hworalstfun();
  },[])
 
  
  const [assignmenthistory,setassignmenthistory]=useState([]);

  const assignHistory=async()=>{
    try{
     // alert(`${process.env.REACT_APP_SECRET_URL}/assignment/get_assignment_history/${id}`);
    const assignHistoryqry=await axios.get(`${process.env.REACT_APP_SECRET_URL}/assignment/get_assignment_history/${id}`);
    setassignmenthistory(assignHistoryqry.data.response);
   // console.log(assignmenthistory._id);
    } catch(error){
      console.error("Error Fetching Assignment History", error);
    }
  }


// chapter refresh  function
const homeworkFetchhandle=()=>{
  setstudenthomework();
  studentassignments();
}

  return (
    <>

{/* student live view modal start*/}
<div className="modal fade" id="studentClassmodal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="studentClassmodal" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
    <div className="modal-content" style={{outline: "1px solid white"}}>
      <div className="modal-header bg-dark py-2">
        <h5 className="modal-title text-light" id="studentClassmodal">  Class Work Sheet </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{background:"#fff"}} onClick={handleButtonClickIntervalclose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body p-0">
        <div className='container-fluid'>
          <div className='row'>
          
       <div className='col-md-12 mt-2'>
      {stuedntliveass.map((studentData, index) => (
      <div key={index}>
    
    {studentData.assignment_id.map((assignment, assignmentIndex) =>{
      return (
    
    <button type="button" className="btn btn-primary btn-sm mx-1" ref={assignmentIndex === 0 ? assignmentButClick : null} onClick={() => studentshowassignment(assignment._id)} key={assignmentIndex}> {assignment.name} </button>
     
    )})}
  </div>
))}
   </div>

<div className='col-md-12 mt-2'>
   <table className="table table-sm  table-responsive-sm border border-dark ">
  <thead className='bg-secondary text-light'>
    <tr>
      <th scope="col"> Date</th>
      <th scope="col">Module </th>
      <th scope="col">Total Question </th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{studentshowassign?.added_on?.slice(0,10)}</td>
      <td>{studentshowassign?.name}</td>
      <td>{studentshowassign?.get_question?.length}</td>
     
     </tr>

  </tbody>
</table>
</div>
  </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='userclspaper'>
              
            <table className="table table-sm  table-responsive-sm border border-dark ">
  <thead className='bg-secondary text-light'>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Question</th>
      <th scope="col">Response</th>
      <th scope="col">Handle</th>
      <th scope="col"> Marks</th>
    </tr>
  </thead>
  <tbody>
  {studentshowassign?.get_question?.map((question, index) =>{
   var rightCkeck = false;
   var studetnquestion="";

  
    return(
     
     <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{question?.question}</td>
      <td> 
      {question?.get_answer.map((answer, answerIndex) => {
         rightCkeck=question?.answer===answer?.answer;

         studetnquestion =answer.marks;
        
      
        return(
         <td key={answerIndex}>{answer?.answer}</td>
       )})}
      </td>

     <td>
          {rightCkeck? 
           <button type='button' className="btn btn-success  btn-circle btn-sm"> 
           <i className="fas fa-check"></i>
         </button>
          :
          <button type='button' className="btn btn-danger  btn-circle btn-sm"> 
          <i class="fas fa-times"></i>
          </button>
          }
       
       </td>
      <td>{studetnquestion}</td>
    </tr>
      
     )})}
   
    
  </tbody>
</table>

            </div>

          </div>
         
        </div>
        </div>
      </div>
      <div className="modal-footer my-0 py-0 pb-1">
        <p className='py-2'></p>
        {/* <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Close</button> */}
       </div>
    </div>
  </div>
</div>
{/* student live view modal end*/}

  
    {/* <Navbar/> */}
    <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
    
    <Topnavbar/>
    <section className='learning_video_section mb-4'>
    <div className='container-fluid'> 

    {/* Video section design */}
    <div className='row'>
    <div className='col-md-7 shadow'>
    <div className='jigsawlivesteaming h-100 shadow '>
    <Conference/>
    </div>
    </div>

        <div className='col-md-5 '>
        <div className='studentsteamingtask shadow '>
        <h1 className="h5 mb-0 text-gray-800 font-weight-bold">Students </h1>
          
        {/* <div className='studentestemingoral my-2 py-2 d-flex'>
        <div className="oralbtn" style={{width: "50%"}}>
        <p className="m-0">Type Of Oral</p>
        </div>

     

        <div className="oralbtn"  style={{width: "50%"}}>
        <button type="button" className="btn btn-sm btn-warning mx-2 bg-danger text-white">Oral Sheet</button>
        <button type="button" className="btn btn-sm btn-info text-white search_btn">LIve Oral</button>
        </div>
        </div> */}

        
        <div className='studentestemingorallist my-3'>
       {enrollstudent?.playlist?.map((studentNo, index) => {
        //console.log(enrollstudent);
        return (
     <div key={index}>
      
   <div className="d-flex justify-content-between px-0">
    <p className="m-0" style={{ fontWeight: "400" }}>Students List  
    <button type="button" class="btn btn-sm mx-1 border border-none" onClick={refreshStudentActive}> <i class="fas fa-sync"></i></button>
</p>
  
    <p className="m-0">Active <span className="fw-bold">  {studentNo.student.length} </span> </p>
  </div>
 
  <ul className='studentlist pl-0 my-2'>
    
       {studentNo.student.map((numstd, numstdIndex) => {
       // console.log(numstd);
        return(
          <li className='d-flex justify-content-between px-0' key={numstdIndex}>
            <span className='student_name'>
              <p className='m-0'>  {numstd.name} </p>
            
              
            </span>
          
            <span className='student_live_det d-flex'>
              <p className='m-0 p-0'><button type='button' className='btn btn-sm mx-1 border border-none'data-toggle="modal" data-target="#studentClassmodal"   onClick={() => stdIdget(numstd._id)}><i className="far fa-eye"></i></button></p>
              <p className='m-0 p-0'><button type='button' className='btn btn-sm btn-info mx-1'>Active</button></p> 
            </span>
          </li>
        )})}
   
  </ul>
  </div>
    )})}
</div>


        </div>
      </div>
    </div>
  

                        <div className='col-md-12 my-4'>
                        <div className='row '>
                          <div className='col-md-12 shadow'>

                          <ul className="nav nav-pills mb-3 bg-white" id="pills-tab" role="tablist">
                          <li className="nav-item">
                          <a className="nav-link active" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={homeworkFetchhandle}> Class Work</a>
                          </li>

                          <li className="nav-item">
                          <a className="nav-link" id="pills-assign_student-tab" data-toggle="pill" href="#pills-assign_student" role="tab" aria-controls="pills-assign_student" aria-selected="false" onClick={assignHistory}> Assign History</a>
                          </li>

                          <li className="nav-item">
                          <a className="nav-link " id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"> Absent Student </a>
                          </li>
                         
                          <li className="nav-item">
                          <a className="nav-link" id="pills-homework-tab" data-toggle="pill" href="#pills-homework" role="tab" aria-controls="pills-homework" aria-selected="false"> Home Work</a>
                          </li>
                         
                          {/* <li className="nav-item">
                          <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-333" role="tab" aria-controls="pills-333" aria-selected="false">Student Quiz</a>
                          </li> */}
                         
                          </ul>
                          <div className="tab-content" id="pills-tabContent">
                          <div className="tab-pane fade show active " id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                           
                            <div className="row ">
                            <div className='col-md-12'>
                              <div className='assign_assignment_table'>


                              <form onSubmit={teacheraggisgnSubmit}>
                              <table className="table">
                              <thead>
                              <tr>
                              <th scope="col" style={{width:"150px"}}>Assignment</th>
                              <th scope="col">Students</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                              
                              <td className='align-items-center' style={{width:"250px"}}> 
                              <h6 className='font-weight-bold  mx-2 '>chapter : {enrollstudent?.chapter_name}</h6>
                           
                              {studentassignmenttt.map((asignmentda)=>{
                                return(
                                  <>
                            
                            <div key={asignmentda._id}>
                           
                            <div className="form-check form-check-inline mb-2 mx-2 bg-white p-2 rounded" >
                            <input
                            type="checkbox"
                            className="form-check-input"
                            name={asignmentda._id}
                            checked={formcourse[asignmentda._id] || false}
                            onChange={handleCheckboxcoure}
                            
                            />
                            <label className="form-check-label">{asignmentda.name}</label>
                            </div>
                            </div>
                                  </>
                                )
                              })}

                              {/* student oral check */}
                              {studentclsoral.map((oraldata)=>{
                                return(
                                  <>
                                
                            <div key={oraldata._id}>
                           <div className="form-check form-check-inline mb-2 mx-2 bg-white p-2 rounded" >
                           <input
                           type="checkbox"
                           className="form-check-input"
                           name={oraldata._id}
                           checked={formcourse[oraldata._id] || false}
                           onChange={handleCheckboxcoure}
                           
                           />
                           <label className="form-check-label">{oraldata.name}</label>
                           </div>
                           </div>

                                  </>
                                )
                              })}
                              
                              </td>
                              <td>
                            <div className='row'>
                             <div className='col-md-12'>
                              <div className='student_assignm'>

                             {enrollstudent?.playlist?.map((studentatted, studentattedindex) => (
                            <div key={studentattedindex}>
                            {studentatted.student.map((numstdattend, numstdattendIndex) => (
                            <div className="form-check form-check-inline mb-2 mx-2 bg-white p-2 rounded" key={numstdattendIndex}>
                            <input
                            type="checkbox"
                            className="form-check-input"
                            name={numstdattend._id}
                            checked={formDataAssign[numstdattend._id] || false}
                            onChange={handleCheckboxStudentAssignment}
                            />
                            <label className="form-check-label">{numstdattend.name}</label>
                            </div>
                            ))}
                            </div>
                            ))}
                            <div className='col-md-12'>
                            <input type="submit" className='btn btn-sm btn-primary mb-2 mx-2 p-2' value="Assignment Submit" />
                            </div>
                            
                              </div>
                              </div>
                              </div>

                              </td>
                              </tr>
                            
                              </tbody>
                              </table>
                              </form>

                              </div>
                            </div>
                            </div>

                          </div>

                          <div className="tab-pane fade" id="pills-assign_student" role="tabpanel" aria-labelledby="pills-assign_student-tab">
                           
                          <div className='row'>
                           <div className='col-md-12'>
                            <div className='assign_assignment_table'>

                              
                             <div className="table">
                              <div className='thead'>
                              <tr>
                              <th scope="col"style={{ width: "70px" }}>S.No.</th>
                              <th scope="col" style={{ width: "150px" }}>Student Name</th>
                              <th scope="col" style={{ width: "250px" }}>Assignment Home Work</th>
                              <th scope="col" style={{ width: "250px" }}> Assignment Class Work  </th>
                              </tr>
                              </div>
                              
                              <tbody>

                             {assignmenthistory?.map((classWork,index)=>(
                              <>
                          <tr key={index}>
                          <td style={{ width: "70px" }}>{index + 1} </td>
                          <td style={{ width: "150px" }}>
                             {classWork?.student_id?.name}
                          </td>
                         
                          <td style={{ width: "250px" }}> 
                            {classWork.assignment_id.map((assname) => {
                            if (assname.type === 'home_work') {
                            return (
                            <React.Fragment key={assname.id}>
                              
                            <div>{assname.name}</div>
                            </React.Fragment>
                            );
                            }
                           
                            return null; 
                            })}

                            <p class="m-0 mt-2 font-weight-bold"> Orals</p>
                            {classWork.assignment_id.map((assname) => {
                            if (assname.type === 'home_work_oral') {
                            return (
                            <React.Fragment key={assname.id}>
                              
                            <div>{assname.name} </div>
                            </React.Fragment>
                            );
                            }
                           
                            return null; 
                            })}

                        
                          </td>

                       
                          <td style={{ width: "250px" }}>
                         
                          {classWork.assignment_id.map((assname) => {
                            if (assname.type === 'class_work') {
                            return (
                            <React.Fragment key={assname.id}>
                              
                            <div>{assname.name}</div>
                            </React.Fragment>
                            );
                            }
                           
                            return null; 
                            })}

                            <p class="m-0 mt-2 font-weight-bold"> Orals</p>  
                            {classWork.assignment_id.map((assname) => {
                            if (assname.type === 'class_work_oral') {
                            return (
                            <React.Fragment key={assname.id}>

                            <div>{assname.name}</div>
                            </React.Fragment>
                            );
                            }

                            return null; 
                            })}


                     
                          </td>
                          </tr>
                              </>
                             ))}

                        
                              </tbody>
                              </div>
                            </div>
                           </div>
                          </div>
                          
                          </div>

                          <div className="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                          <div className='row'>
                           <div className='col-md-12'>
                            <div className='assign_assignment_table'>
                             <div className="table">
                              <div className='thead'>
                                <tr>
                                {/* <th scope="col" style={{width: "150px"}}>Assignment</th> */}
                                <th scope="col">Absent Students</th>
                                </tr>
                              </div>
                              <tbody>
                                <tr>
                                  <td style={{width: "250px"}}>
                                
                                 {absentstudentd?.length > 0 ? (
                                  absentstudentd.map((absstudent, index) => (
                                 
                                  <p  key={index}> 
                                    <span className='mb-2 mx-2 bg-white p-2 rounded'>{index+1}. {absstudent.name}</span>
                                  </p>
                                  ))
                                  ) : (
                                  <p>No absent students</p>
                                  )}

                                  </td>
                                </tr>
                              </tbody>
                              </div>
                            </div>
                           </div>
                          </div>
                          </div>
                         
                          <div className="tab-pane fade" id="pills-homework" role="tabpanel" aria-labelledby="pills-homework-tab">
                          <div className='row'>
                           <div className='col-md-12'>
                           <div className='assign_assignment_table'>
                            
                              <form onSubmit={assignstudentsubmit}>
                              <table className="table">
                              <thead>
                              <tr>
                              <th scope="col" style={{width:"150px"}}>Home Work</th>
                              <th scope="col">Students</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                              
                              <td className='align-items-center' style={{width:"250px"}}> 
                            
                              {/* {studenthomeworkk?.length > 0 ? (
                                  studenthomeworkk.map((studenthwk, index) => (
                                 
                                    <div key={index}>
                           
                                    <div className="form-check form-check-inline mb-2 mx-2 bg-white p-2 rounded" >
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={studenthwk._id}
                                    checked={homeworkassign[studenthwk._id] || false}
                                    onChange={handleCheckboxassign}
                                    
                                    />
                                    <label className="form-check-label">{studenthwk.name}</label>
                                    </div>
                                    </div>
                                  ))
                                  ) : (
                                  <p>Not Home Work</p>
                                  )} */}


                              {studenthomeworkk.map((studenthwk,index)=>{
                                      return(
                                        <>
                              <div key={index}>
                           <div className="form-check form-check-inline mb-2 mx-2 bg-white p-2 rounded" >
                           <input
                           type="checkbox"
                           className="form-check-input"
                           name={studenthwk._id}
                           checked={homeworkassign[studenthwk._id] || false}
                           onChange={handleCheckboxassign}
                           
                           />
                           <label className="form-check-label">{studenthwk.name}</label>
                           </div>
                           </div>
                                        </>
                                      )
                                    })}

                              {hworalst.map((hwkoralstudent,index)=>{
                              return(
                              <>
                              <div key={index}>
                             
                              <div className="form-check form-check-inline mb-2 mx-2 bg-white p-2 rounded" >
                                
                              <input
                              type="checkbox"
                              className="form-check-input"
                              name={hwkoralstudent._id}
                              checked={homeworkassign[hwkoralstudent._id] || false}
                              onChange={handleCheckboxassign}
                              />
                              <label className="form-check-label">{hwkoralstudent.name}</label>
                              </div>
                              </div>
                                        </>
                                      )
                                    })}
                          
                              
                              </td>
                              <td>
                            <div className='row'>
                             <div className='col-md-12'>
                              <div className='student_assignm'>

                             {enrollstudent?.playlist?.map((studentatted, studentattedindex) => (
                            <div key={studentattedindex}>
                            {studentatted.student.map((numstdattend, numstdattendIndex) => (
                            <div className="form-check form-check-inline mb-2 mx-2 bg-white p-2 rounded" key={numstdattendIndex}>
                            <input
                            type="checkbox"
                            className="form-check-input"
                            name={numstdattend._id}
                            checked={formDataAssign[numstdattend._id] || false}
                            onChange={handleCheckboxStudentAssignment}
                            />
                            <label className="form-check-label">{numstdattend.name}</label>
                            </div>
                            ))}
                            </div>
                            ))}
                            <div className='col-md-12'>
                            <input type="submit" className='btn btn-sm btn-primary mb-2 mx-2 p-2' value="Assignment Submit" />
                            </div>
                            
                              </div>
                              </div>
                              </div>

                              </td>
                              </tr>
                            
                              </tbody>
                              </table>
                              </form>






                            </div>
                            </div>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="pills-333" role="tabpanel" aria-labelledby="pills-333-tab">..3.</div>
                          
                          </div>
                          </div>
                        </div>
                        </div>

     </div>
    </section>
     <Footer/>
   </div>
   </div>
    </>
  )
}
