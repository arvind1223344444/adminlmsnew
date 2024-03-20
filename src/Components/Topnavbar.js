import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const Topnavbar = () => {

  const navigate=useNavigate();

  const Username=localStorage.getItem("name")

  const userLogout=()=>{
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    navigate('/');  
  }


  return (
    <>

    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop">
        <i className="fa fa-bars"></i>
      </button>
    
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-search fa-fw"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
       
      
        <div className="topbar-divider d-none d-sm-block"></div>
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <h6 className="mr-2 d-none d-lg-inline text-gray-800  font-weight-bold">{Username}</h6>
            {/* <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="Profile" /> */}
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <NavLink className="dropdown-item" to='/Profile'>
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </NavLink>
            
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" onClick={userLogout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>

  

   
    </>
  );
};

export default Topnavbar;
