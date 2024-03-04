import React, { useState } from 'react';
import { useGlobalcontext } from '../Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [temail,setTemail]=useState('');
  const [tpassword,setTpassword]=useState('');

  const Navigate=useNavigate();

  const formLogin=async(e)=>{
  e.preventDefault();

  const useLogindata={email:temail,password:tpassword}
  

  try {
  const tapiPost=await axios.postForm(`${process.env.REACT_APP_SECRET_URL}/teacher_auth_login/login/`,useLogindata);
  console.log(tapiPost.data.response);
  
   if(tapiPost.data.response){
    alert('user Login');
    localStorage.setItem("user_id", tapiPost.data.response._id);
   localStorage.setItem("name", tapiPost.data.response.name);
   Navigate("/");
   }
   else{
    alert('Invalid Credentials');

  }
}
catch (error) {
  console.error('Error while logging in:', error);
  alert('Login failed. Please try again.');
}
 
 
  }


  const userName = useGlobalcontext();

  return (
    <div className="container">
      
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">{userName} Admin Teacher Login </h1>
                    </div>
                    <form className="user" onSubmit={formLogin}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          name="email"
                          value={temail}
                          onChange={(e) => setTemail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          name="password"
                          value={tpassword}
                          onChange={(e) => setTpassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label className="custom-control-label" htmlFor="customCheck">
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                      <hr />
                    </form>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
