import React from 'react';
import { Link, NavLink } from 'react-router-dom';
export default function Navbar() {

 

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
       <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-text mx-3"> Teacher Admin</div>
       </Link>

       <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <NavLink className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Interface</div>


      {/* <li className="nav-item">
        <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog"></i>
          <span>Student</span>
        </Link>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            
            <Link className="collapse-item" to="/">Student View</Link>
            <Link className="collapse-item" to="/">Student Edit</Link>
           
          </div>
        </div>
      </li> */}

      
      <li className="nav-item">
        <Link className="nav-link" to="/Studentenroll">
        <i className="fas fa-fw fa-cog"></i>
          <span> Teacher Course</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/Studentcourse">
        <i className="fas fa-fw fa-cog"></i>
          <span>Student View</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/Teachercours">
        <i className="fas fa-fw fa-cog"></i>
          <span>Student Attendance</span>
        </Link>
      </li>


{/*       
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Utilities</span>
        </a>
        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Utilities:</h6>
            <a className="collapse-item" href="utilities-color.html">Colors</a>
            <a className="collapse-item" href="utilities-border.html">Borders</a>
            <a className="collapse-item" href="utilities-animation.html">Animations</a>
            <a className="collapse-item" href="utilities-other.html">Other</a>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Addons</div>

      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw fa-folder"></i>
          <span>Pages</span>
        </a>
        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Login Screens:</h6>
            <a className="collapse-item" href="login.html">Login</a>
            <a className="collapse-item" href="register.html">Register</a>
            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
            <div className="collapse-divider"></div>
            <h6 className="collapse-header">Other Pages:</h6>
            <a className="collapse-item" href="404.html">404 Page</a>
            <a className="collapse-item" href="blank.html">Blank Page</a>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Charts</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="tables.html">
          <i className="fas fa-fw fa-table"></i>
          <span>Tables</span>
        </a>
      </li>

      <hr className="sidebar-divider d-none d-md-block" /> */}

    </ul>
  );
}
