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

  return (
    <>

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
                 
                </tr>
                </thead>
                <tbody>
                {techcrse?.assign_course?.map((course) => {
                  console.log(course);
                  
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
                            <Link to={`../Liveclass/${course?._id}`} className='btn btn-info'>Live Class</Link>
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
                  console.log(course);
                  
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
                  console.log(course);
                  
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
<div className="row">

{/* Today Class section start-------------------------------------- */}
<div className="col-xl-6 col-md-6 mb-4">
<div className="card border-left-primary shadow h-100 py-2">
<div className="card-body">
    <div className="row no-gutters align-items-center">
        <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary  text-uppercase mb-1">
                Today Class
            </div>
           
            <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th style={{width:"150px"}}>Chapter </th>
                  <th style={{width:"150px"}}>Date</th>
                  <th style={{width:"150px"}}>Time</th>
                  <th style={{width:"150px"}}>Action</th>
                </tr>
                </thead>
                <tbody>
             
        {techcrse?.assign_course?.map((course) => {
        return (
            <>
            {course?.chapter_names?.map((chapter) => {

                
                
                // Extracting the date part of the chapter's start date
                const chapterDate = new Date(chapter?.lesstionStartDate).toISOString().split('T')[0];
                if (chapterDate === currenttodaydate) {

            // Courses  time --------------
            const crsstartDate = chapter?.lesstionStartDate;
            const crsstartDateTime = new Date(crsstartDate);
            const crshours = String(crsstartDateTime.getUTCHours()).padStart(2, '0');
            const crsminutes = String(crsstartDateTime.getUTCMinutes()).padStart(2, '0');
            const crsseconds = String(crsstartDateTime.getUTCSeconds()).padStart(2, '0');
            const crsformattedTime = `${crshours}-${crsminutes}-${crsseconds}`;

            
           //Courses  date------------
           const crsstart = chapter?.lesstionStartDate;
           const crsstartymd = crsstart.split('T')[0];
           
           //Button blick option
         //   const isBlinking = crshours === hours;
         // const isBlinking = (currenttodaydate === crsstartymd && crshours === hours);

          const coursecheck=(date,time)=>{
           alert(`Start date ${date} and time ${time}`);
           }

                    return (
                           <tr>
                            <td>{chapter.chapter_name}</td> 
                            <td>{crsstartymd}</td> 
                            <td>{crsformattedTime}</td> 
                            <td>
                            <Link
                        to={ currenttodaydate  < crsstartymd ? 
                        '#' 
                        :
                        currenttime < crsformattedTime ?
                        '#'
                        :
                         `../Liveclass/${course?._id}`
                        }
                   
                        onClick={() => { 
                            if (currenttodaydate < crsstartymd || (currenttodaydate === crsstartymd && currenttime < crsformattedTime)) {
                                coursecheck(crsstartymd,crsformattedTime);
                            }
                        }}
                      type='button'
                       className={`blinking-button btn btn-primary btn-sm 
                       ${currenttodaydate === crsstartymd && crshours < hours? 
                        'red'
                        :
                        currenttodaydate === crsstartymd && crshours === hours?
                        'green'
                        :
                        ''
                    }`}
                    >
                    Live Class
                    </Link>
                    </td>
                        </tr>
                    );
                } else {
                    return null; // If the chapter date doesn't match, return null
                }
            })}
        </>
    );
})}

                 </tbody>
                </table>
                </div>
           

         </div>
    </div>
</div>
</div>
</div>
{/* Today Class section end-------------------------------------- */}


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
    return (
        <>
            {course?.chapter_names?.map((chapter) => {
            
        
        // Extracting the date part of the chapter's start date
          const chapterDate = new Date(chapter?.lesstionStartDate).toISOString().split('T')[0];
          const chaptercount=chapterDate === nextDate;
  
          if (chaptercount) {

            // Courses  time --------------
            const crsstartDate = chapter?.lesstionStartDate;
            const crsstartDateTime = new Date(crsstartDate);
            const crshours = String(crsstartDateTime.getUTCHours()).padStart(2, '0');
            const crsminutes = String(crsstartDateTime.getUTCMinutes()).padStart(2, '0');
            const crsseconds = String(crsstartDateTime.getUTCSeconds()).padStart(2, '0');
            const crsformattedTime = `${crshours}-${crsminutes}-${crsseconds}`;

            
           //Courses  date------------
           const crsstart = chapter?.lesstionStartDate;
           const crsstartymd = crsstart.split('T')[0];
                  
                return (
                        <tr>
                           <td>{course.playlist}</td> 
                            <td>{chapter.chapter_name}</td> 
                             <td>{crsstartymd}</td>
                            <td>{crsformattedTime}</td>  
                         </tr>
                    );
                } else {
                  return null ;
                  
                }
            })}
        </>
    );
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

   

    <div className="container-fluid">
        <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className='text-left'>
          <span className="m-0 font-weight-bold "><span className='btn red mr-2'></span>Prev </span>
          <span className="m-0 font-weight-bold "><span className='btn orange mr-2'></span>Next </span>
          <span className="m-0 font-weight-bold "><span className='btn green mr-2'></span>Live </span>
          </span>

          <span className='text-right float-right'>
         <h6>All Classes</h6>
          </span>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th> S.No</th>
                  <th style={{width:"150px"}}>Course Name</th>
                  <th style={{width:"150px"}}>Chapter Name</th>
                  <th style={{width:"150px"}}>Mode</th>
                  <th style={{width:"150px"}}>Date</th>
                  <th style={{width:"150px"}}>Time</th>
                  <th style={{width:"150px"}}>Action</th>
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

                    const coursecheck = (date, time) => {
                        alert(`Start date ${date} and time ${time}`);
                    }

                    return (
                        <tr key={chapter?._id}>
                            <td>{Sno++}</td>
                            <td>{course?.playlist}</td>
                            <td>{chapter?.chapter_name}</td>
                            <td>{chapter?.mode}</td>
                            <td>{crsstartymd}</td>
                            <td>{crsformattedTime}</td>
                            <td>
                                <Link
                                    to={currenttodaydate < crsstartymd ?
                                        '#'
                                        :
                                        currenttime < crsformattedTime ?
                                            '#'
                                            :
                                            `../Liveclass/${course?._id}`
                                    }
                                    onClick={() => {
                                        if (currenttodaydate < crsstartymd || (currenttodaydate === crsstartymd && currenttime < crsformattedTime)) {
                                            coursecheck(crsstartymd, crsformattedTime);
                                        }
                                    }} orange
                                    type='button'
                                    className={`blinking-button btn btn-primary btn-sm
                                        ${currenttodaydate === crsstartymd && crshours < hours ?
                                            'red'
                                            :
                                            currenttodaydate === crsstartymd && crshours === hours ?
                                                'green'
                                                :
                                                currenttodaydate === crsstartymd && crshours > hours ?
                                                    'orange'
                                                    :
                                                    null
                                        }`}
                                >
                                    Live Class
                                </Link>
                            </td>
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
