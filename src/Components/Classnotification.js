import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Classnotification() {


  const user_id=localStorage.getItem("user_id");
  
  const [techcrse, settechcrse] = useState({});

  const techasigncrs = async () => {
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/teacher_class_notification/${user_id}`);
      settechcrse(response.data.response);
    //   console.log(techcrse)
    } catch (error) {
      console.error('Error fetching teacher profile details', error);
    }
  }

  useEffect(() => {
    techasigncrs();
  }, []);


        //Current date-------------
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
        const day = String(currentDate.getDate()).padStart(2, '0');
        const currenttodaydate = `${year}-${month}-${day}`;
        //Current date end------------

        ////Get Next date date start code------------
        const nextDay = String(currentDate.getDate() + 1).padStart(2, '0'); 
        const nextDate = `${year}-${month}-${nextDay}`;
        ////Get Next date date end code------------ 


        // Current time --------------
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const currenttime = `${hours}-${minutes}-${seconds}`;
        const currentbhosda = `${hours}:${minutes}:${seconds}`;
        // alert(currentdate)


  const [chapter_id,setchapter_id]=useState('');
  const agorachapter=(id)=>{
  setchapter_id(id);
  appdatafetch(id);
  }

  const [agoForm, setAgoForm] = useState({
    agoAppId: '',
    agoClassName: '',
    agoToken: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgoForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const agoraFormSubmit =async (e) => {
    e.preventDefault();
    try{
    const data={
      app_id:agoForm.agoAppId,
      agora_class_name:agoForm.agoClassName,
      secret_key:agoForm.agoToken,
      teacher_id:user_id,
      class_id:chapter_id
    }

    const agoformsubmt=await axios.postForm(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/add_agora`,data);
    alert(agoformsubmt.data.response);
    appdatafetch(chapter_id);
    setagorbtndld(false)
  }catch(error){
    console.log(error);
  }
  };


  const [agoraappdetails,setagoraappdetails]=useState({});

  const appdatafetch=async(clsid)=>{
    try{
      const appdatafetchdt=await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_agora_details/${clsid}`);
      setagoraappdetails(appdatafetchdt?.data?.response);
     // console.log(agoraappdetails);
    if(appdatafetchdt?.data?.response){
      setagorbtndld(false);
    }
    else{
      setagorbtndld(true);
    }
    }catch(error){
      console.log(error);
    }
  }

   const [agorbtndld,setagorbtndld]=useState(true);


  return (
    <>
    {/* agora create id and password */}
    <div className="modal fade" id="agoramodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bolder"> Live Credentials </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

          {agorbtndld ? 
            <div className='row px-3 py-2'>
              <form className='w-100' onSubmit={agoraFormSubmit}>
                <div className="form-group">
                  <input
                    type="number"
                    name="agoAppId"
                    className="form-control w-100"
                    placeholder="Enter App Id"
                    value={agoForm.agoAppId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="agoClassName"
                    className="form-control"
                    placeholder="Enter Class Name"
                    value={agoForm.agoClassName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="agoToken"
                    className="form-control"
                    placeholder="Enter Token"
                    value={agoForm.agoToken}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
            :
            <div className='row px-3 py-2'>
             <div className='col-md-12'>
             <table className='table'>
          
  <tbody>

    <tr>
      <td scope="row">App Id</td>
      <td>{agoraappdetails?.app_id}</td>
    </tr>

    <tr>
      <td scope="row">Class Name</td>
      <td>{agoraappdetails?.secret_key}</td>
    </tr>

    <tr>
      <td scope="row">Token</td>
      <td>{agoraappdetails?.agora_class_name}</td>
    </tr>
    </tbody>

              </table>
             </div>
            </div>

          }

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={()=>{setagorbtndld(true)}}>Edit</button>
            <button type="button" className="btn btn-primary" onClick={()=>{setagorbtndld(false)}} >Details</button>
          </div>
        </div>
      </div>
    </div>
{/* Agora modal close */}


<div className="container-fluid">
<div className="row  shadow mb-4 ">

<div className="col-xl-12 col-md-12 mb-2  py-2">
  <h5>Today Classes</h5>
<div className="row">

{/* current Class section start-------------------------------------- */}
<div className="col-xl-12 col-md-12 mb-4">
<div className="card border-left-primary shadow h-100 py-2">
<div className="card-body">
    <div className="row no-gutters align-items-center">
        <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary  text-uppercase mb-1">
                Current Class
            </div>
           
            <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                <th style={{width:"150px"}}>Playlist </th>
                  <th style={{width:"150px"}}>Chapter </th>
                  <th style={{width:"150px"}}>Date</th>
                  <th style={{width:"150px"}}>Start Time</th>
                  <th style={{width:"150px"}}>End Time</th>
                  <th style={{width:"150px"}}> Action </th>
                  <th style={{width:"150px"}}> Live Credentials  </th>
                </tr>
                </thead>
                <tbody>
                {techcrse?.assign_course?.map((course) => {
                 
                  
                  return(
                    <>
                  {course?.chapter_names?.map((chapter)=>{
                  // course start date
                  const crstdate = (chapter?.lesstionStartDate).split('T')[0];
                 
                  //  courses date conditions
                   if(crstdate==currenttodaydate){
                   
                   // course start timer
                  const startdateTimeString =chapter?.lesstionStartDate;
                  const starttimePart = startdateTimeString.split('T')[1].split('.')[0];

                  // course end timer
                  const enddateTimeString =chapter?.lessionEndDate;
                  const endtimePart = enddateTimeString.split('T')[1].split('.')[0];
                  
                  if ( currentbhosda < endtimePart && currentbhosda > starttimePart) {
                    return(
                      <>
                         <tr>
                            <td>{course?.playlist}</td> 
                            <td>{chapter?.chapter_name}</td> 
                             <td>{crstdate}</td>
                            <td>{starttimePart}</td>  
                            <td>{endtimePart}</td> 
                            <td>
                            <Link to={`../Liveclass/${chapter?._id}`} className='btn btn-info'>Live Class</Link>
                            </td>
                            <td>
                              <button type='button' className='btn btn-warning' data-toggle="modal" data-target="#agoramodal"  onClick={() => agorachapter(chapter._id)}>Credentials</button>
                            </td>
                        </tr>
                     </>
                      
                    )
                    }
                    else{
                      return  null;
                    }
                  }else{
                    return null;
                  }
                  })}
                    </>
                  )
                })}
               
                  </tbody>
                </table>
                </div>
           

         </div>
    </div>
</div>
</div>
</div>
{/* current Class section end-------------------------------------- */}


{/* Upcomming Class section start-------------------------------------- */}
<div className="col-xl-6 col-md-6 mb-4">
<div className="card border-left-primary shadow h-100 py-2">
<div className="card-body">
    <div className="row no-gutters align-items-center">
        <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Over Class
            </div>
           
            <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                <th style={{width:"150px"}}>Course Name</th>
                  <th style={{width:"150px"}}>Chapter Name</th>
                  <th style={{width:"150px"}}>Date</th>
                  <th style={{width:"150px"}}>Time</th>
                 
                </tr>
                </thead>
              
                <tbody>
                {techcrse?.assign_course?.map((course) => {
              
                  
                  return(
                    <>
                  {course?.chapter_names?.map((chapter)=>{
                  // course start date
                  const crstdate = (chapter?.lesstionStartDate).split('T')[0];
                 
                  //  courses date conditions
                   if(crstdate==currenttodaydate){
                   
                   // course start timer
                  const startdateTimeString =chapter?.lesstionStartDate;
                  const starttimePart = startdateTimeString.split('T')[1].split('.')[0];

                  // course end timer
                  const enddateTimeString =chapter?.lessionEndDate;
                  const endtimePart = enddateTimeString.split('T')[1].split('.')[0];
                  
                  if ( currentbhosda > endtimePart && currentbhosda > starttimePart) {
                    return(
                      <>
                    <tr>
                            <td>{course?.playlist}</td> 
                            <td>{chapter?.chapter_name}</td> 
                             <td>{crstdate}</td>
                            <td>{starttimePart}</td>  
                    </tr>
                     </>
                      
                    )
                    }
                    else{
                      return  null;
                    }
                  }else{
                    return null;
                  }
                  })}
                    </>
                  )
                })}
               
                  </tbody>

                </table>
                </div>
           

         </div>
    </div>
</div>
</div>
</div>
{/* Upcomming Class section end-------------------------------------- */}


{/* Upcomming Class section start-------------------------------------- */}
<div className="col-xl-6 col-md-6 mb-4">
<div className="card border-left-primary shadow h-100 py-2">
<div className="card-body">
    <div className="row no-gutters align-items-center">
        <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Upcomming Class
            </div>
           
            <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                <th style={{width:"150px"}}>Course Name</th>
                  <th style={{width:"150px"}}>Chapter Name</th>
                  <th style={{width:"150px"}}>Date</th>
                  <th style={{width:"150px"}}>Time</th>
                 
                </tr>
                </thead>
              
                <tbody>
                {techcrse?.assign_course?.map((course) => {
               
                  return(
                    <>
                  {course?.chapter_names?.map((chapter)=>{
                  // course start date
                  const crstdate = (chapter?.lesstionStartDate).split('T')[0];
                 
                  //  courses date conditions
                   if(crstdate==currenttodaydate){
                   
                   // course start timer
                  const startdateTimeString =chapter?.lesstionStartDate;
                  const starttimePart = startdateTimeString.split('T')[1].split('.')[0];

                  // course end timer
                  const enddateTimeString =chapter?.lessionEndDate;
                  const endtimePart = enddateTimeString.split('T')[1].split('.')[0];
                  
                  if ( currentbhosda < endtimePart && currentbhosda < starttimePart) {
                    return(
                      <>
                    <tr>
                            <td>{course?.playlist}</td> 
                            <td>{chapter?.chapter_name}</td> 
                             <td>{crstdate}</td>
                            <td>{starttimePart}</td>  
                    </tr>
                     </>
                      
                    )
                    }
                    else{
                      return  null;
                    }
                  }else{
                    return null;
                  }
                  })}
                    </>
                  )
                })}
               
                  </tbody>

                </table>
                </div>
           

         </div>
    </div>
</div>
</div>
</div>
{/* Upcomming Class section end-------------------------------------- */}

</div>
</div>

</div>
</div>
  

    <div className="container-fluid">
        <div className="card shadow mb-4">
        <div className="card-header py-3">
         
         <h6>All Classes</h6>
         
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th> S.No</th>
                  <th>Playlist </th>
                  <th>Chapter Name</th>
                  <th>Mode</th>
                  <th>Date</th>
                  <th>Time</th>
              
                </tr>
              </thead>
           
              <tbody>
    {techcrse?.assign_course?.map((course) => {
        let Sno = 1; // Reset Sno for each course
        return (
            <>
                {course?.chapter_names?.map((chapter) => {
                    // Increment Sno for each chapter
                    // Courses time time --------------
                    const crsstartDate = chapter?.lesstionStartDate;
                    const crsstartDateTime = new Date(crsstartDate);
                    const crshours = String(crsstartDateTime.getUTCHours()).padStart(2, '0');
                    const crsminutes = String(crsstartDateTime.getUTCMinutes()).padStart(2, '0');
                    const crsseconds = String(crsstartDateTime.getUTCSeconds()).padStart(2, '0');
                    const crsformattedTime = `${crshours}-${crsminutes}-${crsseconds}`;

                 

                    //live start date------------
                    const crsstart = chapter?.lesstionStartDate;
                    const crsstartymd = crsstart.split('T')[0];

                    //Button blick option
                    // const isBlinking = crsstartymd === currenttodaydate;

                  
                    

                    return (
                        <tr key={chapter?._id}>
                            <td>{Sno++}</td>
                            <td>{course?.playlist}</td>
                            <td>{chapter?.chapter_name}</td>
                            <td>{chapter?.mode}</td>
                            <td>{crsstartymd}</td>
                            <td>{crsformattedTime}</td>
                           
                        </tr>
                    )
                })}
            </>
        )
    })}
</tbody>



            
              
            </table>
          </div>
        </div>
      </div>
    </div>
     </>
  )
}
