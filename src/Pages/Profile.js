import React from 'react'
import Footer from '../Components/Footer'
import Topnavbar from '../Components/Topnavbar'
import Table from '../Components/Deshboard/Table'
import Navbar from '../Components/Navbar'
export default function () {
  return (
    <>
     <Navbar/>
     <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
    <Topnavbar/>
    <Table/>
     <Footer/>
   </div>
   </div>
    </>
  )
}
