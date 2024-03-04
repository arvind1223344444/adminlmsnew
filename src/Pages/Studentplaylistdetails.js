import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Topnavbar from '../Components/Topnavbar'
import axios from 'axios';
import { useState, useEffect} from 'react'

export default function Studentplaylistdetails() {
   
    const { id } = useParams()
     
    const [studetnplaylsit,setStudetnplaylsit]=useState([]);

//alert(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_playlist/${id}`)
    const studetnplaylsitfun=async()=>{
      
      try{
      const  response= await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_playlist/${id}`);
     setStudetnplaylsit(response.data.response);
   // console.log(studetnplaylsit)
    } catch(error){
        console.error(error);
    }
}

    useEffect(()=>{
        studetnplaylsitfun();
    },[])

    const [studentchapter,setstudentchapter]=useState([]);
    const playlistget = async (playlistId) => {
        // alert(playlistId);
        try {
          const response = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_chapter/${playlistId}`);
          setstudentchapter(response.data.response);
          
        } catch (error) {
          console.error(error);
        }
      };

     

   
        const [selectedPlaylist, setSelectedPlaylist] = useState('');
        const [selectedChapter, setSelectedChapter] = useState('');
        const [selectedMode, setSelectedMode] = useState('');
        const [studentdetails,setStudentdetails]=useState([]);

        const handleformSubmit = async (event) => {
            event.preventDefault();
            
          
            // if (!selectedPlaylist || !selectedChapter || !selectedMode) {
            //   alert("Please select all fields");
            // } else {

            try {
              let response;
            
              if (selectedChapter) {
                response = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_all_report/${id}/${selectedChapter}/${selectedMode}`);
              } else {
                response= await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_all_report/${id}`);
              }
            
              setStudentdetails(response.data.response);
             // console.log(studentdetails);
            } catch (error) {
              console.error(error);
            }
           // }
          };


          const [studnetassinView,setstudnetassinView]=useState([]);

          const assignmentGet=async(assid)=>{
           
                try {
                  const response = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/view_all_assignment_allquestion/${assid}`);
                  //console.log(response.data.response);
                  setstudnetassinView(response.data.response);
                 // console.log(studnetassinView);
                  // Further logic with the fetched data, if needed
                } catch (error) {
                  console.error("Error fetching data:", error);
                  // Handle errors appropriately
                }
          }
        

  return (

    <> 
    
<div className="modal fade" id="studentview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
      <h5 style={{fontWeight:"800"}}>Assignment : {studnetassinView.name}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

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
  {studnetassinView?.get_question?.map((question, index) =>{
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
  </div>
</div>




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
                
              }}
            >
              <option value="" disabled>Select Chapter</option>
              {studentchapter?.map((chapterstudent, index) => (
                <option key={index} value={chapterstudent._id}>
                  {chapterstudent.chapter_name}
                </option>
              ))}
            </select>
          </div>

          <div className='col-md-3 my-1'>
            <select
              className="form-control"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <option value="" disabled>Select Mode</option>
              <option value="home_work">Home Work</option>
              <option value="class_work">Class Work</option>
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
                 <th style={{width:"150px"}}>Assignment </th>
                 <th style={{width:"150px"}}>Mode</th>
                 <th style={{width:"150px"}}> Question</th>
                 <th style={{width:"150px"}}>Answer</th>
                 <th style={{width:"150px"}}>Marks</th> 
                 <th style={{width:"150px"}}>Action</th>  
             
               </tr>
             </thead>
             {studentdetails?.get_assignment_assign?.length === 0 ? (
                            
                     <h5 className='text-center font-weight-bold mt-4'>No data found</h5>
                  ) : (
             <tbody>
            
            
            {studentdetails.length > 0 ? 
              <>
              {studentdetails?.map((getstudnetdetails,index)=>{

              return(
                <React.Fragment key={index}>

              {getstudnetdetails?.get_assignment_assign?.map((assignment,index)=>{
              //  console.log('sadddddddddddd'+assignment)
              

              return(
                <React.Fragment key={index}>
              {assignment.assignment_id?.map((assign,index)=>{
              const totalQuestions = assign.get_question.length;

              // Calculate total marks for all questions
              const totalMarks = assign.get_question.reduce(
              (acc, question) => acc + question.get_answer.reduce(
              (answerAcc, answer) => answerAcc + (answer.marks || 0), 0
              ), 0
              );

              const totalAnswerLength = getstudnetdetails?.get_assignment_assign?.reduce((acc, assignment) => {
              return acc + assignment.assignment_id.reduce((innerAcc, assign) => {
              return innerAcc + assign.get_question.reduce((questionAcc, question) => {
              return questionAcc + question.get_answer.length;
              }, 0);
              }, 0);
              }, 0);

              return(
                <React.Fragment key={index}>
              <tr>
              <td> {index+1}</td>
              <td>  {assign.name} </td>
              <td>  {assign.type} </td>
              <td>  {totalQuestions} </td>
              <td> {totalAnswerLength}</td>
              <td> {totalMarks}</td>
              {/* <td> <button type='button' className='btn btn-primary' >View</button> </td>
              */}
              <td> <button type='button' className='btn btn-primary' data-toggle="modal" data-target="#studentview" onClick={() => assignmentGet(assign._id)}>View</button> </td>
             
              
              </tr>
              </React.Fragment>
              )
              })}
              </React.Fragment>
              )
              })}

            </React.Fragment>
              )

              })}
              </>
            : 

              <>
               {studentdetails?.get_assignment_assign?.map((assignment,index)=>{
                   
                     
                        return(
                            <>
                            {assignment.assignment_id?.map((assign,index)=>{
                                const totalQuestions = assign.get_question.length;

                             
                const totalMarks = assign.get_question.reduce(
                    (acc, question) => acc + question.get_answer.reduce(
                        (answerAcc, answer) => answerAcc + (answer.marks || 0), 0
                    ), 0
                );

                const totalAnswerLength = studentdetails?.get_assignment_assign?.reduce((acc, assignment) => {
                    return acc + assignment.assignment_id.reduce((innerAcc, assign) => {
                        return innerAcc + assign.get_question.reduce((questionAcc, question) => {
                            return questionAcc + question.get_answer.length;
                        }, 0);
                    }, 0);
                }, 0);
                
                                  return(
                                 
                                <tr  key={index}>
                                <td> {index+1}</td>
                                <td>  {assign.name} </td>
                                <td>  {assign.type} </td>
                                <td>  {totalQuestions} </td>
                                <td> {totalAnswerLength}</td>
                                <td> {totalMarks}</td>
                                {/* <td> <button type='button' className='btn btn-primary' onClick={() => assignmentGet(assign._id)}>View</button> </td> */}
                                <td> <button type='button' className='btn btn-primary' data-toggle="modal" data-target="#studentview" onClick={() => assignmentGet(assign._id)}>View</button> </td>
             
                                </tr>
                             
                        )
                               })}
                            </>
                        )
                    })}

    
</>
}
              
             
            
                
             </tbody>
           )}
             
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
