import React from 'react'
import Card from '../Components/Deshboard/Card'
import Topnavbar from '../Components/Topnavbar';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Classnotification from '../Components/Classnotification';

export default function Home() {
  return (
    <>
    
    <Navbar/>
    <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
    
    <Topnavbar/>
     {/* <Card/> */}
     <Classnotification/>
     <Footer/>
   </div>
   </div>
  
 
    </>
  )
}
