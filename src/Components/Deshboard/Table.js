import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function Table() {


  const user_id=localStorage.getItem("user_id");
  
  const [tprofile, setTprofile] = useState({});

  const fetchTProfileDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/get_teacher_details/${user_id}`);
      // console.log(response.data.response);

      // Update the tprofile state with the fetched data
      setTprofile(response.data.response);
    } catch (error) {
      console.error('Error fetching teacher profile details', error);
    }
  }

  useEffect(() => {
    fetchTProfileDetails();
  }, []);

  return (
    <>
    <div className="container-fluid">
     

      <div className="d-sm-flex align-items-center justify-content-between mb-3">
      <h1 className="h5 mb-0 text-gray-800 font-weight-bold">User Profile</h1>
      <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
        <i className="fas fa-download fa-sm text-white-50"></i> Edit  Profile
      </a>
    </div>

      <p className="mb-4">
        DataTables is a third-party plugin that is used to generate the demo table below.
        For more information about DataTables, please visit 
      </p>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">User Profile</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th style={{width:"150px"}}>Name</th>
                  <th>{tprofile.name}</th>
                 
                </tr>
              </thead>
              <tbody>
                <tr>
                <td className='font-weight-bold'>Mobile</td>
                <td>{tprofile.mobile}</td>
                </tr>
                <tr>
                <td className='font-weight-bold'>Email</td>
                <td>{tprofile.email}</td>
                </tr>
                <tr>
                <td className='font-weight-bold'> Password</td>
                <td>{tprofile.password}</td>
                </tr>

                <tr>
                <td className='font-weight-bold'>Exprience</td>
                <td>{tprofile.exprience}</td>
                </tr>

                <tr>
                <td className='font-weight-bold'> Exprience</td>
                <td>{tprofile.address}</td>
                </tr>

                <tr>
                <td className='font-weight-bold'>Exprience</td>
                <td>{tprofile.bio}</td>
                </tr>

                
                
              </tbody>
            
              
            </table>
          </div>
        </div>
      </div>
    </div>
     </>
  )
}
