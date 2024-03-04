import React, { useEffect } from 'react';
import {Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Student from './Pages/Student';
import Studentenroll from './Pages/Studentenroll';
import Studentcoursemodule from './Pages/Studentcoursemodule';
import Liveclass from './Pages/Liveclass';
import Studentcourse from './Pages/Studentcourse';
import Studentcoursechapter from './Pages/Studentcoursechapter';
import Studentplaylistdetails from './Pages/Studentplaylistdetails';
import Studentattendace from './Pages/Studentattendace';
import Teachercours from './Pages/Teachercours';


export default function WebRoutes() {

 
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user_id');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div id="wrapper">
   
       <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Student" element={<Student />} />
            <Route path="/Studentenroll" element={<Studentenroll/>}/>
            <Route path='/Studentcoursemodule/:id' element={<Studentcoursemodule/>}/>
            <Route path='/Liveclass/:id' element={<Liveclass/>}/>
            <Route path='/Studentcourse' element={<Studentcourse/>}/>
            <Route path='/Studentcoursechapter/:id' element={<Studentcoursechapter/>}/>
            <Route path='/Studentplaylistdetails/:id' element={<Studentplaylistdetails/>}/>
            <Route path="/Studentattendace/:id" element={<Studentattendace/>}/>
            <Route path="/Teachercours" element={<Teachercours/>}/>
          </>
        ) : (
          <Route path="/Login" element={<Login />} />
        )}
      </Routes>
      
    </div>
  );
}
